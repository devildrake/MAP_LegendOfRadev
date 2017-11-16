var zelda = zelda || {}

zelda.sala_secreta_D = {
    init:function(){
		this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
	},
    
    preload:function(){
        this.game.stage.backgroundColor = "#black";
        //----------Tiles del layaut base------------
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        //-------------------------------------------
        this.load.spritesheet("fuego", "img/fuego.png",17,15);
        this.load.spritesheet("npc", "img/oldman.png",16, 16);
		this.load.image("inventario", "img/inventario.png");
    },
    
    create:function(){
        this.map = this.game.add.tilemap("sala");
        this.map.addTilesetImage("secret_tile");
        this.map.createLayer("Rocas");
        
        //fuego y animacion de este
        this.fire = [];
        this.fire.push(this.game.add.sprite(5*16,4*16,"fuego",0));
        this.fire.push(this.game.add.sprite(10*16,4*16,"fuego",0));
        for(var i in this.fire){
            this.fire[i].animations.add("idle",[0,1],6,true);
            this.fire[i].animations.play("idle");
        }
        
        //npc
        this.npc = this.game.add.sprite(8*16, 4*16, "npc", 0);
        this.npc.anchor.setTo(.5,0);
		
		 this.game.camera.y -= 47;
		
		this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
    },
    
    update:function(){
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
       		zelda.gameOptions.GoToOverworld();
		}
    }
}