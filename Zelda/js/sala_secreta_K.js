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
		   //-----------Inventario
		
        //this.load.image("bomba", "img/bomba.png");
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("cursor","img/inventario/selector.png");
        this.load.spritesheet("sword", "img/Swords.png", 16,16);
        //this.load.image("arco","img/bow.png");
        //this.load.image("shield","img/escudo.png");
        //-----------------------------
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
			//npc
			this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn",[0,1,2,3],6,false);
			this.npc.animations.add("despawn",[3,4],6, true);
			this.npc.animations.play("spawn");
			this.game.physics.arcade.enable(this.npc);
			this.npc.body.immovable = true;
			this.npc.animations.currentAnim.onComplete.add(function(){
				zelda.sala_secreta_K.escudo = zelda.game.add.sprite(zelda.secretLayout.item1X, zelda.secretLayout.itemY, "escudo");
				zelda.sala_secreta_K.bomba = zelda.game.add.sprite(zelda.secretLayout.item2X, zelda.secretLayout.itemY,"bomba");
				zelda.sala_secreta_K.bomba.anchor.setTo(.5,0);
				zelda.sala_secreta_K.flecha = zelda.game.add.sprite(zelda.secretLayout.item3X, zelda.secretLayout.itemY, "flecha",3);

				zelda.game.physics.arcade.enable(zelda.sala_secreta_K.escudo);
				zelda.game.physics.arcade.enable(zelda.sala_secreta_K.bomba);
				zelda.game.physics.arcade.enable(zelda.sala_secreta_K.flecha);

				zelda.sala_secreta_K.escudo.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_K.bomba.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_K.flecha.animations.add("despawn",[3,4],6,true);
			},this);
			//-------------------------------------------
		}
		
		this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
		
		this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
		
		//TRIGGER PARA SALIR DE LA SALA AL OVERWORLD
		this.trigger = this.game.add.sprite(0,180,"collider");
		this.game.physics.arcade.enable(this.trigger);
		this.trigger.body.immovable = true;
		
		//COLLIDER PARA LIMITAR EL MOVIMIENTO
		this.collider = this.game.add.sprite(0,16*3,"collider_inv");
		this.game.physics.arcade.enable(this.collider);
		this.collider.body.immovable = true;
        
        //pintar corazones
        zelda.Inventory.startHUD();
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                    }else{
                        if(i==zelda.LinkObject.currentHearts-.5){
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            
                            
                        }else{
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            }                   
                    }
            
            
                 }
	},
	
	update:function(){
		//SALIR DE LA SALA
		this.game.physics.arcade.collide(this.link.LinkCollider,this.trigger,function(){
			zelda.gameOptions.GoToOverworld();
		});
		
		this.game.physics.arcade.collide(this.link.LinkCollider,this.collider);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.npc);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire1);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire2);
		
		if(!this.roomDone1&&zelda.LinkObject.currentZone==12 || !this.roomDone2&&zelda.LinkObject.currentZone==13){
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.escudo, function(link,escudo){
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
				if(zelda.LinkObject.currentZone == 12) zelda.sala_secreta_K.roomDone1 = true;
				else if(zelda.LinkObject.currentZone == 13) zelda.sala_secreta_K.roomDone2 = true;
				console.log("comportamiento de coger el escudo");
			});
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.bomba, function(link,bomba){
				zelda.LinkPrefab.GrabObject();
				bomba.y = bomba.y - 8;
				zelda.sala_secreta_K.escudo.animations.play("despawn");
				zelda.sala_secreta_K.flecha.animations.play("despawn");
				zelda.sala_secreta_K.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_K.escudo.destroy();
					zelda.sala_secreta_K.flecha.destroy();
					zelda.sala_secreta_K.bomba.destroy();
					zelda.sala_secreta_K.npc.destroy();
				});
				if(zelda.LinkObject.currentZone == 12) zelda.sala_secreta_K.roomDone1 = true;
				else if(zelda.LinkObject.currentZone == 13) zelda.sala_secreta_K.roomDone2 = true;
				console.log("comportamiento de coger la bomba");
			});
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.flecha, function(link,flecha){
				zelda.LinkPrefab.GrabObject();
				flecha.y = flecha.y - 8;
				zelda.sala_secreta_K.bomba.animations.play("despawn");
				zelda.sala_secreta_K.escudo.animations.play("despawn");
				zelda.sala_secreta_K.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_K.escudo.destroy();
					zelda.sala_secreta_K.flecha.destroy();
					zelda.sala_secreta_K.bomba.destroy();
					zelda.sala_secreta_K.npc.destroy();
				});
				if(zelda.LinkObject.currentZone == 12) zelda.sala_secreta_K.roomDone1 = true;
				else if(zelda.LinkObject.currentZone == 13) zelda.sala_secreta_K.roomDone2 = true;
				console.log("comportamiento de coger la flecha");
			});
		}
		
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
		
	}
}
