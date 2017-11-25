var zelda = zelda || {}

zelda.overworld = {
    init:function(){
        this.game.world.setBounds(0,0,112*16,60*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        zelda.enemySpawns.InitZones();
        zelda.overworld.spawnStuff = true;
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
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("cursor","img/inventario/selector.png")
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
        this.load.audio("OverWorldMusic","sounds/Music/OverWorldTheme.mp3");
        this.load.audio("ShootProjectile","sounds/Sfx/sword_shoot.wav");
        this.load.audio("SwordAttak","sounds/Sfx/sword_slash.wav");
        this.load.audio("EnemyHurt","sounds/Sfx/enemy_hit.wav");
        this.load.audio("GetHeart","sounds/Sfx/get_heart.wav");
        this.load.audio("GetHurt","sounds/Sfx/link_hurt.wav");
        this.load.audio("ShieldBlock","sounds/Sfx/shield.wav");
        this.load.spritesheet("Moblin","img/MoblinSpriteSheet.png",16,16);
        this.load.spritesheet("Arrow","img/arrow.png",16,16);
        this.load.spritesheet("PeaHat","img/PeaHatSpriteSheet.png",16,16);
        this.load.spritesheet("Particles","img/ProjectileParticles.png",16,16);
       this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create:function(){
        
        this.overworldMusic = this.add.audio("OverWorldMusic");
        //this.overworldMusic.play();
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

        this.playMusic = false;
        
        //Camara
        this.game.camera.focusOnXY(zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        //console.log("Focusing on" + zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        
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
		this.trigger_I_3 = this.game.add.sprite(6*16*16+2*16, 2*11*16+6*16+5*16, "trigger");
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
        
        //this.peahat = new zelda.PeaHatPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.peahat);
        
        
        this.loadHearts();

        this.createHeart(620,840,this,1);
        
        this.loadEnemies();
        
        this.muteButton = this.game.input.keyboard.addKey(Phaser.Keyboard.M); 
        
        this.InvButton = this.game.input.keyboard.addKey(Phaser.Keyboard.I); 
        this.ObjbButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F); 

        //this.riverZola = new zelda.RiverZolaPrefab(this.game,0,850,this);
        //this.game.add.existing(this.riverZola);
        //this.riverZola.Alive = false;
        
        //this.leever = new zelda.LeeverPrefab(this.game,640,850,1,this,1);
        //this.game.add.existing(this.leever);
        
        this.linkInstance = new zelda.LinkPrefab(this.game,640,850,this);
		
		//INVENTARIO POR ENCIMA DE TODO LO DEMÁS
        this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		//evento para quitar la pausa
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
        
        //pintar corazones
        /*for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            
                 }*/

    },
    
    update:function(){
                       //console.log(this.moblin.animations);
        this.ScrollInventario();
                if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.Q)){
                    //this.riverZola.Alive = true;
                    //this.createEnemy("Oktorok",this.game,640,850,this,1,1);
                    console.log("Zona = " + zelda.LinkObject.currentZone + " Posicion = " + this.linkInstance.body.position);
                }
        
                if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.O)){
                    //this.riverZola.Alive = true;
                    //this.createEnemy("Oktorok",this.game,640,850,this,1,1);
                    zelda.overworld.spawnStuff = !zelda.overworld.spawnStuff;
                    console.log(zelda.overworld.spawnStuff);
                }
        
                if(this.muteButton.isDown&&this.muteButton.downDuration(1)){
                    if(!this.playMusic)   {
                        this.playMusic = true;
                        this.overworldMusic.play();
                    }else{
                        this.playMusic = false;
                        this.overworldMusic.stop();
                    }
                        
                }
        
        
   
        this.MoveCamera();
        
        this.SetBorders();
        
        this.LinkBorderColision();
        
        this.ProjectileBorderColision();
        
        this.LinkSecretRoomColision();
        
        
		zelda.Inventory.MovementCursor();
        
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
         if(this.InvButton.isDown && zelda.Inventory.released && this.InvButton.downDuration(1)){
             //console.log(this.inventario.position.y);
            zelda.gameOptions.InventoryScroll=zelda.game.camera.y;
            zelda.Inventory.released = false;
            zelda.Inventory.ScrollingInventory = true;
            console.log(zelda.Inventory.ScrollingInventory);

        }
        
            if(!this.InvButton.isDown ){
                             zelda.Inventory.released = true;
             }
        
         if(this.ObjbButton.isDown && this.ObjbButton.downDuration(1)){
            if(zelda.Inventory.InvON==true){
             zelda.Inventory.SelecObjB();
             zelda.Inventory.PintarObjB();
             console.log(zelda.Inventory.ObjectB);}
             else{
                 
             }
             }
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}

    }, 
    //======================FINAL DEL UPDATE===========================
    
        ScrollInventario(){
            
        if(zelda.gameOptions.InventoryScroll != 0){
            
            if(zelda.Inventory.InvON==true){
                this.inventario.fixedToCamera = false;
        
                
                this.inventario.position.y-=1;
                this.inventario.position.y+=-zelda.game.camera.y;
                this.inventario.position.x+=-zelda.game.camera.x;
                this.inventario.fixedToCamera = true;
               //console.log(this.inventario.position.y);
                
             if(this.inventario.position.y==-zelda.gameOptions.gameHeight+47){
                zelda.gameOptions.InventoryScroll=0;
                
                 //killing sprites
                  if(zelda.Inventory.CreateBombs==true){
                     zelda.Inventory.bomb.kill();
                    zelda.Inventory.CreateBombs=false;
                }
                
                if(zelda.Inventory.CreatePotion==true){
                    zelda.Inventory.potion.kill();
                    zelda.Inventory.CreatePotion=false;
                }
                 if(zelda.Inventory.CreateVela==true){
                     zelda.Inventory.vela.kill();
                    zelda.Inventory.CreateVela=false;
                }
                 
                  for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                    zelda.Inventory.heart[i].kill();
                   
            
                 }
                 for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            
                 }
                 
                 
                //things
                 console.log("cerrado");
                 zelda.Inventory.ScrollingInventory = false;
                 zelda.Inventory.selec.kill();
                 if(zelda.Inventory.ObjectB=="nothing"){
                     //zelda.Inventory.PintObj.kill();
                     
                     
                 }
                 else{
                     
                     zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
                     zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
                     zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
                     zelda.Inventory.PintObj.position.y=zelda.Inventory.PosObjBY;
                 }
                 
                if(zelda.Inventory.InvON!=false){
                   zelda.Inventory.InvON=false; 
                }
            }
            }
            else{
                
                
                
                     this.inventario.fixedToCamera = false;
        
                
                this.inventario.position.y+=1;
                this.inventario.position.y+=-zelda.game.camera.y;
                this.inventario.position.x+=-zelda.game.camera.x;
                this.inventario.fixedToCamera = true;
                zelda.Inventory.MovementCursor();
               // console.log(this.inventario.position.y);
             if(this.inventario.position.y>=0){
                zelda.gameOptions.InventoryScroll=0;
                console.log("abierto");
                 
                
                
                 
                 
                zelda.Inventory.draw();
                if(zelda.Inventory.InvON!=true){
                   zelda.Inventory.InvON=true; 
                     zelda.Inventory.PintarObjB();
                }
                
                 
                 //controles en inventario
                 
                 
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
                zelda.game.camera.y-=2;
            }else if(zelda.gameOptions.borderToSet=="Downwards"){
                zelda.game.camera.y+=2;
            }else if(zelda.gameOptions.borderToSet=="Right"){
                zelda.game.camera.x+=2;

            }else{
                zelda.game.camera.x-=2;
            }
        }
        //CUANDO LLEGA a la posición destinada se pone en false setBorders para ajustar los bordes de pantalla a la nueva escena
        else{
            if(zelda.gameOptions.cameraArrivedPos==false){
            zelda.gameOptions.cameraArrivedPos=true;
             zelda.gameOptions.setBorders=false;   
            zelda.overworld.createEnemiesOfCurrentZone();
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
            }
        });
        
    },
    
    LinkSecretRoomColision:function(){
        
        //TRIGGERS PARA CAMBIOS DE PANTALLA
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_espada, function(){
            zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x    ;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("sword_room");
        });
        
        this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_D, function(){
            zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("secret_room_D");
        });
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_M, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("secret_room_M");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_L, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x - 16;
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("secret_room_L");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_E, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();
            zelda.game.state.start("secret_room_E");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_D_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();

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
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_A, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();

            zelda.game.state.start("secret_room_A");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_H, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();
            zelda.game.state.start("secret_room_H");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_G, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();
            zelda.game.state.start("secret_room_G");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_K, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();
            zelda.game.state.start("secret_room_K");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_I_3, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_A_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.linkInstance.position.y+16;
            zelda.overworld.overworldMusic.stop();
            zelda.game.state.start("secret_room_A");
		});
		
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger_K_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.linkInstance.position.x + 16;
            zelda.overworld.overworldMusic.stop();
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
		}
    },
    
    createEnemiesOfCurrentZone:function(){
        if(zelda.overworld.spawnStuff){
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
    


