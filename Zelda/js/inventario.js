var zelda = zelda || {}


zelda.MenuInventario= {
	init:function(){
		this.game.world.setBounds(0,0,1024,240);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
	},
	
    preload:function(){
        //this.game.stage.backgroundColor = "#ff0000";
        this.game.stage.backgroundColor = "#black";
        //----------Inventory ------------
        
        this.load.image("background", "img/inventario.png",256,223);
        //-------------------------------------------
        this.load.image("pocion","img/pocion_vida.png");
        this.load.image("corazon","img/slot_corazon.png");
        this.load.image("vela","img/vela.png");
		this.load.image("bomba","img/bomba.png");
		//para el prefab de link
		
    },
    
    create:function(){
       this.inv = this.game.add.sprite(0,0, "background");
		
        
        
        //fuego y animacion de este
       
        
        //npc
        
		
		this.game.camera.y = 0;
		
        
       
		
		
        
    },
    
    update:function(){
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
       		zelda.gameOptions.GoToOverworld();
		}
		
		
        
    }
};