var zelda = zelda || {}

zelda.sala_secreta_dungeon = {
	init:function(){
		this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        
        //ESTA LINEA ES LA NECESARIA EN CADA SALA SECRETA PARA QUE LINK HAGA BIEN LA PSEUDOANIMACION DE ANDAR PARRIBA
        zelda.LinkObject.switched = false;
	},
	
	preload:function(){
		this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
	},
	
	create:function(){
		this.text = this.game.add.bitmapText(zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight/2,"zelda_font","WORK IN PROGRESS",8);
		this.text.anchor.setTo(.5);
	},
	
	update:function(){
		
	}
}