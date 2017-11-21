var zelda = zelda || {}

zelda.sala_secreta_K = {
	init:function(){
		this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
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
		this.load.image("inventario", "img/inventario.png");
		
		//para el prefab de link
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16); this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
	},
	
	create:function(){
		//--------Pintado del layout base------------
        this.map = this.game.add.tilemap("sala");
        this.map.addTilesetImage("secret_tile");
        this.obstacles = this.map.createLayer("Rocas");
		this.map.setCollisionBetween(1,2,true,"Rocas");
        
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
		this.game.physics.arcade.enable(this.escudo);
		this.game.physics.arcade.enable(this.bomba);
		this.game.physics.arcade.enable(this.flecha);
		
		this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
		
		this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
	},
	
	update:function(){
		if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
       		zelda.gameOptions.GoToOverworld();
		}
		this.game.physics.arcade.overlap(this.link.LinkCollider, this.escudo, function(){
			console.log("comportamiento de coger el escudo");
		});
		this.game.physics.arcade.overlap(this.link.LinkCollider, this.bomba, function(){
			console.log("comportamiento de coger la bomba");
		});
		this.game.physics.arcade.overlap(this.link.LinkCollider, this.flecha, function(){
			console.log("comportamiento de coger la flecha");
		});
		
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
		
	}
}