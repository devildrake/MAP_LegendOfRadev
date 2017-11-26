var zelda = zelda || {}

zelda.sala_secreta_E = {
	roomDone:false,
	
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
        this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_oldwoman.png",16, 16);
        //-------------------------------------------
		
		this.load.spritesheet("vida","img/pocion_vida.png",16,16);
		this.load.spritesheet("mana", "img/pocion_azul.png",16,16);
		this.load.spritesheet("papel", "img/objeto_azul.png",16,16);
		this.load.spritesheet("inventario", "img/inventario.png");
		this.load.image("collider", "img/camara_horizontal.png");
		
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
		
		if(!this.roomDone){
			//npc
			this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn", [0,1,2,3], 6, false);
			this.npc.animations.add("despawn",[3,4], 6, true);
			this.npc.animations.play("spawn");
			this.npc.animations.currentAnim.onComplete.add(function(){
				//items
				zelda.sala_secreta_E.mana = zelda.sala_secreta_E.game.add.sprite(zelda.secretLayout.item2_1X,zelda.secretLayout.itemY,"mana");
				zelda.sala_secreta_E.game.physics.arcade.enable(zelda.sala_secreta_E.mana);
				zelda.sala_secreta_E.mana.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_E.vida = zelda.sala_secreta_E.game.add.sprite(zelda.secretLayout.item2_2X,zelda.secretLayout.itemY,"vida");
				zelda.sala_secreta_E.game.physics.arcade.enable(zelda.sala_secreta_E.vida);
				zelda.sala_secreta_E.vida.animations.add("despawn",[0,1],6,true);

				zelda.sala_secreta_E.papel = zelda.game.add.sprite(zelda.secretLayout.npcX+16, zelda.secretLayout.npcY, "papel");
				zelda.sala_secreta_E.papel.anchor.setTo(.5,0);
				zelda.sala_secreta_E.game.physics.arcade.enable(zelda.sala_secreta_E.papel);
				zelda.sala_secreta_E.papel.animations.add("despawn",[0,1],6,true);
			});
		}
		
		//-------------------------------------------
		
		this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
		
		this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
		
		//TRIGGER PARA SALIR DE LA SALA AL OVERWORLD
		this.trigger = this.game.add.sprite(0,180,"collider");
		this.game.physics.arcade.enable(this.trigger);
		this.trigger.body.immovable = true;
	},
	
	update:function(){
		//SALIR DE LA SALA
		this.game.physics.arcade.collide(this.link.LinkCollider,this.trigger,function(){
			zelda.gameOptions.GoToOverworld();
		});
		if(!this.roomDone){
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.vida,function(link,vida){
				zelda.LinkPrefab.GrabObject();
				vida.y = vida.y - 8;
				zelda.sala_secreta_E.mana.animations.play("despawn");
				zelda.sala_secreta_E.papel.animations.play("despawn");
				zelda.sala_secreta_E.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_E.vida.destroy();
					zelda.sala_secreta_E.mana.destroy();
					zelda.sala_secreta_E.papel.destroy();
					zelda.sala_secreta_E.npc.destroy();
				},this);
				zelda.sala_secreta_E.roomDone = true;
			});

			this.game.physics.arcade.overlap(this.link.LinkCollider, this.mana, function(link, mana){
				zelda.LinkPrefab.GrabObject();
				mana.y = mana.y - 8;
				zelda.sala_secreta_E.vida.animations.play("despawn");
				zelda.sala_secreta_E.papel.animations.play("despawn");
				zelda.sala_secreta_E.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_E.vida.destroy();
					zelda.sala_secreta_E.mana.destroy();
					zelda.sala_secreta_E.papel.destroy();
					zelda.sala_secreta_E.npc.destroy();
				},this);
				zelda.sala_secreta_E.roomDone = true;
			});
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.papel, function(link, papel){
				zelda.LinkPrefab.GrabObject();
				papel.y = papel.y - 8;
				zelda.sala_secreta_E.mana.animations.play("despawn");
				zelda.sala_secreta_E.vida.animations.play("despawn");
				zelda.sala_secreta_E.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_E.vida.destroy();
					zelda.sala_secreta_E.mana.destroy();
					zelda.sala_secreta_E.papel.destroy();
					zelda.sala_secreta_E.npc.destroy();
				},this);
				zelda.sala_secreta_E.roomDone = true;
			});
		}
		
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
	}
}