var zelda = zelda || {}


zelda.inventario()= {
	init:function(){
		this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
	},
	
    preload:function(){
        //this.game.stage.backgroundColor = "#ff0000";
        this.game.stage.backgroundColor = "#black";
        //----------Inventory ------------
        
        this.load.image("background", "img/InventarioOver.png");
        //-------------------------------------------
       
		
		//para el prefab de link
		
    },
    
    create:function(){
        this.map = this.game.add.image("background");
        
        
        //fuego y animacion de este
       
        
        //npc
        
		
		this.game.camera.y -= 47;
		
		
		this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
    },
    
    update:function(){
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
       		zelda.gameOptions.GoToOverworld();
		}
		
		
        
    }
};