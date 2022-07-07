window.onload=function(){
    var game = new Phaser.Game();
}

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [MenuScreen, Tutorial, Scene1]
};
var game = new Phaser.Game(config);