class Tutorial extends Phaser.Scene{
    constructor(){
        super("ScreenTutorial");
    }
    preload ()
    {
        this.load.audio("jump", ["assets/jump.mp3"]);
        this.load.image('barrier', 'assets/barrier.png');
        this.load.image('fade', 'assets/blackScreen.png');
        this.load.image('brocolis', 'assets/brocolis.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('box', 'assets/box.png');
        this.load.image('platform', 'assets/tutorialplat.png');
        this.load.image('breadParticles', 'assets/bread-particle.png')
        this.load.image('next', 'assets/next.png')
        this.load.spritesheet('hamburger-minion', 
        'assets/hamburger-sprite.png',
        { frameWidth: 80, frameHeight: 68 }
        );
        this.load.spritesheet('dude', 
        'assets/no_hb_little_dude.png',
        { frameWidth: 96, frameHeight: 176 }
        );
        this.load.audio("crunch", ["assets/crunch.mp3"]);
        this.load.audio("starSound", ["assets/effect2.mp3"]);
        this.load.audio("splash", ["assets/splash.mp3"]);
        this.load.audio("tutorialMusic", ["assets/tutorialMusic.mp3"]);
        this.load.image('background', 'assets/tutorialBackground.png');

    }
    create(){
        this.tutorialMusic = this.sound.add("tutorialMusic", {volume: 0.08}, { loop: false })
        this.platforms = this.physics.add.staticGroup();
        this.doors = this.physics.add.staticGroup();
        this.starSound = this.sound.add("starSound", {volume: 0.08}, { loop: false }, {allowMultiple: true});
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.splash = this.sound.add("splash", { loop: false })
        this.crunchSound = this.sound.add("crunch", { loop: false });
        const height = this.scale.height
        this.doors.create(8000, 770, 'door');
        this.platforms.create(-1, 500, 'barrier');
        this.platforms.create(0, 960, 'platform').setOrigin(0,0);
        this.platforms.create(4200, 960, 'platform').setOrigin(0,0);
        this.platforms.create(2500, 770, 'box');
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.jump = this.sound.add("jump", {volume: .08}, { loop: false });
        this.tutorialMusic.play()
        this.cameras.main.setBounds(0, 0, 9000, height)
        
        
        //idle
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
            frameRate: 13,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 10 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 19}),
            frameRate: 13,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jumpPlayer', { start: 0, end: 1}),
            frameRate: 3,
            repeat: 0
        });
        //this.scene.start("Level1");
        this.hamburgerMinion = this.physics.add.group({
            key: 'hamburger-minion',
            repeat: 0,
            setXY: { x: 5980, y: 0}
        });
        this.anims.create({
            key: 'idleHamburger',
            frames: this.anims.generateFrameNumbers('hamburger-minion', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        const fade = this.load.image('fade');

        this.stars = this.physics.add.group({
            key: 'brocolis',
            repeat: 0,
            setXY: { x: 4380, y: 0}
        });

        this.player = this.physics.add.sprite(400, 780, 'dude');
        this.player.setCollideWorldBounds(false);
        this.player.setScale(1, 1)
        this.hamburgerMinion.children.iterate(function (child) {
            child.anims.play('idleHamburger', true)
            
        });
        
        this.physics.add.collider(this.player, this.hamburgerMinion, hitMinion, null, this);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.doors, setNext, null, this.nextButton);
        this.physics.add.collider(this.hamburgerMinion, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.player, collectStar, null, this);
        var cam = this.cameras.main;
        var sceneChange = this.scene;
        var time = this.time;
        var doorTouched = false;
        function setNext(){
            
            if(!doorTouched){
                doorTouched = true;
                cam.fadeOut(1500);
                time.addEvent({
                    delay: 1500,
                    callback: ()=>{
                        sceneChange.start("Level1");
                        sceneChange.stop("ScreenTutorial");
                    },
                    loop: false
                })
            }
            
        }


        const nextButton = this.add.image(7973, 650, 'next').setAlpha(1);
        



        function hitMinion (player, hamburgerMinion)
        {
            if(player.y < hamburgerMinion.y-hamburgerMinion.height){
                
                player.setVelocityY(-530);
                this.splash.play()
                var x = Phaser.Math.Between(-30, 30)
                var particles = this.add.particles('breadParticles');
                var emmiter = particles.createEmitter({
                    x: hamburgerMinion.x,
                    y: hamburgerMinion.y + 70,
                    speed: 80,
                    lifespan: 2000,
                    blendmode: 'ADD',
                    frequency: 30,
                    maxParticles: 1,
                    gravityY: 550,
                    rotate: x
                });


            }else{
                this.crunchSound.play()
                //pehh
            }
            
            
            hamburgerMinion.disableBody(true, true);
        }


        function collectStar (player, star)
        {
            //Barulho da estrela...
            this.starSound.play()
            star.disableBody(true, true);
            

        }
        
        this.tweens.add({
            targets: fade,
            x: 100,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });


        this.cameras.main.fadeIn(1500);

    }
    update(){
      
    const cam = this.cameras.main
    const speed = 2
    cam.startFollow(this.player)

        if (this.keyW.isDown && this.player.body.touching.down)
        {
            //this.player.anims.play('jump', true)
            this.player.setVelocityY(-600);
            this.jump.play();
        }
        else if (this.keyS.isDown && !this.player.body.touching.down)
        {
            this.player.setVelocityY(930);
        }

        if (this.keyA.isDown)
        {
            this.player.setVelocityX(-350);

            this.player.anims.play('left', true);

            cam.scrollX -=speed
        }
        else if (this.keyD.isDown)
        {


            this.player.setVelocityX(350);

            this.player.anims.play('right', true);

            cam.scrollX +=speed
        }else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn', true);
        }
    }
}