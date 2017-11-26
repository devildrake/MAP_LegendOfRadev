var zelda = zelda || {}

zelda.sala_espada = {
	roomDone:false,
	
    init:function(){
        this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        
        //ESTA LINEA ES LA NECESARIA EN CADA SALA SECRETA PARA QUE LINK HAGA BIEN LA PSEUDOANIMACION DE ANDAR PARRIBA
        zelda.LinkObject.switched = false;
	},
    
    preload:function(){
         this.game.stage.backgroundColor = "#black";
        //----------Tiles del layaut base------------
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_oldman.png",16, 16);
        //-------------------------------------------
        this.load.spritesheet("sword", "img/Swords.png", 16,16);
        this.load.image("inventario", "img/inventario.png");
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
		
		
        
		if(!this.roomDone){
			//npc
			this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn",[0,1,2,3],6, false);
			this.npc.animations.add("despawn",[3,4], 6, true);
			this.npc.animations.play("spawn");
			//cuando acaba la animacion de spawn del npc aparece la espada.
			this.npc.animations.currentAnim.onComplete.add(function(){
				this.sword = this.game.add.sprite(zelda.secretLayout.item2X, zelda.secretLayout.itemY+8, "sword", 1);
				this.sword.anchor.setTo(.5);
				this.sword.scale.setTo(1,-1);
				
				this.game.physics.arcade.enable(this.sword);
			},this);
			
			//TEXTOS EN PANTALLA
			this.str  = "IT'S DANGEROUS TO GO\nALONE! TAKE THIS.";
			this.strToPrint = "";
			this.strCount = 0;
			this.textTimer = 0;
			this.textUpdateTime = 50;

			this.texto = this.game.add.text(3*16,16*2+4,this.strToPrint);
			this.texto.fill = "white";
			this.texto.font = "Press Start 2P";
			this.texto.fontSize = 8;
			this.texto.align = "center";
		}
        
        this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
        
        this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
		
		this.trigger = this.game.add.sprite(0,180,"collider");
		this.game.physics.arcade.enable(this.trigger);
		this.trigger.body.immovable = true;
    },
    
    update:function(){
		this.game.physics.arcade.collide(this.link.LinkCollider,this.trigger,function(){
            zelda.LinkPrefab.stairWayUp(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY);
			zelda.gameOptions.GoToOverworld();
            
		});
       		
		if(!this.roomDone){
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.sword, function(link,sword){
				//console.log("agregar al inventario");
				zelda.LinkPrefab.GrabObject();
                zelda.LinkPrefab.getSpecialItemSound.play();
				sword.y -= 8;
				zelda.sala_espada.npc.animations.play("despawn");
				zelda.sala_espada.texto.destroy();
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					console.log("time event");
					zelda.sala_espada.sword.destroy();
					zelda.sala_espada.npc.destroy();
				});
				zelda.sala_espada.roomDone = true;
				zelda.Inventory.hasSword = true;
			});
			
			//animacion de aparicion de los textos
			if(this.strToPrint.length != this.str.length && this.textTimer>this.textUpdateTime && !this.roomDone){
				this.strToPrint += this.str[this.strCount];
				this.texto.setText(this.strToPrint);
				this.strCount++;
				this.textTimer = 0;
			}
			this.textTimer += zelda.game.time.elapsed;
		}
		
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}	
	}
}