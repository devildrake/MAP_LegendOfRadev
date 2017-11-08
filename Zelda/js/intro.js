var zelda = zelda || {};
zelda.intro = {
    
    
    preload:function(){
    this.game.stage.backgroundColor = "#black";
    this.load.spritesheet("introImage", "img/inicio_y_saveFiles/SpriteSheetIntro.png",256,240);
    this.load.audio("introMusic","sounds/Music/IntroMusic.mp3");

    },
    
    create:function(){
    this.background = this.game.add.sprite(0,0, "introImage");
    this.background.scale.setTo(2);
    this.background.animations.add("onward", [0,1,2,3,2,1,0], 2.5, true);

        this.introMusic = this.add.audio("introMusic");
        this.introMusic.play();
    },
    
    update:function(){
        this.background.animations.play("onward");

    }
};