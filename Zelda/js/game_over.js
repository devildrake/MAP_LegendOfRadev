var zelda = zelda || {};
//16X11 tiles
zelda.game_over = {
	
	init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.selected=0;
        this.DiedIn="";
        zelda.Inventory.Deaths+=1;
        this.Died=true;
	},
	
    preload:function(){
        //this.game.stage.backgroundColor = "#ff0000";
        this.game.stage.backgroundColor = "#black";
        this.load.image("radev","img/meme_radev.png",640,560);
        this.load.image("selector","img/GameO_selec.png",152,49);
        this.t = this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
        this.load.audio("music","sounds/Music/GameOver.wav");
    },
    
    create:function(){
        zelda.enemySpawns.InitZones();
        zelda.dungeonEnemySpawns.InitZones();
        this.music = this.game.add.audio("music",true);
        this.background = this.game.add.sprite(0,0, "radev");
		this.background.scale.setTo(0.4);
        this.selector= this.game.add.sprite(0,0, "selector");
		this.selector.scale.setTo(0.4);
        this.selected=1;
        
         this.str1  = "Continue";
        this.texto1 = this.game.add.bitmapText(15,196,"zelda_font","omg",8);
        this.texto1.scale.setTo(0.8);
        this.texto1.align = "center";
        //this.texto1.tint = 0x000000;
         this.str2  = "From Start";
        this.texto2 = this.game.add.bitmapText(102,196,"zelda_font","omg",8);
        this.texto2.scale.setTo(0.68);
        this.texto2.align = "center";
        
        this.str3  = "Save";
        this.texto3 = this.game.add.bitmapText(197,196,"zelda_font","omg",8);
        this.texto3.scale.setTo(1);
        this.texto3.align = "center";
        
        this.music.play();
        this.music.loop = true;
        zelda.LinkObject.currentHearts=zelda.LinkObject.maxHearts;
        this.muteButton = this.game.input.keyboard.addKey(Phaser.Keyboard.M); 
        this.playMusic = true;
        
        zelda.Inventory.ranking-=zelda.Inventory.ranking*0.1;
        
    },
    
    update:function(){
        
        if(this.muteButton.isDown&&this.muteButton.downDuration(1)){
            this.playMusic= !this.playMusic;
            if(!this.playMusic)
                this.music.stop();
		}
        
        if(!this.music.isPlaying&&this.playMusic)
        this.music.play();
        
        
            
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        //mover el cursor sobre cosas
        if(this.cursors.right.isDown && this.cursors.right.downDuration(1)){
            
            
            if(this.selected==3){this.selected=1}
            else{this.selected++;}
        }
        if(this.cursors.left.isDown && this.cursors.left.downDuration(1)){
            
            
            if(this.selected==1){this.selected=3}
            else{this.selected--;}
        }
        console.log(this.selected);
        //seleccionar cosas
        if(this.space.isDown ){
 
            //continuar
            if(this.selected==1 ){

                if(zelda.LinkObject.DiedIn=="dungeon"){
                    zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
                    zelda.LinkObject.dying = false;
                    this.music.stop();
                    zelda.game.state.start("dungeon");
                    zelda.LinkObject.currentDungeonZone = 6*6+2;
                    
                }
                else if(zelda.LinkObject.DiedIn=="overworld"){

                    zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
                    zelda.LinkObject.dying = false;
                    zelda.LinkObject.lastPositionX= 2*16*16+8*16;
                    zelda.LinkObject.lastPositiony= 4*11*16 + 8*16;
                    zelda.LinkObject.currentZone = 7*4+2;
                    
                
                    //zelda.overworld.game.camera.focusOnXY(zelda.gameOptions.originalCameraPosX,zelda.gameOptions.originalCameraPosY);
                    this.music.stop();
                    zelda.game.state.start("overworld");
                    
                }

            }
            //continuar desde origen
            else if(this.selected==2){

                zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
                zelda.LinkObject.dying = false;
                this.music.stop();
                zelda.game.state.start("overworld");
            }
            //guardar
            else if(this.selected==3){
                zelda.LinkObject.dying = false;
                zelda.gameOptions.save("save"+zelda.gameOptions.SlotSelec);
                this.music.stop();
                zelda.game.state.start("main");
            }
        }
        
        //pintar el selector
        if(this.selected==1){
            this.selector.position.x=10;
            this.selector.position.y=189;
        }
        else if(this.selected==2){
            this.selector.position.x=99;
            this.selector.position.y=189;
        }
        else if(this.selected==3){
            this.selector.position.x=187;
            this.selector.position.y=189;
        }
        
        
        //texto de los botones
        
        
        this.texto1.setText(this.str1);
        this.texto2.setText(this.str2);
        this.texto3.setText(this.str3);
    }
  
  
};