var zelda = zelda || {};

zelda.FileScene = {
	
    init:function(){
      
	},
    
    preload:function(){
         this.game.stage.backgroundColor = "#black";
        
        this.load.image("select","img/inicio_y_saveFiles/SelectGame.png",256,240);
		this.load.image("create","img/inicio_y_saveFiles/createFile.png",216,106);
        this.load.image("register","img/inicio_y_saveFiles/register.png",320,280);
        this.load.image("fotoNegra","img/inicio_y_saveFiles/FondoNegroParaFade.png",256,240);
        
		this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    
    create:function(){
        
        
    },
    
    update:function(){
				
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}	
	}
}