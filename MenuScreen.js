class MenuScreen extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload ()
    {
        this.load.image('fundo1', 'assets/fundo floresta-cor.png');
        this.load.image('fundo2', 'assets/fundo floresta-fundo.png');
        this.load.image('fundo3', 'assets/fundo floresta-meio.png');
        this.load.image('fundo4', 'assets/fundo floresta-frente.png');
        this.load.image('startButton', 'assets/buttonStart.png');
        this.load.image('logo', 'assets/Logo.png');
        this.load.image('fade', 'assets/blackScreen.png');
        this.load.image('f11', 'assets/f11.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('brocolis', 'assets/brocolis.png');
        this.load.audio('select', 'assets/select.mp3');
        this.load.audio('music1', 'assets/music1.mp3');
        this.load.audio('soundTrack', 'assets/soundTrackMenu.mp3');
    }
    create(){
        
        const createAligned = (scene, count, texture, scrollFactor) =>{
            let x = 0
            for(let i = 0; i < count; ++i){
                const m = scene.add.image(x, scene.scale.height, texture).setOrigin(0, 1).setScrollFactor(scrollFactor)
                x += m.width
            }
        }
        
        const width = this.scale.width
        const height = this.scale.height
        this.soundTrack = this.sound.add("music1", {volume: 0.008, loop: true })
        this.select = this.sound.add("select", {volume: 0.08, loop: false })
        this.add.image(width*0.5, height*0.5, 'fundo1').setScrollFactor(0);
        
        this.soundTrack.play();
        createAligned(this, 200, 'fundo2', 0.2)
        createAligned(this, 500, 'fundo3', 0.33)
        createAligned(this, 1000, 'fundo4', 0.66)
        this.add.image(width*0.5, height*0.4, 'logo').setScrollFactor(0).setScale(0.5, 0.5);
        const startButton = this.add.image(width*0.5, height*0.7, 'startButton').setScrollFactor(0);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            startButton.setScale(1.05, 1.05)
            this.soundTrack.stop();
            this.select.play()
            
            this.cameras.main.fadeOut(1000);
            
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    this.scene.start("ScreenTutorial");
                    this.scene.stop("Menu");
                },
                loop: false
            })
            
        });


        const fade = this.load.image('fade');
        const f11 = this.add.image(180, 70, 'f11').setScrollFactor(0);
        const apple = this.add.image(1420, 170, 'apple').setScrollFactor(0).setScale(3, 3).setAngle(20);
        const brocolis = this.add.image(480, 630, 'brocolis').setScrollFactor(0).setScale(3, 3).setAngle(-20);

        this.tweens.add({
            targets: apple,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 1000,
            angle: 1
        });
        this.tweens.add({
            targets: brocolis,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 1000,
            angle: -1
        });

        this.tweens.add({
            targets: f11,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 1000,
            scale: 1.1
        });

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
        const speed = .6
        //scroll
        if(true){
            cam.scrollX +=speed
        }
    }
}