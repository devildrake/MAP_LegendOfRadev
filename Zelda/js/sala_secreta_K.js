var zelda = zelda || {}

zelda.sala_secreta_K = {
	roomDone1:false,
	roomDone2:false,
	
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
        this.load.spritesheet("npc", "img/spawn_shopkeeper.png",16, 16);
        //-------------------------------------------
		this.load.spritesheet("flecha", "img/arrow.png",16,16);
		this.load.spritesheet("escudo", "img/escudo.png",16,16);
		this.load.spritesheet("bomba", "img/bomba.png",16,16);
		this.load.image("inventario", "img/inventario.png");
		this.load.image("collider", "img/camara_horizontal.png");
		this.load.image("collider_inv", "img/collider_invisible.png");
        this.load.image("rupia","img/rupia.png");
        
        //-----------Inventario
        //this.load.image("bomba", "img/bomba.png");
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("cursor","img/inventario/selector.png");
        this.load.spritesheet("sword", "img/Swords.png", 16,16);
        //this.load.image("arco","img/bow.png");
        //this.load.image("shield","img/escudo.png");
        this.load.image("emptyHeart","img/emptycorazon.png");
        this.load.image("minimap","img/Minimapa.png");
        this.load.image("pointMap","img/pointMap.png");
        //-----------------------------
		//para el prefab de link
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16); this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
		
		this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
		
		this.load.audio("text_sound", "sounds/Sfx/text.wav");
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
		this.game.physics.arcade.enable(this.fire1);
		this.fire1.body.immovable = true;
		
        this.fire2 = this.game.add.sprite(zelda.secretLayout.fireX2,zelda.secretLayout.fireY,"fuego",0);
		this.fire2.animations.add("spawn",[0,1,2],6,false);
		this.fire2.animations.add("idle",[3,4],6,true);
        this.fire2.animations.play("spawn");
		this.fire2.animations.currentAnim.onComplete.add(function () {
			this.fire2.animations.play("idle");
		},this);
		this.game.physics.arcade.enable(this.fire2);
		this.fire2.body.immovable = true;
        
		if(!this.roomDone1&&zelda.LinkObject.currentZone==12 || !this.roomDone2&&zelda.LinkObject.currentZone==13){
			zelda.Inventory.ScrollingInventory = true;
			//npc
			this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn",[0,1,2,3],6,false);
			this.npc.animations.add("despawn",[3,4],6, true);
			this.npc.animations.play("spawn");
			this.game.physics.arcade.enable(this.npc);
			this.npc.body.immovable = true;
			this.npc.animations.currentAnim.onComplete.add(function(){
				//zelda.sala_secreta_K.escudo = zelda.game.add.sprite(zelda.secretLayout.item1X, zelda.secretLayout.itemY, "escudo");
				zelda.sala_secreta_K.bomba = zelda.game.add.sprite(zelda.secretLayout.item2X, zelda.secretLayout.itemY,"bomba");
				zelda.sala_secreta_K.bomba.anchor.setTo(.5,0);
				zelda.sala_secreta_K.flecha = zelda.game.add.sprite(zelda.secretLayout.item3X, zelda.secretLayout.itemY, "flecha",3);

				//zelda.game.physics.arcade.enable(zelda.sala_secreta_K.escudo);
				zelda.game.physics.arcade.enable(zelda.sala_secreta_K.bomba);
				zelda.game.physics.arcade.enable(zelda.sala_secreta_K.flecha);

				//zelda.sala_secreta_K.escudo.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_K.bomba.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_K.flecha.animations.add("despawn",[3,4],6,true);
                
                //PRECIOS DE LOS ITEMS
                //zelda.sala_secreta_K.precio1 = zelda.sala_secreta_K.game.add.bitmapText(zelda.secretLayout.item1X-5, zelda.secretLayout.itemY+18,"zelda_font","130",8);
                zelda.sala_secreta_K.precio2 = zelda.sala_secreta_K.game.add.bitmapText(zelda.secretLayout.item2X-8, zelda.secretLayout.itemY+18,"zelda_font","20",8);
                zelda.sala_secreta_K.precio3 = zelda.sala_secreta_K.game.add.bitmapText(zelda.secretLayout.item3X, zelda.secretLayout.itemY+18,"zelda_font","80",8);
                zelda.sala_secreta_K.rupia = zelda.sala_secreta_K.game.add.sprite(3*16,zelda.secretLayout.itemY+16+3,"rupia");
                zelda.sala_secreta_K.rupia.anchor.setTo(0,.5);
                zelda.sala_secreta_K.X = zelda.sala_secreta_K.game.add.bitmapText(3*16+14,zelda.secretLayout.itemY+16+2,"zelda_font","x",8);
			},this);
			//-------------------------------------------
			
			//TEXTOS EN PANTALLA
			this.str  = "BUY SOMETHIN' WILL YA!";
			this.strToPrint = "";
			this.strCount = 0;
			this.textTimer = 0;
			this.texto = this.game.add.bitmapText(2*16+8,16*2+4,"zelda_font","",8);
			this.texto.align = "center";
			
			//Sonido de cuando aparecen los textos
			this.textSound = this.game.add.audio("text_sound");
		}
		
		this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
		
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
		
		//TRIGGER PARA SALIR DE LA SALA AL OVERWORLD
		this.trigger = this.game.add.sprite(0,180,"collider");
		this.game.physics.arcade.enable(this.trigger);
		this.trigger.body.immovable = true;
		
		//COLLIDER PARA LIMITAR EL MOVIMIENTO
		this.collider = this.game.add.sprite(0,16*3,"collider_inv");
		this.game.physics.arcade.enable(this.collider);
		this.collider.body.immovable = true;
        this.inventario = new zelda.InventarioPrefab(this.game,0,0,this);

	},
	
	update:function(){
		//SALIR DE LA SALA
		this.game.physics.arcade.collide(this.link.LinkCollider,this.trigger,function(){
            if(zelda.LinkObject.currentZone==12)
                zelda.LinkPrefab.stairWayUp(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY);

            zelda.gameOptions.mustCreateEnemies = true;
			zelda.gameOptions.GoToOverworld();
		});

		this.game.physics.arcade.collide(this.link.LinkCollider,this.collider);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.npc);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire1);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire2);
		
		if(!this.roomDone1&&zelda.LinkObject.currentZone==12 || !this.roomDone2&&zelda.LinkObject.currentZone==13){
			/*
			//overlap con el escudo
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.escudo, function(link,escudo){
				if(zelda.Inventory.rupies>=130){
					zelda.LinkPrefab.GrabObject();
					escudo.y = escudo.y - 8;
					zelda.sala_secreta_K.bomba.animations.play("despawn");
					zelda.sala_secreta_K.flecha.animations.play("despawn");
					zelda.sala_secreta_K.npc.animations.play("despawn");
					zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
						zelda.sala_secreta_K.escudo.destroy();
						zelda.sala_secreta_K.flecha.destroy();
						zelda.sala_secreta_K.bomba.destroy();
						zelda.sala_secreta_K.npc.destroy();
					});
					zelda.sala_secreta_K.precio1.destroy();
					zelda.sala_secreta_K.precio2.destroy();
					zelda.sala_secreta_K.precio3.destroy();
					zelda.sala_secreta_K.rupia.destroy();
					zelda.sala_secreta_K.X.destroy();
					if(zelda.LinkObject.currentZone == 12) zelda.sala_secreta_K.roomDone1 = true;
					else if(zelda.LinkObject.currentZone == 13) zelda.sala_secreta_K.roomDone2 = true;
					zelda.Inventory.GetObject(12);
					zelda.inventory.rupies -= 130;
                    zelda.Inventory.GetObject(1);
				}
			});
			*/
			
			//overlap con la bomba
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.bomba, function(link,bomba){
				if(zelda.Inventory.rupies>=20){
					zelda.LinkPrefab.GrabObject();
					bomba.y = bomba.y - 8;
					//zelda.sala_secreta_K.escudo.animations.play("despawn");
					zelda.sala_secreta_K.flecha.animations.play("despawn");
					zelda.sala_secreta_K.npc.animations.play("despawn");
					zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
						//zelda.sala_secreta_K.escudo.destroy();
						zelda.sala_secreta_K.flecha.destroy();
						zelda.sala_secreta_K.bomba.destroy();
						zelda.sala_secreta_K.npc.destroy();
					});
					//zelda.sala_secreta_K.precio1.destroy();
					zelda.sala_secreta_K.precio2.destroy();
					zelda.sala_secreta_K.precio3.destroy();
					zelda.sala_secreta_K.rupia.destroy();
					zelda.sala_secreta_K.X.destroy();
					if(zelda.LinkObject.currentZone == 12) zelda.sala_secreta_K.roomDone1 = true;
					else if(zelda.LinkObject.currentZone == 13) zelda.sala_secreta_K.roomDone2 = true;
					zelda.Inventory.GetObject(2);
					zelda.Inventory.rupies -= 20;
				}
			});
			
			//overlap con la flecha
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.flecha, function(link,flecha){
				if(zelda.Inventory.rupies>=80){
					zelda.LinkPrefab.GrabObject();
					flecha.y = flecha.y - 8;
					zelda.sala_secreta_K.bomba.animations.play("despawn");
					//zelda.sala_secreta_K.escudo.animations.play("despawn");
					zelda.sala_secreta_K.npc.animations.play("despawn");
					zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
						//zelda.sala_secreta_K.escudo.destroy();
						zelda.sala_secreta_K.flecha.destroy();
						zelda.sala_secreta_K.bomba.destroy();
						zelda.sala_secreta_K.npc.destroy();
					});
					//zelda.sala_secreta_K.precio1.destroy();
					zelda.sala_secreta_K.precio2.destroy();
					zelda.sala_secreta_K.precio3.destroy();
					zelda.sala_secreta_K.rupia.destroy();
					zelda.sala_secreta_K.X.destroy();
					if(zelda.LinkObject.currentZone == 12) zelda.sala_secreta_K.roomDone1 = true;
					else if(zelda.LinkObject.currentZone == 13) zelda.sala_secreta_K.roomDone2 = true;
					zelda.Inventory.GetObject(11);
					zelda.Inventory.rupies -= 80;
				}
			});
			
			//FUNCIONAMIENTO DE LOS TEXTOS
			if(this.strToPrint.length != this.str.length && this.textTimer>zelda.secretLayout.textSpeed){
				this.strToPrint += this.str[this.strCount];
				this.texto.setText(this.strToPrint);
				this.strCount++;
				this.textTimer = 0;
				this.textSound.play();
			}
			
			//cuando acaba de pintar el texto.
			if(this.str.length == this.strToPrint.length){
				zelda.Inventory.ScrollingInventory = false;
			}
			this.textTimer += zelda.game.time.elapsed;
		}

		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
		
	}
}
