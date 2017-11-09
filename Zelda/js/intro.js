var zelda = zelda || {};
var trans = false;
var change = false;
var mustScroll = true;
zelda.intro = {
    init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	},
    
    preload:function(){
		this.game.stage.backgroundColor = "#black";
		this.load.spritesheet("introImage", "img/inicio_y_saveFiles/SpriteSheetIntro.png",256,240);
		this.load.spritesheet("cascada", "img/inicio_y_saveFiles/SpriteSheetCascada.png",32,59);
		this.load.image("storyText","img/inicio_y_saveFiles/StartNew.png",256,240);
		this.load.image("fotoNegra","img/inicio_y_saveFiles/FondoNegroParaFade.png",256,240);
		this.load.image("allTreasures","img/inicio_y_saveFiles/treasures.png",252,639);
		this.load.audio("introMusic","sounds/Music/IntroMusic.mp3");
    },
    
    create:function(){
        


		this.background = this.game.add.sprite(0,0, "introImage");
		this.background.scale.setTo(2);
		this.background.animations.add("onward", [0,1,2,3,2,1,0], 2.5, true);

		this.cascada = this.game.add.sprite(160,365,"cascada");
		this.cascada.scale.setTo(2);
		this.cascada.animations.add("go", [0,1,2,3], 30, true); 


   
        
        this.introMusic = this.add.audio("introMusic");
        this.introMusic.play();

		this.fader = this.game.add.sprite(0,0,"fotoNegra");
		this.fader.scale.setTo(2);
		this.fader.alpha = 0;
        
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
		this.storyText = this.game.add.sprite(0,480, "storyText");
		this.storyText.scale.setTo(2);

		this.allTreasures = this.game.add.sprite(2,480+689,"allTreasures");
		this.allTreasures.scale.setTo(2);    

    },
    
    update:function(){
        this.background.animations.play("onward");
        this.cascada.animations.play("go");
        
        if(this.space.isDown){
           trans = true;
        }
           
        if(trans==true&&!change){
            if(this.fader.alpha<0.95)
            this.fader.alpha+=0.05;
            else
            change = true;
        }
        //Ha de estarse 4 segundos quieto arriba
        if(change){
            if(mustScroll){
                this.background.kill();
                this.cascada.kill();
            	this.storyText.position.y-=2.5;
                this.allTreasures.position.y-=2.5;
            }
            
            if(this.storyText.position.y==0){
				mustScroll = false;
                this.game.time.events.add(Phaser.Timer.SECOND * 4, this.moveAgain, this);
            }
            
            if(this.allTreasures.position.y<-600*2){
                mustScroll = false;
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.changeScene, this);

                //CAMBIO DE ESCENA A ESCENA DE SELECCON DE PARTIDA
            } 
        }
    },
	
	moveAgain:function(){
        mustScroll = true;
    },
    
    changeScene:function(){
        zelda.game.state.start("overworld");    
    }

};