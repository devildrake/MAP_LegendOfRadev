var zelda = zelda || {}

zelda.overworld = { 
	entradaAbierta:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
	
    init:function(){
        this.game.world.setBounds(0,0,112*16,60*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        zelda.overworld.enabledSpawns = true;
        zelda.overworld.mustCreateEnemies = false;
    },
    
    preload:function(){
        this.load.tilemap("map", "json/MapaZeldaOverWorld16x11ConOffset_Water.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("OverWorldTileSheetBien16x16", "img/tilesets/OverWorldTileSheetBien16x16.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
        this.load.spritesheet("Oktorok","img/OktorokSpriteSheet.png",16,16);
        this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
        this.load.image("camaraHorizontal", "img/camara_horizontal.png");
        this.load.image("camaraVertical", "img/camara_vertical.png");
        this.load.image("inventario", "img/inventario.png");
        this.load.image("bomba", "img/bomba.png");
        this.load.spritesheet("explosion","img/bombaSpriteSheet.png",16,16)
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("cursor","img/inventario/selector.png");
        this.load.spritesheet("sword", "img/Swords.png", 16,16);
        this.load.image("area","img/Explosion.png");
        //this.load.image("arco","img/bow.png");
        this.load.image("shield","img/escudo.png");
        this.load.image("triggerColor", "img/trigger_salas_color.png");
        this.load.image("trigger", "img/trigger_salas.png"); //trigger invisible
        this.load.image("rockProjectile","img/RockProjectile.png");
        this.load.spritesheet("riverZolaProjectile","img/ProyectilRiverZola.png",16,16);
        this.load.spritesheet("RiverZola","img/RiverZolaSpriteSheet.png",16,16);
        this.load.image("Heart","img/corazon.png");
        this.load.image("HalfHeart","img/mediocorazon.png");
        this.load.spritesheet("HeartSpriteSheet","img/HeartSpriteSheet.png",16,16);
        this.load.spritesheet("Tektite","img/TektiteSpriteSheet.png",16,16);
        this.load.spritesheet("Leever","img/LeeverSpriteSheet.png",16,16);
        this.load.audio("getItem","sounds/Sfx/get_item.wav");
        this.load.audio("OverWorldMusic","sounds/Music/OverWorldTheme.mp3");
        this.load.audio("ShootProjectile","sounds/Sfx/sword_shoot.wav");
        this.load.audio("SwordAttak","sounds/Sfx/sword_slash.wav");
        this.load.audio("EnemyHurt","sounds/Sfx/enemy_hit.wav");
        this.load.audio("GetHeart","sounds/Sfx/get_heart.wav");
        this.load.audio("GetHurt","sounds/Sfx/link_hurt.wav");
        this.load.audio("ShieldBlock","sounds/Sfx/shield.wav");
        this.load.audio("Stairs","sounds/Sfx/stairs.wav");
        this.load.audio("LinkHurt","sounds/Sfx/link_hurt.wav");
        this.load.audio("LowHp","sounds/Sfx/low_health.wav");
        this.load.audio("GrabHeart","sounds/Sfx/get_heart.wav");
        this.load.audio("getSpecialItem","sounds/Sfx/receive_item.mp3");
        this.load.spritesheet("Moblin","img/MoblinSpriteSheet.png",16,16);
        this.load.spritesheet("Arrow","img/arrow.png",16,16);
        this.load.spritesheet("PeaHat","img/PeaHatSpriteSheet.png",16,16);
        this.load.spritesheet("Particles","img/ProjectileParticles.png",16,16);
        this.load.image("GroundTile","img/GroundSprite.png");
        this.load.spritesheet("Stalfos","img/StalfosSpriteSheet.png",16,16);
        this.load.spritesheet("Keese","img/KeeseSpriteSheet.png",16,16);
        this.load.spritesheet("Goriya","img/GoriyaSpriteSheet.png",16,16);
       	this.game.load.script('webfont','http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.spritesheet("Gel","img/GelSpriteSheet.png",16,16);
        this.load.spritesheet("Boomerang","img/Boomerang.png",16,16);
        this.load.spritesheet("rupia", "img/RupiaSpriteSheet.png",16,16);
        this.load.audio("DieMusic","sounds/Music/DeathMusic.wav");
        this.load.image("SpikesTrap","img/SpikesTrap.png");
        this.load.spritesheet("Aquamentus","img/AquamentusSpriteSheet.png",32,32);
        this.load.spritesheet("DeathParticles","img/DeathParticles.png",16,16);
        this.load.spritesheet("AquamentusProjectile","img/ProyectilAquamentus.png",16,16);
        this.load.audio("PlaceBomb","sounds/Sfx/place_bomb.mp3");
        this.load.audio("BlowBomb","sounds/Sfx/blow_bomb.mp3");
        this.load.audio("UsePotion","sounds/Sfx/use_potion.wav");
        this.load.spritesheet("AquamentusProjectile","img/ProyectilAquamentus.png",16,16);
        this.load.spritesheet("FireSpriteSheet","img/fuego.png",16,16);
        this.load.spritesheet("WallMaster","img/WallMasterSpriteSheet.png",16,16);
        this.t = this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
        
        //sprites para bloquear las entradas secretas
        this.load.image("arbol","img/arbol.png");
        this.load.image("pared_verde","img/pared_verde.png");
        this.load.image("pared_marron","img/pared_marron.png");

        
        //mapa
        this.load.image("minimap","img/Minimapa.png");
        this.load.image("pointMap","img/pointMap.png");
		this.load.image("suelo","img/suelo.png");
		this.load.image("roca","img/roca.png");

    },

    create:function(){
        
        this.music = this.add.audio("OverWorldMusic");
        this.music.play();
        this.music.loop = true;

        //this.getItemMusic = this.add.audio("getItem");

        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("OverWorldTileSheetBien16x16");
        
        ///Ya se crean las dos capas, Obstacles y ground
        this.ground = this.map.createLayer("Ground");
        this.obstacles = this.map.createLayer("Obstacles");
        this.water = this.map.createLayer("Water");
        
        //this.obstacles.fixedToCamera = false; this.obstacles.scrollFactorX = 0; this.obstacles.scrollFactorY = 5*16; this.obstacles.position.set(0,5*16);
        
        this.map.setCollisionBetween(1,144,true,"Obstacles");
        this.map.setCollisionBetween(1,144,true,"Water");

        this.playMusic = true;
        
        //Camara
        this.game.camera.focusOnXY(zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        //console.log("Focusing on" + zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        if(zelda.game_over.Died){
        this.game.camera.focusOnXY(zelda.gameOptions.originalCameraPosX,zelda.gameOptions.originalCameraPosY);
        zelda.game_over.Died=false;
        }
        //this.game.camera.position.y-=4;
        
        this.SetCamera();
        
        
        
        //TRIGGERS PARA SALAS SECRETAS
        this.trigger_espada = this.game.add.sprite(2*16*16 + 4*16, 4*11*16 + 16 +5*16, "trigger");
        this.game.physics.arcade.enable(this.trigger_espada);
         
        this.trigger_D = this.game.add.sprite(16*16+6*16, 4*11*16 + 16+5*16, "trigger");
        this.game.physics.arcade.enable(this.trigger_D);
        
		this.trigger_M = this.game.add.sprite(16*16+7*16, 3*11*16+16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_M);
        
        //Escalera
		this.trigger_I = this.game.add.sprite(16*16+10*16, 2*11*16 + 6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_I);
		
        //Escalera
        this.trigger_L = this.game.add.sprite(16*16+9*16, 11*16+7*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_L);
        
        //Escalera
		this.trigger_E = this.game.add.sprite(3*16*16+4*16, 4*11*16+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_E);
        
        //Escalera
		this.trigger_D_2 = this.game.add.sprite(3*16*16+2*16, 3*11*16+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_D_2);
        
        //Escalera
		this.trigger_M_2 = this.game.add.sprite(3*16*16+6*16, 2*11*16+5*16+5*16, "trigger");
        this.game.physics.arcade.enable(this.trigger_M_2);

        //Escalera
		this.trigger_I_2 = this.game.add.sprite(4*16*16+9*16, 4*11*16 + 5*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_I_2);
        
        //Escalera
		this.trigger_A = this.game.add.sprite(4*16*16+5*16, 16*11+3*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_A);
        
        
        //Escalera
		this.trigger_H = this.game.add.sprite(5*16*16+6*16,5*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_H);
        
        //Escalera
		this.trigger_G = this.game.add.sprite(5*16*16+12*16, 3*16*11+6*16+5*16, "trigger");
        this.game.physics.arcade.enable(this.trigger_G);

        //Escalera
		this.trigger_K = this.game.add.sprite(5*16*16+11*16, 16*11+1*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_K);
        
        //Escalera
		this.trigger_I_3 = this.game.add.sprite(6*16*16+2*16, 2*11*16+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_I_3);
        
		this.trigger_A_2 = this.game.add.sprite(6*16*16+9*16, 4*11*16 + 1*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_A_2);
        
		this.trigger_K_2 = this.game.add.sprite(6*16*16+11*16, 16*11+2*16+5*16    , "trigger");
		this.game.physics.arcade.enable(this.trigger_K_2);
        
        this.trigger_Dungeon = this.game.add.sprite(624,144, "trigger");
        this.game.physics.arcade.enable(this.trigger_Dungeon);
		
		//bloqueos de las entradas secretas
		this.CreateBlocks();
		this.BlocksAlive();//Metodo que controla si los bloques ya han sido destruidos.
        
        
        //this.oktorok = new zelda.OktorokPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.oktorok);
        
        //this.coraçao = new zelda.HeartPrefab(this.game,620,840,this,1);
        //this.game.add.existing(this.coraçao);
        
        
        //this.gel = new zelda.GelPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.gel);

        
        //this.tektite = new zelda.TektitePrefab(this.game,620,840,1,this,30);
        //this.game.add.existing(this.tektite);
        
        //this.moblin = new zelda.MoblinPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.moblin);
        
        //this.peahat = new zelda.PeaHatPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.peahat);
        
        //this.goriya = new zelda.GoriyaPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.goriya);
        
        //this.trap = new zelda.SpikesTrapPrefab(this.game,640,850,1,this,1,30,0);
        //this.game.add.existing(this.trap);
        
        this.loadHearts();
        this.loadRupies();
        this.loadBombs();
        this.createHeart(620,840,this,1);
        this.loadDeathParticles();
        this.loadEnemies();
        
        this.muteButton = this.game.input.keyboard.addKey(Phaser.Keyboard.M); 
        this.spawnDisablerButton = this.game.input.keyboard.addKey(Phaser.Keyboard.O)
        //this.ObjbButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F); 

        //this.riverZola = new zelda.RiverZolaPrefab(this.game,0,850,this);
        //this.game.add.existing(this.riverZola);
        //this.riverZola.Alive = false;
        
        //this.leever = new zelda.LeeverPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.leever);
        
        this.linkInstance = new zelda.LinkPrefab(this.game,zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY,this);
		
        //guardar en que escena esta por si muere
        zelda.LinkObject.DiedIn="overworld";
		
		//evento para quitar la pausa
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
        
        //this.stalfos = new zelda.StalfosPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.stalfos);
        //this.keese = new zelda.KeesePrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.keese);
        
        //this.wallmaster = new zelda.WallMasterPrefab(this.game,640,850,1,this,3,2,2);
        //this.game.add.existing(this.wallmaster);

        //this.aquamentus = new zelda.AquamentusPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.aquamentus);
        
        this.inventario = new zelda.InventarioPrefab(this.game,0,0,this);
        
         //iniciar punto en mapa
        this.point= zelda.game.add.sprite(zelda.game.camera.x+36+12*zelda.Inventory.pointCurrentX,zelda.game.camera.y+38+8*zelda.Inventory.pointCurrentY, "pointMap");
    },
    
    update:function(){   
        //console.log(zelda.Inventory.plantedFire);
        //console.log(this.linkInstance);
        if(zelda.Inventory.plantedFire!=true)
        zelda.FirePrefab.Update(zelda.Inventory.plantedFire);
        
        this.MoveCamera();
        
        this.SetBorders();
        
        this.LinkBorderColision();
        
        this.ProjectileBorderColision();
        
        this.LinkSecretRoomColision();
        
        //console.log(this.mustCreateEnemies);
        
        if(zelda.gameOptions.mustCreateEnemies){
            zelda.gameOptions.mustCreateEnemies = false;
            this.createEnemiesOfCurrentZone();
        }

		if(this.spawnDisablerButton.isDown&&this.spawnDisablerButton.downDuration(1)){
			//this.riverZola.Alive = true;
			//this.createEnemy("Oktorok",this.game,640,850,this,1,1);
			zelda.overworld.enabledSpawns = !zelda.overworld.enabledSpawns;
			console.log(zelda.overworld.enabledSpawns);
		}        
		if(this.muteButton.isDown&&this.muteButton.downDuration(1)){
			if(!this.playMusic)   {
				this.playMusic = true;
				this.music.play();
                this.music.loop = true;

			}else{
				this.playMusic = false;
				this.music.stop();
                this.music.loop = false;

			}

		}
        
        if(!this.music.isPlaying&&this.playMusic&&!zelda.LinkObject.goingDownStairWay&&!zelda.LinkObject.goingUpStairWay){
            //this.music.play();
            
        }
        
        //objeto b
        this.ObjBKey=zelda.game.input.keyboard.addKey(Phaser.Keyboard.R);
        if( this.ObjBKey.isDown && this.ObjBKey.downDuration(1)){
            //console.log("o");
            zelda.Inventory.scene="overworld";
            zelda.Inventory.UseObjectB();
        }
        
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}

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
        
        
        //overlaps con la explosion
        if(zelda.Inventory.ExplosionOn){
            
        for(var i=0;i<this.oktoroks.children.length;i++){
            if(this.oktoroks.children[i].Alive){
                    zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.oktoroks.children[i],
                        function(rupy,Enemy){
                        zelda.overworld.oktoroks.children[i].lives = 0;
                        } );

            }
        }
        
        for(var i=0;i<this.tektites.children.length;i++){
            if(this.tektites.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.tektites.children[i],
                function(rupy,Enemy){
                        zelda.overworld.tektites.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.moblins.children.length;i++){
            if(this.moblins.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.moblins.children[i],
                function(rupy,Enemy){
                        zelda.overworld.moblins.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.leevers.children.length;i++){
            if(this.leevers.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.leevers.children[i],
                function(rupy,Enemy){
                        zelda.overworld.leevers.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.peahats.children.length;i++){
            if(this.peahats.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.peahats.children[i],
                function(rupy,Enemy){
                        zelda.overworld.peahats.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.riverZolas.children.length;i++){
            if(this.riverZolas.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.riverZolas.children[i],
                function(rupy,Enemy){
                        zelda.overworld.riverZolas.children[i].lives = 0;
                } );
            }
        }
            
                        
                        
                        //PA LAS SALAS SECRETAS HAZ UN GRUPO DE OBJETOS A ROMPER Y YA
                        
    }
            
        
        //overlaps fuego
        
        if(zelda.Inventory.fireOn){
            
        for(var i=0;i<this.oktoroks.children.length;i++){
            if(this.oktoroks.children[i].Alive){
                console.log(zelda.Inventory.plantedFire);
                    this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.oktoroks.children[i],
                        function(rupy,Enemy){
                        zelda.overworld.oktoroks.children[i].lives = 0;
                        } );

            }
        }
        
        for(var i=0;i<this.tektites.children.length;i++){
            if(this.tektites.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.tektites.children[i],
                function(rupy,Enemy){
                        zelda.overworld.tektites.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.moblins.children.length;i++){
            if(this.moblins.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.moblins.children[i],
                function(rupy,Enemy){
                        zelda.overworld.moblins.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.leevers.children.length;i++){
            if(this.leevers.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.leevers.children[i],
                function(rupy,Enemy){
                        zelda.overworld.leevers.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.peahats.children.length;i++){
            if(this.peahats.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.peahats.children[i],
                function(rupy,Enemy){
                        zelda.overworld.peahats.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.riverZolas.children.length;i++){
            if(this.riverZolas.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.riverZolas.children[i],
                function(rupy,Enemy){
                        zelda.overworld.riverZolas.children[i].lives = 0;
                } );
            }
        }
                        //PA LAS SALAS SECRETAS HAZ UN GRUPO DE OBJETOS A ROMPER Y YA
                        
        }
		
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider, this.blockGroup, function(l,o){
			console.log(o.key);
		});
    
    }, 
    //======================FINAL DEL UPDATE===========================
    
	//funcion que crea los sprites que forman los bloqueos para las entradas secretas
	CreateBlocks:function(){
		this.blockGroup = this.game.add.group();
		
       	this.blockGroup.add(this.game.add.sprite(16*16+6*16, 48+4*11*16+3*16,"pared_verde"));//0
		this.blockGroup.add(this.game.add.sprite(16*16+7*16, 48+3*11*16+3*16,"pared_verde"));//1
		this.blockGroup.add(this.game.add.sprite(16*16+10*16, 48+2*11*16+8*16,"arbol"));//2
		this.blockGroup.add(this.game.add.sprite(16*16+9*16,48+11*16+9*16,"arbol"));//3
		this.blockGroup.add(this.game.add.sprite(3*16*16+4*16, 48+4*11*16+8*16,"arbol"));//4
		this.blockGroup.add(this.game.add.sprite(3*16*16+2*16, 48+3*11*16+8*16,"arbol"));//5
		this.blockGroup.add(this.game.add.sprite(3*16*16+6*16, 48+2*11*16+7*16,"arbol"));//6
		this.blockGroup.add(this.game.add.sprite(4*16*16+5*16, 48+1*11*16+5*16,"arbol"));//7
		this.blockGroup.add(this.game.add.sprite(4*16*16+9*16, 48+4*11*16+7*16,"suelo"));//8
		this.blockGroup.add(this.game.add.sprite(5*16*16+12*16, 48+3*11*16+8*16,"arbol"));//9
		this.blockGroup.add(this.game.add.sprite(6*16*16+2*16, 48+2*11*16+8*16,"arbol"));//10
		this.blockGroup.add(this.game.add.sprite(5*16*16+11*16, 48+1*11*16+3*16,"pared_verde"));//11
		this.blockGroup.add(this.game.add.sprite(6*16*16+9*16, 48+4*11*16+3*16,"pared_marron"));//12
		this.blockGroup.add(this.game.add.sprite(4*16*16+8*16, 48+4*11*16+7*16,"roca"));//13
		this.blockGroup.add(this.game.add.sprite(4*16*16+9*16, 48+4*11*16+6*16,"roca"));//14
		this.blockGroup.add(this.game.add.sprite(4*16*16+10*16, 48+4*11*16+7*16,"roca"));//15
		this.blockGroup.add(this.game.add.sprite(4*16*16+9*16, 48+4*11*16+8*16,"roca"));//16
		this.game.physics.arcade.enable(this.blockGroup);
		this.blockGroup.setAll("body.immovable",true);
    },
	
	BlocksAlive:function(){
		for(var i = 0; i<this.blockGroup.children.length; i++){
			if(this.entradaAbierta[i])this.blockGroup.children[i].kill();
		}
		
	},
    
	SetCamera:function(){
        this.cameraTop = this.game.add.sprite(this.camera.x, this.camera.y + 47, "camaraHorizontal");
        this.cameraTop.anchor.setTo(0,1); 
        this.game.physics.arcade.enable(this.cameraTop);
        //this.cameraTop.fixedToCamera = true;
        this.cameraTop.body.immovable = true;
        
        this.cameraBot = this.game.add.sprite(this.camera.x, this.camera.y+this.camera.height, "camaraHorizontal");
        this.game.physics.arcade.enable(this.cameraBot);
        //this.cameraBot.fixedToCamera = true;
        this.cameraBot.body.immovable = true;
        
        this.cameraRight = this.game.add.sprite(this.camera.x+this.camera.width, this.camera.y, "camaraVertical");
        this.game.physics.arcade.enable(this.cameraRight);
        //this.cameraRight.fixedToCamera = true;
        this.cameraRight.body.immovable = true;
        
        this.cameraLeft = this.game.add.sprite(this.camera.x, this.camera.y, "camaraVertical");
        this.cameraLeft.anchor.setTo(1,0);
        this.game.physics.arcade.enable(this.cameraLeft);
        //this.cameraRight.fixedToCamera = true;
        this.cameraLeft.body.immovable = true;
    },
    
   MoveCamera:function(){
               //Se comprueba si la posición de la camara no es la destiada (cameraPosToGoX y cameraPosToGoY y si el bool cameraArrivedPos es false para mover incrementalmente la camara)
        if((zelda.game.camera.y!=zelda.gameOptions.cameraPosToGoY||zelda.game.camera.x!=zelda.gameOptions.cameraPosToGoX)&&!zelda.gameOptions.cameraArrivedPos){
            if(zelda.gameOptions.borderToSet=="Upwards"){
                zelda.game.camera.y-=2;
             
            }else if(zelda.gameOptions.borderToSet=="Downwards"){
                zelda.game.camera.y+=2;
               
            }else if(zelda.gameOptions.borderToSet=="Right"){
                zelda.game.camera.x+=2;
                
            }else{
                zelda.game.camera.x-=2;
                
            }
                            this.inventario.movingCamera=true;
                            zelda.overworld.point.position.x=zelda.game.camera.x+36+(12*zelda.Inventory.pointCurrentX);
                            zelda.overworld.point.position.y=zelda.game.camera.y+38+(8*zelda.Inventory.pointCurrentY);

        }
        //CUANDO LLEGA a la posición destinada se pone en false setBorders para ajustar los bordes de pantalla a la nueva escena
        else{
            if(zelda.gameOptions.cameraArrivedPos==false){
                zelda.gameOptions.cameraArrivedPos=true;
                 zelda.gameOptions.setBorders=false;   
                zelda.overworld.createEnemiesOfCurrentZone();
                this.inventario.movingCamera=false;

            }
        }
   },

    SetBorders:function(){
                //SE AJUSTAN LOS BORDES cuando setBorders es false y en función de borderToSet, el cual cambia en los métodos de las colisiones con los bordes
        if(!zelda.gameOptions.setBorders){
            if(zelda.gameOptions.borderToSet=="Upwards"){
            zelda.overworld.cameraTop.body.position.y -= zelda.overworld.camera.height-47-800;
            zelda.overworld.cameraBot.body.position.y -= zelda.overworld.camera.height-47;
            zelda.overworld.cameraLeft.body.position.y -= zelda.overworld.camera.height-47;
            zelda.overworld.cameraRight.body.position.y -= zelda.overworld.camera.height-47;
            }   else if(zelda.gameOptions.borderToSet=="Downwards"){
            zelda.overworld.cameraTop.body.position.y += zelda.overworld.camera.height-47;
            zelda.overworld.cameraBot.body.position.y += zelda.overworld.camera.height-47+800;
            zelda.overworld.cameraLeft.body.position.y += zelda.overworld.camera.height-47;
            zelda.overworld.cameraRight.body.position.y += zelda.overworld.camera.height-47;
            
            }else if(zelda.gameOptions.borderToSet=="Right"){
            zelda.overworld.cameraTop.body.position.x += zelda.overworld.camera.width;
            zelda.overworld.cameraBot.body.position.x += zelda.overworld.camera.width;
            zelda.overworld.cameraRight.body.position.x += zelda.overworld.camera.width+800;
            zelda.overworld.cameraLeft.body.position.x += zelda.overworld.camera.width;
            }else{
            zelda.overworld.cameraTop.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.cameraBot.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.cameraRight.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.cameraLeft.body.position.x -= zelda.overworld.camera.width-800;
            }
            zelda.gameOptions.setBorders=true;   
        }
    },
    
    LinkBorderColision:function(){
        //FUNCIONAMIENTO DEL CAMBIO DE CAMARA A NIVEL SET DE INFORMACIÓN, SE ESTABLECE QUE cameraArrived es false y se modifica a donde debe ir la cámara en función de con que borde ha chocado
		
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraTop, function(){
            if(zelda.LinkObject.lookingUp){

                zelda.overworld.despawnEnemiesOfPreviousZone();
                zelda.gameOptions.cameraArrivedPos = false;
                zelda.gameOptions.cameraPosToGoX = zelda.overworld.camera.x;
                zelda.gameOptions.cameraPosToGoY = zelda.overworld.camera.y;
                zelda.gameOptions.cameraPosToGoY-=zelda.overworld.camera.height-47;

                zelda.gameOptions.borderToSet = "Upwards";

                zelda.overworld.linkInstance.position.y -= 4;

                zelda.overworld.linkInstance.LinkCollider.body.y-=4;

                zelda.LinkObject.currentZone-=7;

                zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
                zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;

                zelda.overworld.cameraTop.body.position.y-=800;

                //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
                ///console.log(zelda.gameOptions.lastCameraPosX);
                //console.log(zelda.gameOptions.lastCameraPosY);
                   // console.log("Camera trying to go to" + zelda.gameOptions.cameraPosToGoY);
                //zelda.overworld.createEnemiesOfCurrentZone();
                zelda.Inventory.pointCurrentY-=1;
                
            }
		});
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraBot, function(){
            if(zelda.LinkObject.lookingDown){
                zelda.overworld.despawnEnemiesOfPreviousZone();
                zelda.gameOptions.borderToSet = "Downwards";
                zelda.gameOptions.cameraArrivedPos = false;
                zelda.gameOptions.cameraPosToGoX = zelda.overworld.camera.x;
                zelda.gameOptions.cameraPosToGoY = zelda.overworld.camera.y;
                zelda.gameOptions.cameraPosToGoY+=zelda.overworld.camera.height-47;


                //OFFSET
                zelda.overworld.cameraBot.body.position.y -=800;

                zelda.overworld.linkInstance.position.y += 4;
                zelda.overworld.linkInstance.LinkCollider.body.y+=4;
                zelda.LinkObject.currentZone+=7;
                zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
                zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;
                //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
                //console.log(zelda.gameOptions.lastCameraPosX);
                //console.log(zelda.gameOptions.lastCameraPosY);

                //console.log("Camera trying to go to" + zelda.gameOptions.cameraPosToGoY);
                        //zelda.overworld.createEnemiesOfCurrentZone();
                 zelda.Inventory.pointCurrentY+=1;
            }
        });
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraRight,function(){
            if(zelda.LinkObject.lookingRight){

                zelda.overworld.despawnEnemiesOfPreviousZone();
                zelda.gameOptions.borderToSet = "Right";
                zelda.gameOptions.cameraArrivedPos = false;
                zelda.gameOptions.cameraPosToGoX = zelda.overworld.camera.x;
                zelda.gameOptions.cameraPosToGoY = zelda.overworld.camera.y;
                zelda.gameOptions.cameraPosToGoX+=zelda.overworld.camera.width;

                //OFFSET
                zelda.overworld.cameraRight.body.position.x -=800;
                zelda.overworld.linkInstance.position.x += 4;
                zelda.overworld.linkInstance.LinkCollider.body.x+=4;
                zelda.LinkObject.currentZone++;
                zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
                zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;
                //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
                //console.log(zelda.gameOptions.lastCameraPosX);
                //console.log(zelda.gameOptions.lastCameraPosY);
                        //zelda.overworld.createEnemiesOfCurrentZone();
                zelda.Inventory.pointCurrentX+=1;
            }
        });
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraLeft,function(){
            if(zelda.LinkObject.lookingLeft){
            zelda.overworld.despawnEnemiesOfPreviousZone();
            zelda.gameOptions.borderToSet = "Left";
            zelda.gameOptions.cameraArrivedPos = false;
            zelda.gameOptions.cameraPosToGoX = zelda.overworld.camera.x;
            zelda.gameOptions.cameraPosToGoY = zelda.overworld.camera.y;
            zelda.gameOptions.cameraPosToGoX-=zelda.overworld.camera.width;
            
            //OFFSET
            zelda.overworld.cameraLeft.body.position.x -=800;
            
            zelda.overworld.linkInstance.position.x -= 4;
            zelda.overworld.linkInstance.LinkCollider.body.x-=4;
            zelda.LinkObject.currentZone--;
            zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
            zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;
            //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            //console.log(zelda.gameOptions.lastCameraPosX);
            //console.log(zelda.gameOptions.lastCameraPosY);
            //zelda.overworld.createEnemiesOfCurrentZone();
               zelda.Inventory.pointCurrentX-=1;
            }
        });
        
    },
    
    LinkSecretRoomColision:function(){  
        /* //Escaleras
		this.game.physics.arcade.enable(this.trigger_I);
		this.game.physics.arcade.enable(this.trigger_L);
		this.game.physics.arcade.enable(this.trigger_E);
		this.game.physics.arcade.enable(this.trigger_D_2);
        this.game.physics.arcade.enable(this.trigger_M_2);
		this.game.physics.arcade.enable(this.trigger_I_2);
		this.game.physics.arcade.enable(this.trigger_A);
		this.game.physics.arcade.enable(this.trigger_H);
        this.game.physics.arcade.enable(this.trigger_G);
		this.game.physics.arcade.enable(this.trigger_K);
		this.game.physics.arcade.enable(this.trigger_I_3);*/
        
        //TRIGGERS PARA CAMBIOS DE PANTALLA
        if(!zelda.LinkObject.goingUpStairWay){
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_espada, function(){
            if(zelda.LinkObject.lookingUp){
                zelda.overworld.linkInstance.LinkCollider.body.position.x = zelda.overworld.trigger_espada.body.position.x+4;

                zelda.LinkObject.lastPositionX = zelda.overworld.trigger_espada.body.position.x+8;
                zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+9;
                zelda.overworld.music.stop();
                //zelda.game.state.start("sword_room");
                var posToSpawnSprite = zelda.overworld.trigger_espada.body.position;
                zelda.LinkPrefab.stairWayDown(posToSpawnSprite,"sword_room");
            }
        });
            
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_Dungeon, function(){
            if(zelda.LinkObject.lookingUp){
                zelda.overworld.linkInstance.LinkCollider.body.position.x = zelda.overworld.trigger_Dungeon.body.position.x+4;
                zelda.LinkObject.lastPositionX = zelda.overworld.trigger_Dungeon.body.position.x+8;
                zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+9;
                zelda.overworld.music.stop();
                var posToSpawnSprite = zelda.overworld.trigger_Dungeon.body.position;
                zelda.LinkPrefab.stairWayDown(posToSpawnSprite,"dungeon");
            }
		});
        
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_D, function(){
            if(zelda.LinkObject.lookingUp){
                zelda.overworld.linkInstance.LinkCollider.body.position.x = zelda.overworld.trigger_D.body.position.x+4;
                zelda.LinkObject.lastPositionX = zelda.overworld.trigger_D.body.position.x+8;
                zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+9;
                zelda.overworld.music.stop();

                //zelda.game.state.start("secret_room_D");
                var posToSpawnSprite = zelda.overworld.trigger_D.body.position;
                zelda.LinkPrefab.stairWayDown(posToSpawnSprite,"secret_room_D");
            }
        });
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_M, function(){
            if(zelda.LinkObject.lookingUp){
                zelda.overworld.linkInstance.LinkCollider.body.position.x = zelda.overworld.trigger_M.body.position.x+4;
                zelda.LinkObject.lastPositionX = zelda.overworld.trigger_M.body.position.x+8;
                zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+9;
                zelda.overworld.music.stop();

                //zelda.game.state.start("secret_room_M");
                var posToSpawnSprite = zelda.overworld.trigger_M.body.position;
                zelda.LinkPrefab.stairWayDown(posToSpawnSprite,"secret_room_M");
            }
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_I.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.trigger_I.position.y + 8;
            zelda.overworld.music.stop();

            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_L, function(){
			zelda.LinkObject.lastPositionY = zelda.overworld.trigger_L.body.position.y + 8 ;
            zelda.LinkObject.lastPositionX =  zelda.overworld.trigger_L.body.position.x - 8;
            zelda.overworld.music.stop();

            zelda.game.state.start("secret_room_L");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_E, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_E.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.trigger_E.position.y;
            zelda.overworld.music.stop();
            zelda.game.state.start("secret_room_E");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_D_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_D_2.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.trigger_D_2.position.y;
            zelda.overworld.music.stop();

            zelda.game.state.start("secret_room_D");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_M_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_M_2.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.trigger_M_2.position.y;
            zelda.overworld.music.stop();
            zelda.game.state.start("secret_room_M");
		});
		
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_I_2.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.trigger_I_2.position.y;
            zelda.overworld.music.stop();

            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_A, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_A.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.music.stop();

            zelda.game.state.start("secret_room_A");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_H, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_H.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.music.stop();
            zelda.game.state.start("secret_room_H");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_G, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.trigger_G.position.x - 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.music.stop();
            zelda.game.state.start("secret_room_G");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_K, function(){
            if(zelda.LinkObject.lookingUp){
                zelda.overworld.linkInstance.LinkCollider.body.position.x = zelda.overworld.trigger_K.body.position.x+4;
                zelda.LinkObject.lastPositionX = zelda.overworld.trigger_K.body.position.x+8;
                zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+9;

                zelda.overworld.music.stop();
                //zelda.game.state.start("secret_room_K");
                var posToSpawnSprite = zelda.overworld.trigger_K.body.position;
                zelda.LinkPrefab.stairWayDown(posToSpawnSprite,"secret_room_K");
            }
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I_3, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.music.stop();
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_A_2, function(){
          if(zelda.LinkObject.lookingUp){
                zelda.overworld.linkInstance.LinkCollider.body.position.x = zelda.overworld.trigger_A_2.body.position.x+4;
                zelda.LinkObject.lastPositionX = zelda.overworld.trigger_A_2.body.position.x+8;
                zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+9;
                zelda.overworld.music.stop();
                //zelda.game.state.start("secret_room_A");
                var posToSpawnSprite = zelda.overworld.trigger_A_2.body.position;
                zelda.LinkPrefab.stairWayDown(posToSpawnSprite,"secret_room_A");
          }
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_K_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 16;
            			zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y;

            zelda.overworld.music.stop();
            zelda.game.state.start("secret_room_K");
		});
        }
    },
    
    ProjectileBorderColision:function(){
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraBot,function(){
        zelda.overworld.linkInstance.projectile.Alive = false;
        zelda.overworld.linkInstance.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraLeft,function(){
        zelda.overworld.linkInstance.projectile.Alive = false;
        zelda.overworld.linkInstance.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraTop,function(){
        zelda.overworld.linkInstance.projectile.Alive = false;
        zelda.overworld.linkInstance.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraRight,function(){
        zelda.overworld.linkInstance.projectile.Alive = false;
        zelda.overworld.linkInstance.projectile.kill();    
        });
    },
    
    loadHearts:function(){
		this.hearts = this.add.group();
		this.hearts.enableBody = true;
	},
    
    loadRupies:function(){
        this.rupies = this.add.group();
        this.rupies.enableBody = true;
        
    },
    loadBombs:function(){
        this.bombs = this.add.group();
        this.bombs.enableBody = true;
        
    },
    
    loadDeathParticles:function(){
        this.deathParticles = this.add.group();
        this.deathParticles.enableBody = true;
    },
    
    loadEnemies:function(){
        this.oktoroks = this.add.group();
        this.oktoroks.enableBody = true;

        this.tektites = this.add.group();
        this.tektites.enableBody = true;

        this.moblins = this.add.group();
        this.moblins.enableBody = true;

        this.peahats = this.add.group();
        this.peahats.enableBody = true;

        this.riverZolas = this.add.group();
        this.riverZolas.enableBody = true;

        this.leevers = this.add.group();
        this.leevers.enableBody = true;
        },
    
    createDeathParticles:function(posX,posY,level){
        var particles = this.deathParticles.getFirstExists(false);
        if(!particles){
            console.log(this.deathParticles);
            particles = new zelda.DeathParticlesPrefab(this.game,posX,posY,level);
            this.deathParticles.add(particles);
        }else{
            particles.frame = 0;
            particles.Alive = true;
            particles.reset(posX,posY);
        }
    },
    
    createEnemy:function(enemy, Agame, posX, posY, level, type, movingTowards, currentZone, posInArray){
            if(enemy== "Oktorok"){
                var oktorok = this.oktoroks.getFirstExists(false);
                if(!oktorok){
                    oktorok = new zelda.OktorokPrefab(this.game,posX,posY,type,level,movingTowards,currentZone,posInArray);
                    this.oktoroks.add(oktorok);
                }else{
                    oktorok.type = type;
                    oktorok.reset(posX,posY);
                    oktorok.currentZone = currentZone;
                    oktorok.posInArray = posInArray;
                    zelda.OktorokPrefab.Respawn(oktorok);
                    oktorok.initialSpeed = movingTowards;
                }
                console.log(oktorok.currentZone);
            }
            
            if(enemy== "Peahat"){
                var peahat = this.peahats.getFirstExists(false);
                if(!peahat){
                    peahat = new zelda.PeaHatPrefab(this.game,posX,posY,type,level,movingTowards,currentZone,posInArray);
                    this.peahats.add(peahat);
                }else{
                    peahat.reset(posX,posY);
                    peahat.initialSpeed = movingTowards;
                    peahat.type = type;
                    peahat.Alive = true;
                    peahat.spawned = false;
                    peahat.calledSpawn = false;
                    peahat.firstFewFrames = false;
                    peahat.lives = 3;
                    peahat.currentZone = currentZone;
                    peahat.posInArray = posInArray;


                }
            }
            
            if(enemy== "Tektite"){
                var tektite = this.tektites.getFirstExists(false);
                if(!tektite){
                    //En este caso movinTowards tiene que ser el offsetMaximo, 30 es un buen numero
                    tektite = new zelda.TektitePrefab(this.game,posX,posY,type,level,movingTowards,currentZone,posInArray);
                    this.tektites.add(tektite);
                }else{
                    tektite.currentZone = currentZone;
                    tektite.reset(posX,posY);
                    tektite.hurt = false;
                    tektite.calledNotHurt = true;
                    tektite.Alive = true;
                    tektite.type = type;
                    tektite.jumping = false;
                    tektite.calledStopJumping = false;
                    if(tektite.type==0){
                        tektite.lives = 1;
                        }
                    else{
                        tektite.lives = 3;
                    }
                    tektite.spawned  = false;
                    tektite.calledSpawn = false;
                    tektite.posInArray = posInArray;

                }
            }
            
            if(enemy == "Leever"){
                var leever = this.leevers.getFirstExists(false);
                if(!leever){
                    leever = new zelda.LeeverPrefab(this.game,posX,posY,type,level,currentZone,posInArray);
                    this.leevers.add(leever);
                }else{
                    leever.currentZone = currentZone;
                    leever.reset(posX,posY);
                    leever.type = type;
                    leever.posInArray = posInArray;

                    zelda.LeeverPrefab.Respawn(leever);
                    
                }
            }
            
            if(enemy== "RiverZola"){
                var riverZola = this.riverZolas.getFirstExists(false);
                if(!riverZola){
                    riverZola = new zelda.RiverZolaPrefab(this.game,posX,posY,level,currentZone,posInArray);
                    this.riverZolas.add(riverZola);
                }else{
                    riverZola.reset(posX,posY);
                    riverZola.Alive = true;
                    riverZola.currentZone = currentZone;
                    riverZola.posInArray = posInArray;

                    riverZola.lives = 3;
                }
            }
            
            if(enemy== "Moblin"){
                var moblin = this.moblins.getFirstExists(false);
                if(!moblin){
                    moblin = new zelda.MoblinPrefab(this.game,posX,posY,type,level,movingTowards,currentZone,posInArray);
                    this.moblins.add(moblin);
                }
                else{
                    moblin.currentZone = currentZone;
                    moblin.type = type;
                    moblin.reset(posX,posY);
                    zelda.MoblinPrefab.Respawn(moblin);
                    moblin.posInArray = posInArray;
                    moblin.initialSpeed = movingTowards;
                }
            }
            
    },
	
	createHeart:function(posX,posY,which){
		var heart = this.hearts.getFirstExists(false);
		if(!heart){
            heart = new zelda.HeartPrefab(this.game,posX,posY,this,which);
			this.hearts.add(heart);
		}else{
			heart.reset(posX,posY);
            heart.calledKill=false;
            heart.Alive = true;
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
    
    createEnemiesOfCurrentZone:function(){
        if(zelda.overworld.enabledSpawns){
        var j = 0;
            for(var i = 0;i<zelda.enemySpawns.zones[zelda.LinkObject.currentZone].length;++i){
                if(zelda.enemySpawns.zones[zelda.LinkObject.currentZone][i]==true){
                    zelda.overworld.createEnemy(zelda.enemySpawns.especieEnemigos[zelda.LinkObject.currentZone][i],this.game,zelda.enemySpawns.posicionesEnemigos[zelda.LinkObject.currentZone][j],zelda.enemySpawns.posicionesEnemigos[zelda.LinkObject.currentZone][j+1],zelda.overworld,zelda.enemySpawns.tipoEnemigos[zelda.LinkObject.currentZone][i],zelda.enemySpawns.initialSpeedEnemigos[zelda.LinkObject.currentZone][i],zelda.LinkObject.currentZone,i);
                    console.log("Spawning a " + zelda.enemySpawns.especieEnemigos[zelda.LinkObject.currentZone][i]);
                    console.log("at " + zelda.enemySpawns.posicionesEnemigos[zelda.LinkObject.currentZone][j] + ", " +zelda.enemySpawns.posicionesEnemigos[zelda.LinkObject.currentZone][j+1]);
                }
                            j+=2;
        }
        }
    },
    
    despawnEnemiesOfPreviousZone:function(){
        for(var i=0;i<this.oktoroks.children.length;i++){
            if(this.oktoroks.children[i].Alive){
                this.oktoroks.children[i].Alive = false;
                this.oktoroks.children[i].kill();
                this.oktoroks.children[i].projectile.Alive = false;
                this.oktoroks.children[i].projectile.kill()

            }
        }
        
        for(var i=0;i<this.tektites.children.length;i++){
            if(this.tektites.children[i].Alive){
                this.tektites.children[i].Alive = false;
                this.tektites.children[i].kill();
            }
        }
        
        for(var i=0;i<this.moblins.children.length;i++){
            if(this.moblins.children[i].Alive){
                this.moblins.children[i].Alive = false;
                this.moblins.children[i].kill();
                this.moblins.children[i].projectile.Alive = false;
                this.moblins.children[i].projectile.kill()
            }
        }
        
        for(var i=0;i<this.leevers.children.length;i++){
            if(this.leevers.children[i].Alive){
                this.leevers.children[i].Alive = false;
                this.leevers.children[i].kill();
            }
        }
        
        for(var i=0;i<this.peahats.children.length;i++){
            if(this.peahats.children[i].Alive){
                this.peahats.children[i].Alive = false;
                this.peahats.children[i].kill();
            }
        }
        
        for(var i=0;i<this.riverZolas.children.length;i++){
            if(this.riverZolas.children[i].Alive){
                this.riverZolas.children[i].Alive = false;
                this.riverZolas.children[i].kill();
                this.riverZolas.children[i].projectile.Alive = false;
                this.riverZolas.children[i].projectile.kill()
            }
        }       
    }
}