var zelda = zelda || {};
//16X11 tiles
zelda.sala_secreta_A = {
	roomDone1:false,
	roomDone2:false,
	
	init:function(){
		this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
	},
	
    preload:function(){
        //this.game.stage.backgroundColor = "#ff0000";
        this.game.stage.backgroundColor = "#black";
        //----------Tiles del layaut base------------
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        //-------------------------------------------
        this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_oldman.png",16,16);
        this.load.spritesheet("pocion","img/pocion_vida.png",16,16);
        this.load.spritesheet("corazon","img/slot_corazon.png",16,16);
		this.load.image("inventario", "img/inventario.png");
		this.load.image("collider", "img/camara_horizontal.png");
		
		//para el prefab de link
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16); this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
		
		this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    
    create:function(){
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
        
		if(!this.roomDone1&&zelda.LinkObject.currentZone == 11 || !this.roomDone2&&zelda.LinkObject.currentZone==34){
			//npc
			this.npc = this.game.add.sprite(8*16, 4*16, "npc", 0);
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn",[0,1,2,3],6,false);
			this.npc.animations.add("despawn",[3,4],6,true);
			this.npc.animations.play("spawn");
			this.npc.animations.currentAnim.onComplete.add(function(){
				//objetos cuando acaba de spawnear el npc
				zelda.sala_secreta_A.corazon = zelda.game.add.sprite(6*16, 6*16,"corazon",0);
				zelda.sala_secreta_A.pocion = zelda.game.add.sprite(9*16, 6*16, "pocion",0);
				zelda.game.physics.arcade.enable(zelda.sala_secreta_A.corazon);
				zelda.game.physics.arcade.enable(zelda.sala_secreta_A.pocion);
				zelda.sala_secreta_A.corazon.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_A.pocion.animations.add("despawn",[0,1],6,true);
				
			});
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
    },
    
    update:function(){
        //SALIR DE LA SALA
		this.game.physics.arcade.collide(this.link.LinkCollider,this.trigger,function(){
			zelda.LinkPrefab.stairWayUp(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY);
			zelda.gameOptions.GoToOverworld();
		});
		
		if(!this.roomDone1&&zelda.LinkObject.currentZone == 11 || !this.roomDone2&&zelda.LinkObject.currentZone==34){
			this.game.physics.arcade.overlap(this.link.LinkCollider,this.corazon, function(link,corazon){
				zelda.LinkPrefab.GrabObject();
				corazon.y -= 8;
				zelda.sala_secreta_A.npc.animations.play("despawn");
				zelda.sala_secreta_A.pocion.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_A.corazon.destroy();
					zelda.sala_secreta_A.pocion.destroy();
					zelda.sala_secreta_A.npc.destroy();
				});
				if(zelda.LinkObject.currentZone==11) zelda.sala_secreta_A.roomDone1 = true;
				else if(zelda.LinkObject.currentZone==34) zelda.sala_secreta_A.roomDone2 = true;
			});
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.pocion, function(link,pocion){
				zelda.LinkPrefab.GrabObject();
				pocion.y -= 8;
				zelda.Inventory.GetObject(10);
				zelda.sala_secreta_A.npc.animations.play("despawn");
				zelda.sala_secreta_A.corazon.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_A.corazon.destroy();
					zelda.sala_secreta_A.pocion.destroy();
					zelda.sala_secreta_A.npc.destroy();
				});
				if(zelda.LinkObject.currentZone==11) zelda.sala_secreta_A.roomDone1 = true;
				else if(zelda.LinkObject.currentZone==34) zelda.sala_secreta_A.roomDone2 = true;
			});
		}
		
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
    }
};