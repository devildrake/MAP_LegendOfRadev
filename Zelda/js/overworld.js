var zelda = zelda || {}

zelda.overworld = {
    init:function(){
        this.game.world.setBounds(0,0,112*16,60*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        zelda.enemySpawns.InitZones();

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
        //this.load.image("trigger", "img/trigger_salas_color.png");
        this.load.image("trigger", "img/trigger_salas.png"); //trigger invisible
        this.load.image("rockProjectile","img/RockProjectile.png");
        this.load.spritesheet("riverZolaProjectile","img/ProyectilRiverZola.png",16,16);
        this.load.spritesheet("RiverZola","img/RiverZolaSpriteSheet.png",16,16);
        this.load.image("Heart","img/corazon.png");
        this.load.image("HalfHeart","img/mediocorazon.png");
        this.load.spritesheet("Tektite","img/TektiteSpriteSheet.png",16,16);
        this.load.spritesheet("Leever","img/LeeverSpriteSheet.png",16,16);
        this.load.audio("getItem","sounds/Sfx/get_item.wav");
        this.load.spritesheet("Moblin","img/MoblinSpriteSheet.png",16,16);
        this.load.spritesheet("Arrow","img/arrow.png",16,16);
        this.load.spritesheet("PeaHat","img/PeaHatSpriteSheet.png",16,16);
    },

    create:function(){
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

        
        //Camara
        this.game.camera.focusOnXY(zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        console.log("Focusing on" + zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        
        this.SetCamera();
        
        
        
        //TRIGGERS PARA SALAS SECRETAS
        this.trigger_espada = this.game.add.sprite(2*16*16 + 4*16, 4*11*16 + 16 +5*16, "trigger");
        this.game.physics.arcade.enable(this.trigger_espada);
        this.trigger_D = this.game.add.sprite(16*16+6*16, 4*11*16 + 16+5*16, "trigger");
        this.game.physics.arcade.enable(this.trigger_D);
		this.trigger_M = this.game.add.sprite(16*16+7*16, 3*11*16+16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_M);
		this.trigger_I = this.game.add.sprite(16*16+10*16, 2*11*16 + 6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_I);
		this.trigger_L = this.game.add.sprite(16*16+9*16, 11*16+7*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_L);
		this.trigger_E = this.game.add.sprite(3*16*16+4*16, 4*11*16+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_E);
		this.trigger_D_2 = this.game.add.sprite(3*16*16+2*16, 3*11*16+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_D_2);
		this.trigger_M_2 = this.game.add.sprite(3*16*16+6*16, 2*11*16+5*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_M_2);
		this.trigger_I_2 = this.game.add.sprite(4*16*16+9*16, 4*11*16 + 5*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_I_2);
		this.trigger_A = this.game.add.sprite(4*16*16+5*16, 16*11+3*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_A);
		this.trigger_H = this.game.add.sprite(5*16*16+6*16,5*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_A);
		this.trigger_G = this.game.add.sprite(5*16*16+12*16, 3*16*11+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_G);
		this.trigger_K = this.game.add.sprite(5*16*16+11*16, 16*11+1*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_K);
		this.trigger_I_2 = this.game.add.sprite(6*16*16+2*16, 2*11*16+6*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_I_2);
		this.trigger_A_2 = this.game.add.sprite(6*16*16+9*16, 4*11*16 + 1*16+5*16, "trigger");
		this.game.physics.arcade.enable(this.trigger_A_2);
		this.trigger_K_2 = this.game.add.sprite(6*16*16+11*16, 16*11+2*16+5*16    , "trigger");
		this.game.physics.arcade.enable(this.trigger_K_2);
        
        
        
        //this.oktorok = new zelda.OktorokPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.oktorok);
        
        //this.coraçao = new zelda.HeartPrefab(this.game,620,840,this,1);
        //this.game.add.existing(this.coraçao);
        
        

        
        //this.tektite = new zelda.TektitePrefab(this.game,620,840,1,this,30);
        //this.game.add.existing(this.tektite);
        
        //this.moblin = new zelda.MoblinPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.moblin);
        
        this.peahat = new zelda.PeaHatPrefab(this.game,640,850,1,this,1);
        this.game.add.existing(this.peahat);
        
            	this.loadHearts()

        this.createHeart(620,840,this,1);
        
        
        this.riverZola = new zelda.RiverZolaPrefab(this.game,0,850,this);
        this.game.add.existing(this.riverZola);
        this.riverZola.Alive = false;
        
        //this.leever = new zelda.LeeverPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.leever);
        
        this.linkInstance = new zelda.LinkPrefab(this.game,640,850,this);
		
		//INVENTARIO POR ENCIMA DE TODO LO DEMÁS
        this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		//evento para quitar la pausa
		this.game.input.onDown.add(zelda.gameOptions.Unpause);


    },
    
    update:function(){
        
                       //console.log(this.moblin.animations);

                if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.Q)){
                    this.riverZola.Alive = true;
                }
   
        this.MoveCamera();
        
        this.SetBorders();
        
        this.LinkBorderColision();
        
        this.ProjectileBorderColision();
        
        this.LinkSecretRoomColision();
        
        this.ScrollInventario();
		
        
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
        
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.R)){
        
        zelda.LinkPrefab.GrabObject();
            //this.getItemMusic.play();
            //console.log(this.getItemMusic);
            
        }
         if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.I)){
             //console.log(this.inventario.position.y);
            zelda.gameOptions.InventoryScroll=zelda.game.camera.y;
             
        }
        
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}

    }, 
    //======================FINAL DEL UPDATE===========================
    
    ScrollInventario(){
        if(zelda.gameOptions.InventoryScroll != 0){
            
            
            if(this.InvON==true){
                this.inventario.fixedToCamera = false;
        
                
                this.inventario.position.y-=1;
                this.inventario.position.y+=-zelda.game.camera.y;
                this.inventario.position.x+=-zelda.game.camera.x;
                this.inventario.fixedToCamera = true;
                console.log(this.inventario.position.y);
             if(this.inventario.position.y==-zelda.gameOptions.gameHeight+47){
                zelda.gameOptions.InventoryScroll=0;
                
                //this.InventarioPre.kill();
                this.InvON=false;
            }
            }
            else{
                
                     this.inventario.fixedToCamera = false;
        
                
                this.inventario.position.y+=1;
                this.inventario.position.y+=-zelda.game.camera.y;
                this.inventario.position.x+=-zelda.game.camera.x;
                this.inventario.fixedToCamera = true;
                console.log(this.inventario.position.y);
             if(this.inventario.position.y>=0){
                zelda.gameOptions.InventoryScroll=0;
                
                this.InventarioPre = new zelda.InventarioPrefab(this.game,640,850,this);
                this.InvON=true;
                 
                 
                 
              }
                
            }
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
                zelda.game.camera.y-=1;
            }else if(zelda.gameOptions.borderToSet=="Downwards"){
                zelda.game.camera.y+=1;
            }else if(zelda.gameOptions.borderToSet=="Right"){
                zelda.game.camera.x+=1;

            }else{
                zelda.game.camera.x-=1;
            }
        }
        //CUANDO LLEGA a la posición destinada se pone en false setBorders para ajustar los bordes de pantalla a la nueva escena
        else{
            if(zelda.gameOptions.cameraArrivedPos==false){
            zelda.gameOptions.cameraArrivedPos=true;
             zelda.gameOptions.setBorders=false;   
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
            
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);
                console.log("Camera trying to go to" + zelda.gameOptions.cameraPosToGoY);

		});
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraBot, function(){
            
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
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);

            console.log("Camera trying to go to" + zelda.gameOptions.cameraPosToGoY);
            
        });
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraRight,function(){
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
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);
        });
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraLeft,function(){
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
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);

        });
    },
    
    LinkSecretRoomColision:function(){
        
        //TRIGGERS PARA CAMBIOS DE PANTALLA
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_espada, function(){
            zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x    ;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("sword_room");
        });
        
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_D, function(){
            zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_D");
        });
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_M, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_M");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_L, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x - 16;
            zelda.game.state.start("secret_room_L");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_E, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_E");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_D_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_D");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_M_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_M");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_A, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_H, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_H");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_G, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_G");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_K, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_K");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_A_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.game.state.start("secret_room_A");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_K_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 16;
            zelda.game.state.start("secret_room_K");
		});
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
	
	createHeart:function(posX,posY,which){
		var heart = this.hearts.getFirstExists(false);
		if(!heart){
            heart = new zelda.HeartPrefab(this.game,posX,posY,this,which);
			this.hearts.add(heart);
		}else{
			heart.reset(posX,posY);
		}
    },

    }
    
    


