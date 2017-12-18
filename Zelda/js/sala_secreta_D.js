var zelda = zelda || {}

zelda.sala_secreta_D = {
	roomDone1:false,
	roomDone2:false,
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
        this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_oldman.png",16, 16);
		this.load.image("inventario", "img/inventario.png");
		this.load.image("collider", "img/camara_horizontal.png");
		this.load.image("collider_inv", "img/collider_invisible.png");
		   //-----------Inventario
		
        this.load.image("bomba", "img/bomba.png");
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("cursor","img/inventario/selector.png");
        this.load.spritesheet("sword", "img/Swords.png", 16,16);
        //this.load.image("arco","img/bow.png");
        this.load.image("shield","img/escudo.png");
        //-----------------------------
		//para el prefab de link
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16); this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
		
		this.game.load.script('webfont','http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
		
		this.load.audio("text_sound", "sounds/Sfx/text.wav");
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
		
        //npc
        this.npc = this.game.add.sprite(8*16, 4*16, "npc", 0);
        this.npc.anchor.setTo(.5,0);
		this.npc.animations.add("spawn",[0,1,2,3],6, false);
		this.npc.animations.play("spawn");
		this.game.physics.arcade.enable(this.npc);
		this.npc.body.immovable = true;
		
		if(!this.roomDone1&&zelda.LinkObject.currentZone == 29 || !this.roomDone2&&zelda.LinkObject.currentZone==24){
			//TEXTO
			this.numeros = this.game.add.bitmapText(8*16-8,7*16-8,"zelda_font","-10",8);
			this.numeros.align = "center";
			
			//TEXTOS EN PANTALLA
			this.str  = "PAY ME FOR THE DOOR\nREPAIR CHARGE.";
			this.strToPrint = "";
			this.strCount = 0;
			this.textTimer = 0;

			this.texto = this.game.add.bitmapText(3*16+4,16*2+4,"zelda_font","",8);
			this.texto.align = "center";
			
			//Sonido de cuando aparecen los textos
			this.textSound = this.game.add.audio("text_sound");
		}
		this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
		zelda.Inventory.ScrollingInventory = true;
		
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
            if(zelda.LinkObject.currentZone==29)
           	zelda.LinkPrefab.stairWayUp(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY);
            
            zelda.gameOptions.mustCreateEnemies = true;
            
			zelda.gameOptions.GoToOverworld();
		});
		this.game.physics.arcade.collide(this.link.LinkCollider, this.collider);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.npc);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire1);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire2);

		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}
		
		if(!this.roomDone1&&zelda.LinkObject.currentZone == 29 || !this.roomDone2&&zelda.LinkObject.currentZone==24){
			
			zelda.Inventory.rupies -= 10;
			if(zelda.Inventory.rupies<0) zelda.Inventory.rupies = 0;
			
			if(this.strToPrint.length != this.str.length && this.textTimer>zelda.secretLayout.textSpeed){
				this.strToPrint += this.str[this.strCount];
				this.texto.setText(this.strToPrint);
				this.strCount++;
				this.textTimer = 0;
				this.textSound.play();
			}
			//cuando acaba de pintar el texto.
			if(this.str.length == this.strToPrint.length){
				if(zelda.LinkObject.currentZone == 29)zelda.sala_secreta_D.roomDone1 = true;
				else if(zelda.LinkObject.currentZone == 24)zelda.sala_secreta_D.roomDone2 = true;
				zelda.Inventory.ScrollingInventory = false;
				zelda.Inventory.rupies -= 10;
				if(zelda.Inventory.rupies<0) zelda.Inventory.rupies = 0;
			}
			this.textTimer += zelda.game.time.elapsed;

		}else{
			zelda.Inventory.ScrollingInventory = false;
		}
		
		
    }
	
   
};