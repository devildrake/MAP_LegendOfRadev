var zelda = zelda || {}

zelda.sala_secreta_dungeon = {
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
		this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
		this.load.tilemap("sala", "json/Dungeon_Sala_Secreta_fake.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_dungeon_tile", "img/tilesets/secret_dungeon_tile.png");
		this.load.image("collider_salida", "img/camara_horizontal_trans.png");
		this.load.image("container","img/HeartContainer.png");
        
        this.load.image("inventario", "img/inventario.png");
        //-----------Inventario
		
        this.load.image("bomba", "img/bomba.png");
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("cursor","img/inventario/selector.png");
        this.load.image("emptyHeart","img/emptycorazon.png");
        this.load.image("minimap","img/Minimapa.png");
        this.load.image("pointMap","img/pointMap.png");
        
        //this.load.image("arco","img/bow.png");
        this.load.image("shield","img/escudo.png");
		
		//para el prefab de link
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16); 
		this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
	},
    
        SetCamera:function(){
        this.cameraTop = this.game.add.sprite(this.camera.x, this.camera.y + 47+16, "camaraHorizontal");
        this.cameraTop.anchor.setTo(0,1); 
        this.game.physics.arcade.enable(this.cameraTop);
        //this.cameraTop.fixedToCamera = true;
        this.cameraTop.body.immovable = true;
        
        this.cameraBot = this.game.add.sprite(this.camera.x, this.camera.y+this.camera.height-16, "camaraHorizontal");
        this.game.physics.arcade.enable(this.cameraBot);
        //this.cameraBot.fixedToCamera = true;
        this.cameraBot.body.immovable = true;
        
        this.cameraRight = this.game.add.sprite(this.camera.x+this.camera.width-16, this.camera.y, "camaraVertical");
        this.game.physics.arcade.enable(this.cameraRight);
        //this.cameraRight.fixedToCamera = true;
        this.cameraRight.body.immovable = true;
        
        this.cameraLeft = this.game.add.sprite(this.camera.x+16, this.camera.y, "camaraVertical");
        this.cameraLeft.anchor.setTo(1,0);
        this.game.physics.arcade.enable(this.cameraLeft);
        //this.cameraRight.fixedToCamera = true;
        this.cameraLeft.body.immovable = true;
    },
	
	create:function(){		
		this.map = this.game.add.tilemap("sala");
        this.map.addTilesetImage("secret_dungeon_tile");
        this.obstacles = this.map.createLayer("paredes");
		this.map.createLayer("escaleras");
		this.map.setCollisionBetween(1,3,true,"paredes");
		
		//esto es lo que crea el funcionamiento para salir de la sala.
		this.salida = this.game.add.sprite(0,0,"collider_salida");
		this.salida.anchor.setTo(0,1);
		this.game.physics.arcade.enable(this.salida);
		this.salida.body.immovable = true;

        this.linkInstance = new zelda.LinkPrefab(this.game,4*16-8,0,this);

        
		//SI AUN NO SE HA COMPLETADO LA SALA (COGER EL HEART CONTAINER)
		if(!this.roomDone){
			//this.container = this.game.add.sprite(8*16,5*16,"container");
			//this.game.physics.arcade.enable(this.container);
			//this.container.body.immovable = true;
            this.container = new zelda.HeartContainerPrefab(this.game,8*16,5*16,this);
			this.game.add.existing(this.container);
			//TODO esta es la parte del create que solo se ejecuta si no has completado la sala
			//		aqui puedes poner los enemigos para que solo salgan si aun no has completado la sala
			//		(es solo una idea, si ya tienes un sistema adelante!)
		}
		
        
        this.keese1 = new zelda.SpecialKeese(this.game,4*16+32,0,0,this,0);
        this.keese2 = new zelda.SpecialKeese(this.game,4*16+32,16,0,this,0);
        
		//this.link.body.gravity.y = 100;
        this.inventario = new zelda.InventarioPrefab(this.game,0,0,this);
        this.game.add.existing(this.keese1);
        this.game.add.existing(this.keese2);
        this.SetCamera();
        
        //zelda.Inventory.scene=="sala_secreta_Dungeon";
                zelda.LinkObject.currentLevel = this;


	},
	
	update:function(){
        
        this.ObjBKey=zelda.game.input.keyboard.addKey(Phaser.Keyboard.R);
            if( this.ObjBKey.isDown && this.ObjBKey.downDuration(1) && zelda.Inventory.InvON==false){
                //console.log("o");
                zelda.Inventory.scene="overworld";
                zelda.Inventory.UseObjectB();
            }
        
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.salida,function(){
			//volver a la dungeon
            zelda.gameOptions.mustCreateEnemies=true;
			zelda.game.state.start("dungeon");
		});
		
		//this.game.physics.arcade.overlap(this.linkInstance.LinkCollider,this.container,function(link,heart){
			//zelda.LinkObject.maxHearts++;	
			//heart.destroy();
			//zelda.sala_secreta_dungeon.roomDone = true;
		//});
        
    }
}