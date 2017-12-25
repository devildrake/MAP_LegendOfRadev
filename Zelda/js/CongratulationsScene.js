var zelda = zelda || {}

zelda.Congratulations = { 
	
    init:function(){
        this.game.world.setBounds(0,0,112*16,60*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        
    },
    
    preload:function(){
        this.load.image("Black","img/Blackout.png");
        this.t = this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
    },

    create:function(){
        
        this.str  = "CONGRATULATIONS!";
        this.texto = this.game.add.bitmapText(3*16,16*2+4,"zelda_font",this.str,8);
		//this.texto = this.game.add.text(3*16,16*2+4,this.strToPrint);
        this.texto.align = "center";
    },
    
    update:function(){   
        
    
    }

}