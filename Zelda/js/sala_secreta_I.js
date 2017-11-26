var zelda = zelda || {}

zelda.sala_secreta_I = {
	roomDone1:false,
	roomDone2:false,
	roomDone3:false,
	
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
        this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_orcO.png",16, 16);
        //-------------------------------------------
        
        this.load.image("rupia", "img/rupia.png");
		this.load.image("inventario", "img/inventario.png");
		
		//para el prefab de link
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16); this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
		
		this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    
    create:function(){
        //--------Pintado del layout base------------
        this.map = this.game.add.tilemap("sala");
        this.map.addTilesetImage("secret_tile");
        this.obstacles = this.map.createLayer("Rocas");
		this.map.setCollisionBetween(1,2,true,"Rocas");
        //-------------------------------------------
        
        //fuego y animacion de este
        this.fire1 = this.game.add.sprite(zelda.secretLayout.fireX1,zelda.secretLayout.fireY,"fuego",0);
		this.fire1.animations.add("spawn",[0,1,2],6,false);
		this.fire1.animations.add("idle",[3,4],6,true);
        this.fire1.animations.play("spawn");
		this.fire1.animations.currentAnim.onComplete.add(function () {
			this.fire1.animations.play("idle");
		},this);
		
        this.fire2 = this.game.add.sprite(zelda.secretLayout.fireX2,zelda.secretLayout.fireY,"fuego",0);
		this.fire2.animations.add("spawn",[0,1,2],6,false);
		this.fire2.animations.add("idle",[3,4],6,true);
        this.fire2.animations.play("spawn");
		this.fire2.animations.currentAnim.onComplete.add(function () {
			this.fire2.animations.play("idle");
		},this);
        
		if(!this.roomDone1&&zelda.LinkObject.currentZone == 15 || !this.roomDone2&&zelda.LinkObject.currentZone==20 || !this.roomDone3&&zelda.LinkObject.currentZone == 32){
			//npc
			this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn",[0,1,2,3],6,false);
			this.npc.animations.play("spawn");
			this.npc.animations.currentAnim.onComplete.add(function(){
				//items
				zelda.sala_secreta_I.rupia = zelda.game.add.sprite(zelda.secretLayout.item2X, zelda.secretLayout.itemY, "rupia");
				zelda.sala_secreta_I.rupia.anchor.setTo(.5,0);
				zelda.game.physics.arcade.enable(this.rupia);
			},this);
			//TEXTO
			this.numeros = zelda.game.add.text(zelda.secretLayout.item2X, zelda.secretLayout.itemY+16, "");
			this.numeros.anchor.setTo(.5,0)
			this.numeros.fill = "white";
			this.numeros.font = "Press Start 2P";
			this.numeros.fontSize = 10;
		}
		
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
		
		if(!this.roomDone1&&zelda.LinkObject.currentZone == 15 || !this.roomDone2&&zelda.LinkObject.currentZone==20 || !this.roomDone3&&zelda.LinkObject.currentZone == 32){
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.rupia, function(){
				zelda.sala_secreta_I.numeros.setText("100");
				if(zelda.LinkObject.currentZone == 15)zelda.sala_secreta_I.roomDone1 = true;
				else if(zelda.LinkObject.currentZone == 20)zelda.sala_secreta_I.roomDone2 = true;
				else if(zelda.LinkObject.currentZone == 32)zelda.sala_secreta_I.roomDone3 = true;
				console.log("+100 a las rupias de link");
			});
		}
		
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
    }
}