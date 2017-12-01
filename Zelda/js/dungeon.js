var zelda = zelda || {}

zelda.dungeon = {
	init:function(){
		this.game.world.setBounds(0,-47,6*16*16,6*11*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
	},
    preload:function(){
        this.load.tilemap("dungeonMap", "json/Dungeon1.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("DungeonGround", "img/Dungeon/DungeonGround.png");
        this.load.image("walls_dungeon", "img/tilesets/walls_dungeon.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
		this.load.image("LinkCollider", "img/link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
        this.load.spritesheet("llave", "img/llave.png",16,16);

    },

    create:function(){
        this.map = this.game.add.tilemap("dungeonMap");
        this.map.addTilesetImage("DungeonGround");
        this.map.addTilesetImage("walls_dungeon");
        ///Ya se crean las dos capas, Obstacles y ground
        this.map.createLayer("ladrillicos");
        this.map.createLayer("suelo");
        this.map.createLayer("obstaculos");
        this.map.createLayer("walls_top");
        this.map.createLayer("walls_right");
        this.map.createLayer("walls_bot");
        this.map.createLayer("walls_left");
		
		
		//this.background = this.game.add.sprite(0,0, "Dungeon1NoFloor");
		//this.game.physics.arcade.enable(this.background);
		//this.background.body.immovable = true;
        
		this.Link = new zelda.LinkPrefab(this.game,2*16*16 + 8*16 ,5*11*16 + 7*16,this);
		
        //Inputs, flechas para andar y Space para atacar por ahora
        /*
		this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
        this.sword = this.game.add.sprite(0,0,"Sword");
        this.sword.anchor.setTo(0.5);
        this.sword.kill();
        this.sword.Alive = false;
        
        this.game.physics.arcade.enable(this.sword);

        this.projectile = this.game.add.sprite(0,0,"Sword");
        this.projectile.anchor.setTo(0.5);
        this.projectile.kill();
        this.projectile.Alive = false;
        this.projectile.outOfBoundsKill = true;
        this.projectile.checkWorldBounds = true;
        this.projectile.events.onOutOfBounds.add(function notAlive(){this.projectile.Alive = false;}, this);
        
        this.game.physics.arcade.enable(this.projectile);

        //Spritesheet de Link, con sus animaciones de movimiento (LAS DE ATAQUE SON FRAMES QUIETOS) al que se aplican las físicas
        this.Link = this.game.add.sprite(0,0, "Link");
        this.Link.scale.setTo(1);
        this.Link.anchor.x = 0.5;
        this.Link.anchor.y = 0.5;
		this.Link.animations.add("movingDown", [0,1], 5, true);
        this.Link.animations.add("movingUp", [2], 5, true);
        this.Link.animations.add("movingSideWays", [3,4],5,true);
		this.Link.animations.add("movingDownHurt", [14,15], 5, true);
        this.Link.animations.add("movingUpHurt", [16], 5, true);
        this.Link.animations.add("movingSideWaysHurt", [17,18],5,true);        
        
        this.game.physics.arcade.enable(this.Link);
        */
		
        //Camara
        this.camera.follow(this.Link, Phaser.Camera.FOLLOW_PLATFORMER);
        
		//Prefab del inventario
		this.inventario = new zelda.InventarioPrefab(this.game,0,0,this);   
    },
    
    update:function(){
		this.game.physics.arcade.collide(this.Link.LinkCollider,this.background);
    },
    
    //===========================================================================================================CARGANDO GRUPOS===========================================================================================================
    loadHearts:function(){
		this.hearts = this.add.group();
		this.hearts.enableBody = true;
	},
    
    loadKeys:function(){
		this.keys = this.add.group();
		this.keys.enableBody = true;
	},
    
    loadRupies:function(){
        this.rupies = this.add.group(),
        this.rupies.enableBody = true;
        
    },
    //===========================================================================================================INSTANCIADORES DE ITEMS===========================================================================================================
    
    creteKey: function(posX,posY){
        var key = this.keys.getFirstExists(false);
        if(!key){
            key = new zelda.KeyPrefab(this.game,posX,posY,this);
            this.keys.add(key);
        }else{
            key.reset(posX,posY);
            key.Alive = true;
        }
    },
    
    
    createHeart:function(posX,posY,which){
		var heart = this.hearts.getFirstExists(false);
		if(!heart){
            heart = new zelda.HeartPrefab(this.game,posX,posY,this,which);
			this.hearts.add(heart);
		}else{
			heart.reset(posX,posY);
            heart.Alive = true
            if(which==0){
                heart.frame = 0;
                heart.type = 1;
            }
            else{ 
                heart.frame = 1;
                heart.type = 0;
                }
            }
    },
    
    createRupy:function(posX,posY,which){
        console.log("Creating Rupy");
        var rupy = this.rupies.getFirstExists(false);
        if(!rupy){
            rupy = new zelda.RupyPrefab(this.game,posX,posY,this,which);
            this.rupies.add(rupy);
        }else{
            rupy.reset(posX,posY);
            if(which==0){
                rupy.frame = 0;
                rupy.type = 0;
            }
            else {
                rupy.frame = 1;
                rupy.type = 1;
            }
		}
        
    },
    createBomb:function(posX,posY,which){
        console.log("Creating Rupy");
        var bomb= this.bombs.getFirstExists(false);
        if(!bomb){
            bomb = new zelda.BombPrefab(this.game,posX,posY,this,which);
            this.bombs.add(bomb);
        }else{
            bomb.reset(posX,posY);
            if(which==0)
                bomb.frame = 0;
            else bomb.frame = 1;
		}
        
    },
    
}
