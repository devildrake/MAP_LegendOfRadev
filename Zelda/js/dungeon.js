var zelda = zelda || {}

zelda.dungeon = {
	init:function(){
		this.game.world.setBounds(0,-47,6*16*16,66*16+16*3);
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
		
		this.load.spritesheet("puerta_normal","img/puerta_normal.png",32,32);
		this.load.spritesheet("puerta_llave","img/puerta_llave.png",32,32);
    },

    create:function(){
        this.map = this.game.add.tilemap("dungeonMap");
        this.map.addTilesetImage("DungeonGround");
        this.map.addTilesetImage("walls_dungeon");
        ///Ya se crean las dos capas, Obstacles y ground
        this.map.createLayer("ladrillicos");
        this.map.createLayer("suelo");
        this.obstacles = this.map.createLayer("obstaculos");
        this.obstacles1 = this.map.createLayer("walls_top");
        this.obstacles2 = this.map.createLayer("walls_right");
        this.obstacles3 = this.map.createLayer("walls_bot");
        this.obstacles4 = this.map.createLayer("walls_left");
		
		this.map.setCollisionBetween(0,20,true,"obstaculos");
		this.map.setCollisionBetween(0,200,true,"walls_top");
		this.map.setCollisionBetween(0,200,true,"walls_right");
		this.map.setCollisionBetween(0,200,true,"walls_bot");
		this.map.setCollisionBetween(0,200,true,"walls_left");
		
		//this.background = this.game.add.sprite(0,0, "Dungeon1NoFloor");
		//this.game.physics.arcade.enable(this.background);
		//this.background.body.immovable = true;
        
		this.Link = new zelda.LinkPrefab(this.game,2*16*16 + 8*16 ,5*11*16 + 7*16,this);
		this.map.createLayer("ocultar");
		
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
		
		//pintado de las puertas de la dungeon.
		this.drawDoors();
		
        //Camara
        this.camera.focusOnXY(this.Link.LinkCollider.x, this.Link.LinkCollider.y);
		
		//Prefab del inventario
		this.inventario = new zelda.InventarioPrefab(this.game,0,0,this);   
    },
    
    update:function(){
		//MOVER LA CAMARA PARA DEBUGAR (con el WASD)
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.W)){
            zelda.game.camera.y -= 10;
        }else if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.S)){
            zelda.game.camera.y +=10;
        }
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.D)){
            zelda.game.camera.x += 10;
        }else if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.A)){
            zelda.game.camera.x -= 10;
        }
		
		if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.U))this.camera.follow(this.Link, Phaser.Camera.FOLLOW_PLATFORMER);
    },
	
	//Metodo que encapsula el pintado de las puertas.
	drawDoors:function(){
		this.allDoors = [];
		//0
		this.allDoors.push(this.game.add.sprite(2*16*16-16, 5*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[0].angle = 90;
		//1
		this.allDoors.push(this.game.add.sprite(2*16*16+16, 5*11*16+5*16+8,"puerta_normal",1));//izquierda
		this.allDoors[1].angle = -90;
		//2
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 5*11*16+16+1,"puerta_llave",0));//arriba
		//3
		this.allDoors.push(this.game.add.sprite(2*16*16+15*16, 5*11*16+5*16+8,"puerta_normal",1));//derecha
		this.allDoors[3].angle = 90;
		//4
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 5*11*16+10*16, "puerta_normal",1));//abajo
		this.allDoors[4].angle = 180;
		//5
		this.allDoors.push(this.game.add.sprite(3*16*16+16,5*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[5].angle = -90;
		//6
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 4*11*16+10*16, "puerta_normal",1));
		this.allDoors[6].angle = 180;
		//7
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 4*11*16+16+1,"puerta_normal",1));
		//8
		this.allDoors.push(this.game.add.sprite(1*16*16+8*16, 3*11*16+16+1,"puerta_normal",1));
		//9
		this.allDoors.push(this.game.add.sprite(1*16*16+15*16, 3*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[9].angle = 90;
		//10
		this.allDoors.push(this.game.add.sprite(2*16*16+16, 3*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[10].angle = -90;
		//11
		this.allDoors.push(this.game.add.sprite(2*16*16+15*16, 3*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[11].angle = 90;
		//12
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 3*11*16+10*16, "puerta_normal",1));
		this.allDoors[12].angle = 180;
		//13
		this.allDoors.push(this.game.add.sprite(3*16*16+16, 3*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[13].angle = -90;
		//14
		this.allDoors.push(this.game.add.sprite(0*16*16+15*16, 2*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[14].angle = 90;
		//15
		this.allDoors.push(this.game.add.sprite(1*16*16+16, 2*11*16+5*16+8,"puerta_normal",0));
		this.allDoors[15].angle = -90;
		//16
		this.allDoors.push(this.game.add.sprite(1*16*16+15*16, 2*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[16].angle = 90;
		//17
		this.allDoors.push(this.game.add.sprite(1*16*16+8*16, 2*11*16+10*16, "puerta_normal",1));
		this.allDoors[17].angle = 180;
		//18
		this.allDoors.push(this.game.add.sprite(2*16*16+16, 2*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[18].angle = -90;
		//19
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 2*11*16+16+1,"puerta_normal",1));
		//20
		this.allDoors.push(this.game.add.sprite(2*16*16+15*16, 2*11*16+5*16+8,"puerta_llave",0));
		this.allDoors[20].angle = 90;
		//21
		this.allDoors.push(this.game.add.sprite(3*16*16+16, 2*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[21].angle = -90;
		//22
		this.allDoors.push(this.game.add.sprite(3*16*16+15*16, 2*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[22].angle = 90;
		//23
		this.allDoors.push(this.game.add.sprite(4*16*16+16, 2*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[23].angle = -90;
		//24
		this.allDoors.push(this.game.add.sprite(4*16*16+8*16, 2*11*16+16+1,"puerta_normal",1));
		//25
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 1*11*16+16+1,"puerta_llave",0));
		//26
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 1*11*16+10*16, "puerta_normal",1));
		this.allDoors[26].angle = 180;
		//27
		this.allDoors.push(this.game.add.sprite(4*16*16+15*16, 1*11*16+5*16+8,"puerta_normal",0));
		this.allDoors[27].angle = 90;
		//28
		this.allDoors.push(this.game.add.sprite(4*16*16+8*16, 1*11*16+10*16, "puerta_normal",1));
		this.allDoors[28].angle = 180;
		//29
		this.allDoors.push(this.game.add.sprite(5*16*16+16, 1*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[29].angle = -90;
		//30
		this.allDoors.push(this.game.add.sprite(1*16*16+15*16, 0*11*16+5*16+8,"puerta_normal",1));
		this.allDoors[30].angle = 90;
		//31
		this.allDoors.push(this.game.add.sprite(2*16*16+16, 0*11*16+5*16+8,"puerta_llave",0));
		this.allDoors[31].angle = -90;
		//32
		this.allDoors.push(this.game.add.sprite(2*16*16+8*16, 0*11*16+10*16, "puerta_normal",1));
		this.allDoors[32].angle = 180;
		
		
		//muevo el ancla a todas las puertas y les activo las fisicas
		for(var i = 0; i<this.allDoors.length; i++){
			this.allDoors[i].anchor.setTo(.5);
			this.game.physics.arcade.enable(this.allDoors[i]);
		}
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
