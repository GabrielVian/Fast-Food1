class Scene1 extends Phaser.Scene{
    constructor(){
        super("Level1");
    }

    preload ()
    {
        this.load.image('health', 'assets/health.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ldude', 'assets/little_dude.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('ground2', 'assets/platform2.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('forest', 'assets/forest.png');
        this.load.image('brocolis', 'assets/brocolis.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('hamburger', 'assets/hamburger.png');
        this.load.image('sky2', 'assets/mont.jpg');
        this.load.image('boost', 'assets/boost.png');
        this.load.image('tile-2x1', 'assets/tile-set-medium.png');
        this.load.image('tile-4x1', 'assets/tile-set-small.png');
        this.load.image('barrier', 'assets/barrier.png');
        this.load.image('bushes', 'assets/bushes.png')
        this.load.image('grass', 'assets/grass-tile-set-medium.png')
        this.load.image('grass-small', 'assets/grass-tile-set-small.png')
        this.load.image('score', 'assets/score.png')
        this.load.image('redParticles', 'assets/red-particles.png')
        this.load.image('strawParticles', 'assets/straw.png')
        this.load.image('breadParticles', 'assets/bread-particle.png')
        this.load.image('apple', 'assets/apple.png')
        this.load.image('fade', 'assets/blackScreen.png');
        
        this.load.audio("soda", ["assets/can.mp3"]);
        this.load.audio("death", ["assets/effect1.mp3"]);
        this.load.audio("starSound", ["assets/effect2.mp3"]);
        this.load.audio("jump", ["assets/jump.mp3"]);
        this.load.audio("crunch", ["assets/crunch.mp3"]);
        this.load.audio("splash", ["assets/splash.mp3"]);

        this.load.spritesheet('dude', 
        'assets/no_hb_little_dude.png',
        { frameWidth: 96, frameHeight: 176 }
        );
        this.load.spritesheet('hamburger-minion', 
        'assets/hamburger-sprite.png',
        { frameWidth: 80, frameHeight: 68 }
        );
        this.load.spritesheet('soda-minion', 
        'assets/soda.png',
        { frameWidth: 104, frameHeight: 152 }
        );
        this.load.spritesheet('jumpPlayer', 
        'assets/ldudeJump.png',
        { frameWidth: 116, frameHeight: 192 }
        );

        this.load.image('fundo-cor', 'assets/fundo floresta-cor.png');
        this.load.image('fundo-fundo', 'assets/fundo floresta-fundo.png');
        this.load.image('fundo-meio', 'assets/fundo floresta-meio.png');
        this.load.image('fundo-frente', 'assets/fundo floresta-frente.png');

        this.load.image('bar-outline', 'assets/bar-outline.png');
        this.load.image('bar1', 'assets/health-bar.png');
        this.load.image('bar2', 'assets/health-bar2.png');
        this.load.image('bar3', 'assets/health-bar3.png');

        this.load.text("mapConfig", "assets/mapConfig.json");
    }

    create ()
    {


    const fade = this.load.image('fade');
    this.tweens.add({
        targets: fade,
        x: 100,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        duration: 3000
    });
    
    this.cameras.main.fadeIn(1500);

    //var player;
    //var hamburgerMinion;
    //var sodaMinion;
    //var stars;
    //var apples;
    //var crunchSound;
    //var sodaSound;
    // var platforms;
    // var noHitBoxPlatforms;
    // var cursors;
    this.score = 0;
    // var gameOver = false;
    // var scoreText;
    var health = 100;
    var maxHealth = 100;
    this.halfWindowHeight = window.screen.availHeight/2;
    this.halfWindowWidth = window.screen.availWidth/2;
    this.timeForTimedEvent = 1000;

    this.keyA;
    this.keyS;
    this.keyD;
    this.keyW;
    this.keyE;
    this.keyShift;






        const createAligned = (scene, count, texture, scrollFactor) =>{
            let x = 0
            for(let i = 0; i < count; ++i){
                const m = scene.add.image(x, scene.scale.height, texture).setOrigin(0, 1).setScrollFactor(scrollFactor)
                x += m.width
            }
        }

        this.splash = this.sound.add("splash", { loop: false })
        this.sodaSound = this.sound.add("soda", { loop: false })
        this.crunchSound = this.sound.add("crunch", { loop: false });
        this.death = this.sound.add("death", { loop: false });
        this.starSound = this.sound.add("starSound", {volume: 0.08}, { loop: false }, {allowMultiple: true});
        this.jump = this.sound.add("jump", {volume: .08}, { loop: false });
        this.platforms = this.physics.add.staticGroup();
        this.noHitBoxPlatforms = this.physics.add.staticGroup();
        this.boost = this.physics.add.staticGroup();
        
        //fundos

        const width = this.scale.width
        const height = this.scale.height

        this.add.image(width*0.5, height*0.5, 'fundo-cor').setScrollFactor(0);
        // this.add.image(0, height, 'fundo-fundo').setOrigin(0, 1).setScrollFactor(.33);
        // this.add.image(0, height, 'fundo-meio').setOrigin(0, 1).setScrollFactor(.66);
        // this.add.image(0, height, 'fundo-frente').setOrigin(0, 1).setScrollFactor(1);

        createAligned(this, 2, 'fundo-fundo', 0.2)
        createAligned(this, 5, 'fundo-meio', 0.33)
        createAligned(this, 10, 'fundo-frente', 0.66)
        //createAligned(this, 10, 'bushes', 1)

        //invisible-barrier
        this.platforms.create(-1, 500, 'barrier')

        //tile-set
        
        this.noHitBoxPlatforms.create(1000, 670, 'tile-2x1');//+370 in y
        this.platforms.create(1000, 300, 'grass');
        this.noHitBoxPlatforms.create(1000, 670, 'tile-2x1').setTint('#f2e018').setAlpha(0.2)
        
        this.platforms.create(1700, 451, 'grass');
        this.noHitBoxPlatforms.create(1700, 820, 'tile-2x1');
        this.noHitBoxPlatforms.create(1700, 820, 'tile-2x1').setTint('#f2e018').setAlpha(0.2);

        this.platforms.create(1900, 630, 'grass-small');
        this.noHitBoxPlatforms.create(1900, 1000, 'tile-4x1');
        this.noHitBoxPlatforms.create(1900, 1000, 'tile-4x1').setTint('#f2e018').setAlpha(0.2)

        this.platforms.create(1200, 1000, 'tile-4x1');
        this.platforms.create(600, 1200, 'tile-2x1');
        this.platforms.create(1700, 1600, 'tile-2x1');
        this.platforms.create(1900, 1200, 'tile-2x1');
        this.platforms.create(2600, 1000, 'tile-4x1');
        this.platforms.create(2900, 800, 'tile-4x1');
        this.platforms.create(3500, 900, 'tile-2x1');
        this.platforms.create(1200, 1000, 'tile-4x1');
        this.platforms.create(600, 1200, 'tile-2x1');
        this.platforms.create(1200, 1000, 'tile-4x1');
// for(var x = 0; x < levelDataPlatform.length; x++){
        //     platforms.create(levelDataPlatform[x, 0], levelDataPlatform[x, 1],  levelDataPlatform[x, 2]);
        //     platforms.create(600, 1200, 'tile-2x1')
        // }

        //chao
        let varWidth = 900
        for(var i = 0; i<10; ++i){
            this.platforms.create(varWidth, 1000, 'ground2').refreshBody();
            varWidth += varWidth
        }
        
        // let platAmount = 10
        // while(platAmount > 0){
        //     var randPos1 = Phaser.Math.Between(400, 1300);
        //     var randPos2 = Phaser.Math.Between(500, 900);
            
        //     platforms.create(randPos1, randPos2, 'ground');
        //     platAmount--;
        // }

        /*plataformas
        platforms.create(600, 800, 'ground');
        platforms.create(50, 750, 'ground');
        platforms.create(750, 520, 'ground');*/
        
        
        //boost-jump
        this.boost.create(1400, 700, 'boost');
        

        //minion
        //hamburgerMinion = this.physics.add.group();
            

        this.hamburgerMinion = this.physics.add.group({
            key: 'hamburger-minion',
            repeat: 2,
            setXY: { x: 500, y: 0, stepX: 400 }
        });

        this.sodaMinion = this.physics.add.group({
            key: 'soda-minion',
            repeat: 1,
            setXY: { x: 1200, y: 0, stepX: 400 }
        });


        
        this.timedEvent = this.time.addEvent({ delay: this.timeForTimedEvent, callback: minionWalk, callbackScope: this, repeat: -1 });
        var minionsX = [700, 1000, 1200, 1500, 1700, 2000, 2300];
        var minionsY = [500];
        // for(var i = 0; i < minionsX.length; ++i){
        //     minions[i] = hamburgerMinion.create(minionsX[i], minionsY[0], 'hamburger-minion');
        //     minionWalk()
        //     timedEvent = this.time.addEvent({ delay: 3000, callback: minionWalk, callbackScope: this, repeat: -1 });
        // }



        //hamburgerMinion.create(700, 500, 'hamburger-minion');

        //double click mouse
        // let lastTime = 0;
        // this.input.on("pointerdown", ()=>{
        //     let clickDelay = this.time.now - lastTime;
        //     lastTime = this.time.now;
        //     if(clickDelay < 200) {
        //         //console.log("We're double clicked!");
        //         player.setPosition(player.x+150, player.y);;
        //     }
        // });
        this.anims.create({
            key: 'idleSoda',
            frames: this.anims.generateFrameNumbers('soda-minion', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'rightSoda',
            frames: this.anims.generateFrameNumbers('soda-minion', { start: 2, end: 5 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'leftSoda',
            frames: this.anims.generateFrameNumbers('soda-minion', { start: 6, end: 9 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'idleHamburger',
            frames: this.anims.generateFrameNumbers('hamburger-minion', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'leftHamburger',
            frames: this.anims.generateFrameNumbers('hamburger-minion', { start: 6, end: 9 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'rightHamburger',
            frames: this.anims.generateFrameNumbers('hamburger-minion', { start: 2, end: 5 }),
            frameRate: 2,
            repeat: -1
        });



        //JOGADOR E CURSOR..
        //cursors = this.input.keyboard.createCursorKeys();

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);



        this.player = this.physics.add.sprite(100, 850, 'dude').setInteractive({ pixelPerfect: true });
        //player bounce
        //player.setBounce(0.2);
        this.player.setCollideWorldBounds(false);
        this.player.setScale(.5, .5)

        

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
            frameRate: 13,
            repeat: -1
        });

        //idle
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





        // this.anims.create({
        //     key: 'down',
        //     frames: [ { key: 'dude', frame: 9 } ],
        //     frameRate: 10,
        // });
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.sodaMinion, this.platforms);
        this.physics.add.collider(this.sodaMinion, this.sodaMinion);
        this.physics.add.collider(this.hamburgerMinion, this.platforms);
        this.physics.add.collider(this.hamburgerMinion, this.hamburgerMinion);

        //stars/brocolis...


        this.stars = this.physics.add.group({
            key: 'brocolis',
            repeat: 2,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.apples = this.physics.add.group({
            key: 'apple',
            repeat: 2,
            setXY: { x: 1400, y: 0, stepX: 270 }
        }); 

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.apples, this.platforms);
        this.physics.add.overlap(this.player, this.boost, boostJump, null, this);
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
        this.physics.add.overlap(this.player, this.apples, collectApple, null, this);
        let overlapBooster = false
        function boostJump(player, boost){

                if(!overlapBooster){
                    boost.setTint(0xff0000);
                    player.setVelocityY(-730)
                }
                
                overlapBooster = true
        }

        

       //Barras de vida...
        this.healthImage = this.add.image(116, 32, 'health').setScrollFactor(0);
        this.healthImage.setScale(0.3, 0.3)
        this.barBackground
        this.barOutline;
        this.barBackground = this.add.image(336, 34, 'bar3').setScrollFactor(0);
        var healthBar = this.add.image(226, 34, 'bar1').setScrollFactor(0);
        this.healthBarOutline = this.add.image(336, 34, 'bar-outline').setScrollFactor(0);

        //SCORE
        this.score = 0;
        this.scoreImage = this.add.image(600, 34, 'score').setScrollFactor(0);
        this.scoreText = this.add.text(700, 20, '0', {fontFamily: 'CustomFont', fill: '#f2e018', fontSize: 25}).setScrollFactor(0).setPadding(10,10,10,10);
        this.scoreText.setText('0');
        this.scoreImage.setScale(0.3, 0.3)
        this.scoreText.setScale(0.7, 0.7)
        function damagePlayer(damage){
            health -= damage
            if(health > maxHealth){
                health = maxHealth
            }
            if(health <= 0){
                // this.death.play()

                // player.setTint(0xff0000);
                // player.anims.play('turn');

                //gameOver = true;

                alert("Fim de jogo");
                location.reload();
            }

            healthBar.setScale(health/100, 1)
        }


        function healPlayer(heal){
            
            health += heal
            if(health > maxHealth){
                health = maxHealth
            }

            healthBar.setScale(health/100, 1)
        }


        function collectApple(player, apple){
            this.starSound.play()
            apple.disableBody(true, true);
            this.score += 15;
            healPlayer(15)
            this.scoreText.setText(this.score);
        }

        function collectStar (player, star)
        {
            //Barulho da estrela...
            this.starSound.play()
            star.disableBody(true, true);
            this.score += 10;
            healPlayer(10)
            this.scoreText.setText(this.score);
            
            // if (this.stars.countActive(true) === 0)
            // {
            //     this.stars.children.iterate(function (child) {

            //         child.enableBody(true, child.x, 0, true, true);

            //     });

            //     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            //     // var bomb = bombs.create(x, 16, 'hamburger');
            //     // bomb.setBounce(1);
            //     // bomb.setCollideWorldBounds(false);
            //     // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            // }
        }
        
        var invert = 1

        function minionWalk(x){
            invert *= -1;
            //var timeForTimedEvent = 3000
            this.hamburgerMinion.setVelocityX(x*invert);
            this.sodaMinion.setVelocityX(x*invert);
        
            this.sodaMinion.children.iterate(function (child) {
                
                var x = invert * Phaser.Math.Between(-1, 1)
                child.setVelocityX(Phaser.Math.Between(30, 70)*x);
        
                if(x == -1)
                    child.anims.play('leftSoda', true)
                else if(x == 1)
                    child.anims.play('rightSoda', true)
                else
                    child.anims.play('idleSoda', true)
        
                var y = Phaser.Math.Between(0, 17)    
                if(y == 0 && child.body.touching.down){
                    child.setVelocityY(-600);
                }
                //child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
                
            });
        
            this.hamburgerMinion.children.iterate(function (child) {
                
                var x = invert * Phaser.Math.Between(-1, 1)
                child.setVelocityX(Phaser.Math.Between(30, 150)*x);
        
                if(x == -1)
                    child.anims.play('leftHamburger', true)
                else if(x == 1)
                    child.anims.play('rightHamburger', true)
                else
                    child.anims.play('idleHamburger', true)
        
                var y = Phaser.Math.Between(0, 10)    
                if(y == 0 && child.body.touching.down){
                    child.setVelocityY(-650);
                }
                //child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
                
            });
            
        }


        //BOMBAS....

        this.physics.add.collider(this.player, this.hamburgerMinion, hitMinion, null, this);
        this.physics.add.collider(this.player, this.sodaMinion, hitSodaMinion, null, this);
        function hitBomb (player, bomb)
        {
            damagePlayer(20);
            bomb.disableBody(true, true);
            this.crunchSound.play()
        }

        function hitMinion (player, hamburgerMinion)
        {
            if(player.y < hamburgerMinion.y-hamburgerMinion.height){
                this.splash.play();
                player.setVelocityY(-530);

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
                damagePlayer(20);
                this.crunchSound.play()
            }
            
            
            hamburgerMinion.disableBody(true, true);
        }



        function hitSodaMinion (player, sodaMinion)
        {
            if(player.y < sodaMinion.y - sodaMinion.height + 90){
                this.splash.play();
                player.setVelocityY(-530);
                //
                var x = Phaser.Math.Between(-30, 30)
                var particles = this.add.particles('redParticles');
                var emmiter = particles.createEmitter({
                    x: sodaMinion.x,
                    y: sodaMinion.y + 70,
                    speed: 80,
                    lifespan: 2000,
                    blendmode: 'ADD',
                    frequency: 30,
                    maxParticles: 1,
                    gravityY: 550,
                    rotate: x
                });

                x = Phaser.Math.Between(-30, 30)
                particles = this.add.particles('strawParticles');
                emmiter = particles.createEmitter({
                    x: sodaMinion.x,
                    y: sodaMinion.y + 40,
                    speed: 80,
                    lifespan: 2000,
                    blendmode: 'ADD',
                    frequency: 30,
                    maxParticles: 1,
                    gravityY: 520,
                    rotate: x
                });
            }else if(player.y >= sodaMinion.y-sodaMinion.height){
                damagePlayer(50);
                this.sodaSound.play()
            }
            
            
            sodaMinion.disableBody(true, true);
        }

        this.cameras.main.setBounds(0, 0, 2000000, height)
    }





update()
{
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
    //hamburgerMinion.anims.play('idleHamburger', true)
    // hamburgerMinion.forEach(function (hamMinion) {
    //     if (hamMinion.body.velocity.x < 0) hamMinion.animations.play('leftHamburger');
    //     else hamMinion.animations.play('rightHamburger');
    // });
}


}