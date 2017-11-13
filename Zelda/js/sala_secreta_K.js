var zelda = zelda || {}

zelda.sala_secreta_K = {
	init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight/2);
	},
	
	preload:function(){
		this.game.stage.backgroundColor = "#black";
        //----------Elementos del layaut base------------
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        this.load.spritesheet("fuego", "img/fuego.png",17,15);
        this.load.spritesheet("npc", "img/shopkeeper.png",16, 16);
        //-------------------------------------------
		this.load.spritesheet("flecha", "img/arrow.png",16,16);
		this.load.image("escudo", "img/escudo.png");
		this.load.image("bomba", "img/bomba.png");
	},
	
	create:function(){
		//--------Pintado del layout base------------
        this.map = this.game.add.tilemap("sala");
        this.map.addTilesetImage("secret_tile");
        this.map.createLayer("Rocas");
        
        //fuego y animacion de este
        this.fire = [];
		this.fire.push(this.game.add.sprite(zelda.secretLayout.fireX1,zelda.secretLayout.fireY,"fuego",0));
        this.fire.push(this.game.add.sprite(zelda.secretLayout.fireX2,zelda.secretLayout.fireY,"fuego",0));
        for(var i in this.fire){
            this.fire[i].animations.add("idle",[0,1],6,true);
            this.fire[i].animations.play("idle");
        }
		
		//npc
		this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
		this.npc.anchor.setTo(.5,0);
		//-------------------------------------------
		
		//items
		this.escudo = this.game.add.sprite(zelda.secretLayout.item1X, zelda.secretLayout.itemY, "escudo");
		this.bomba = this.game.add.sprite(zelda.secretLayout.item2X, zelda.secretLayout.itemY,"bomba");
		this.bomba.anchor.setTo(.5,0);
		this.flecha = this.game.add.sprite(zelda.secretLayout.item3X, zelda.secretLayout.itemY, "flecha",3);
		
		this.game.camera.y -= 47;
	},
	
	update:function(){
		
	}
}