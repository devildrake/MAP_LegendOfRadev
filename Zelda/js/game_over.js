var zelda = zelda || {};
//16X11 tiles
zelda.game_over = {
	
	init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.selected=0;
        this.DiedIn="";
	},
	
    preload:function(){
        //this.game.stage.backgroundColor = "#ff0000";
        this.game.stage.backgroundColor = "#black";
        this.load.image("radev","img/meme_radev.png",640,560);
    },
    
    create:function(){
        
    },
    
    update:function(){
        this.background = this.game.add.sprite(0,0, "radev");
		this.background.scale.setTo(0.4);
        
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //seleccionar cosas
        if(this.space.isDown ){
            
            this.selected=1;
            //this.DiedIn="dungeon";
        }
        //continuar
        if(this.selected==1){
                
            if(zelda.LinkObject.DiedIn=="dungeon"){
                zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
                zelda.LinkObject.dying = false;
                zelda.game.state.start("dungeon");
            }
            else if(zelda.LinkObject.DiedIn=="overworld"){
                
                zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
                zelda.LinkObject.dying = false;
                zelda.game.state.start("overworld");
            }
            
        }
        //continuar desde origen
        else if(this.selected==2){
            
            zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
            zelda.LinkObject.dying = false;
            zelda.game.state.start("overworld");
        }
        //guardar
        else if(this.selected==3){
            
            
        }
        
    }
  
  
};