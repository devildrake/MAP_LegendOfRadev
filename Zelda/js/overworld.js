var zelda = zelda || {}

zelda.overworld = {
    init:function(){
        this.game.world.setBounds(0,0,112*16,60*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        zelda.enemySpawns.InitZones();
    },
    
    preload:function(){
        this.load.tilemap("map", "json/MapaZeldaOverWorld16x11ConOffset.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("OverWorldTileSheetBien16x16", "img/tilesets/OverWorldTileSheetBien16x16.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
        this.load.image("LinkCollider","img/Link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
        this.load.image("camaraHorizontal", "img/camara_horizontal.png");
        this.load.image("camaraVertical", "img/camara_vertical.png");
        this.load.image("inventario", "img/inventario.png");
        this.load.image("trigger", "img/trigger_salas_color.png");
        //this.load.image("trigger", "img/trigger_salas.png");
    },

    create:function(){
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("OverWorldTileSheetBien16x16");
        
        ///Ya se crean las dos capas, Obstacles y ground
        this.map.createLayer("Ground");
        this.obstacles = this.map.createLayer("Obstacles");
        
        //this.obstacles.fixedToCamera = false; this.obstacles.scrollFactorX = 0; this.obstacles.scrollFactorY = 5*16; this.obstacles.position.set(0,5*16);
        
        
        this.map.setCollisionBetween(1,144,true,"Obstacles");
        
        //Inputs, flechas para andar y Space para atacar por ahora
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
        this.sword = this.game.add.sprite(0,0,"Sword");
        this.sword.anchor.setTo(0.5);
        this.sword.kill();
        this.sword.Alive = false;
        
        this.game.physics.arcade.enable(this.sword);

        this.projectile = this.game.add.sprite(0,0,"Sword");
        this.projectile.anchor.setTo(0.5);
        this.projectile.Alive = false;
        this.projectile.kill();
        
        this.projectile.outOfBoundsKill = true;
        this.projectile.checkWorldBounds = true;
        this.projectile.events.onOutOfBounds.add(function notAlive(){this.projectile.Alive = false;}, this);
        
        this.game.physics.arcade.enable(this.projectile);

        this.LinkCollider = this.game.add.sprite(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY,"LinkCollider");
        this.LinkCollider.anchor.setTo(0.5,0);
        this.LinkCollider.scale.setTo(1);
        
        //Spritesheet de Link, con sus animaciones de movimiento (LAS DE ATAQUE SON FRAMES QUIETOS) al que se aplican las físicas
        this.Link = this.game.add.sprite(zelda.LinkObject.lastPositionX, zelda.LinkObject.lastPositionY, "Link");
        this.Link.scale.setTo(1);
        this.Link.anchor.setTo(.5);
		this.Link.animations.add("movingDown", [0,1], 5, true);
        this.Link.animations.add("movingUp", [2], 5, true);
        this.Link.animations.add("movingSideWays", [3,4],5,true);
		this.Link.animations.add("movingDownHurt", [14,15], 5, true);
        this.Link.animations.add("movingUpHurt", [16], 5, true);
        this.Link.animations.add("movingSideWaysHurt", [17,18],5,true);        
        
        //this.game.physics.arcade.enable(this.Link);
        this.game.physics.arcade.enable(this.LinkCollider);
        
        //Camara
        this.game.camera.focusOnXY(zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        console.log("Focusing on" + zelda.gameOptions.lastCameraPosX,zelda.gameOptions.lastCameraPosY);
        
        //this.game.camera.follow(this.Link);
        this.SetCamera();
        
        //INVENTARIO POR ENCIMA DE TODO LO DEMÁS
        this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
        
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
    },
    
    update:function(){
        //Se reinicia la velocidad a 0 a cada frame           
        //this.Link.body.velocity.setTo(0);
        this.LinkCollider.body.velocity.setTo(0);
        
        //this.game.physics.arcade.collide(this.Link,this.obstacles);
        this.game.physics.arcade.collide(this.LinkCollider,this.obstacles);
        
        //La barra espaciadora pone attacking en true
        if(this.space.isDown&&this.space.downDuration(1)){
            if(!zelda.LinkObject.attacking){
                if(zelda.LinkObject.currentHearts==zelda.LinkObject.maxHearts){
                    if(zelda.LinkObject.lookingDown){
                    this.createProjectile(0);
                    }
                    else if(zelda.LinkObject.lookingUp){
                        this.createProjectile(1);
                    }else if(zelda.LinkObject.lookingLeft){
                        this.createProjectile(2);
                    }else {
                        this.createProjectile(3);
                    }
                }
            }
            zelda.LinkObject.attacking = true;
            
            //LINEA QUE HAY QUE BORRAR
            zelda.LinkObject.hurt = true;

        }
        
        if(zelda.LinkObject.hurt&&!zelda.LinkObject.calledNotHurt){
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5,this.NotHurt , this);
            zelda.LinkObject.calledNotHurt = true;
        }
        
        //Comportamiento si attacking es false, es el movimiento con las flechas 
        if(!zelda.LinkObject.attacking){
            if(this.cursors.left.isDown){
                
                //this.Link.body.velocity.x = -zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.x= -zelda.gameOptions.linkSpeed;
                
                if(zelda.LinkObject.hurt)
                    this.Link.animations.play("movingSideWaysHurt");
                else
                    this.Link.animations.play("movingSideWays");
                
                this.Link.scale.x = -1;
                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingLeft = true;
            }else if(this.cursors.right.isDown){
                
                if(zelda.LinkObject.hurt)
                    this.Link.animations.play("movingSideWaysHurt");
                else
                    this.Link.animations.play("movingSideWays");
                
                this.Link.scale.setTo(1);
                //this.Link.body.velocity.x = zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.x = zelda.gameOptions.linkSpeed;

                zelda.LinkObject.ResetLooking();

            }else if(this.cursors.up.isDown){
                if(!zelda.LinkObject.switched){
                    zelda.LinkObject.switched = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.15,this.switchLinkScale , this);
                }
                //this.Link.body.velocity.y = -zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.y = -zelda.gameOptions.linkSpeed;
                
                if(zelda.LinkObject.hurt)
                    this.Link.animations.play("movingUpHurt");
                else
                    this.Link.animations.play('movingUp');
                
                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingUp = true;

            }else if(this.cursors.down.isDown){
                this.Link.scale.setTo(1);
                //this.Link.body.velocity.y = zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.y = zelda.gameOptions.linkSpeed;
                
                if(zelda.LinkObject.hurt)
                    this.Link.animations.play("movingDownHurt");
                else
                    this.Link.animations.play('movingDown');
                
                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingDown = true;
            }
            else {
                if(zelda.LinkObject.lookingUp){
                    this.Link.animations.stop();
                }else if(zelda.LinkObject.lookingLeft){
                    this.Link.scale.x = -1;
                    if(zelda.LinkObject.hurt)
                        this.Link.frame = 14;
                    else 
                        this.Link.frame = 4;
                }else if(zelda.LinkObject.lookingDown){
                    if(zelda.LinkObject.hurt)
                        this.Link.frame = 14;
                    else    
                        this.Link.frame = 0;
                }else{
                    if(zelda.LinkObject.hurt)
                        this.Link.frame = 18;
                    else 
                        this.Link.frame = 4;
                }
            }
        }
        //Comportamiento si aun no se ha hecho invoke al método que pone attacking en false
        else if(!zelda.LinkObject.calledNotAttack){
            if(zelda.LinkObject.lookingDown){
                this.Link.scale.setTo(1);
                
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 23;
                else    
                    this.Link.frame = 9;
                
            }else if(zelda.LinkObject.lookingUp){
                this.Link.scale.setTo(1);
                
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 24;
                else
                    this.Link.frame = 10;
                
            }else if(zelda.LinkObject.lookingLeft){
                this.Link.scale.x = -1;
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }else{this.Link.scale.setTo(1);
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }
            
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5,this.makeLinkNotAttack , this);
            zelda.LinkObject.calledNotAttack = true;
            
            this.createSword();

        }
        //Comportamiento si ya se ha hecho el invoke al método que pone attacking en false pero aun no se ha llamado a dicho método
        else{
            if(zelda.LinkObject.lookingDown){
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 23;
                else
                    this.Link.frame = 9;
            }else if(zelda.LinkObject.lookingUp){
                this.Link.scale.setTo(1);
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 24;
                else
                    this.Link.frame = 10;
            }else if(zelda.LinkObject.lookingLeft){
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }else{
                if(zelda.LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }
            this.createSword();
        }
        
        //FUNCIONAMIENTO DEL CAMBIO DE CAMARA
		this.game.physics.arcade.collide(this.LinkCollider,this.cameraTop, function(){
			zelda.game.camera.y -= zelda.game.camera.height - 47;
            zelda.overworld.cameraTop.body.position.y -= zelda.overworld.camera.height-47;
            zelda.overworld.cameraBot.body.position.y -= zelda.overworld.camera.height-47;
            zelda.overworld.cameraLeft.body.position.y -= zelda.overworld.camera.height-47;
            zelda.overworld.cameraRight.body.position.y -= zelda.overworld.camera.height-47;
            zelda.overworld.Link.position.y -= 20;
            zelda.overworld.LinkCollider.body.y-=20;
            zelda.LinkObject.currentZone-=7;
            zelda.gameOptions.lastCameraPosX = zelda.game.camera.x+128;
            zelda.gameOptions.lastCameraPosY = zelda.game.camera.y +112;
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);
		});
		this.game.physics.arcade.collide(this.LinkCollider,this.cameraBot, function(){
            zelda.game.camera.y += zelda.game.camera.height -47;
			zelda.overworld.cameraTop.body.position.y += zelda.overworld.camera.height-47;
            zelda.overworld.cameraBot.body.position.y += zelda.overworld.camera.height-47;
            zelda.overworld.cameraLeft.body.position.y += zelda.overworld.camera.height-47;
            zelda.overworld.cameraRight.body.position.y += zelda.overworld.camera.height-47;
            zelda.overworld.Link.position.y += 20;
            zelda.overworld.LinkCollider.body.y+=20;
            zelda.LinkObject.currentZone+=7;
            zelda.gameOptions.lastCameraPosX = zelda.game.camera.x+128;
            zelda.gameOptions.lastCameraPosY = zelda.game.camera.y +112;
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);

        });
        this.game.physics.arcade.collide(this.LinkCollider,this.cameraRight,function(){
            zelda.game.camera.x += zelda.game.camera.width;
			zelda.overworld.cameraTop.body.position.x += zelda.overworld.camera.width;
            zelda.overworld.cameraBot.body.position.x += zelda.overworld.camera.width;
            zelda.overworld.cameraRight.body.position.x += zelda.overworld.camera.width;
            zelda.overworld.cameraLeft.body.position.x += zelda.overworld.camera.width;
            zelda.overworld.Link.position.x += 20;
            zelda.overworld.LinkCollider.body.x+=20;
            zelda.LinkObject.currentZone++;
            zelda.gameOptions.lastCameraPosX = zelda.game.camera.x+128;
            zelda.gameOptions.lastCameraPosY = zelda.game.camera.y +112;
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);
        });
        this.game.physics.arcade.collide(this.LinkCollider,this.cameraLeft,function(){
            zelda.game.camera.x -= zelda.game.camera.width;
			zelda.overworld.cameraTop.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.cameraBot.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.cameraRight.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.cameraLeft.body.position.x -= zelda.overworld.camera.width;
            zelda.overworld.Link.position.x -= 20;
            zelda.overworld.LinkCollider.body.x-=20;
            zelda.LinkObject.currentZone--;
            zelda.gameOptions.lastCameraPosX = zelda.game.camera.x+128;
            zelda.gameOptions.lastCameraPosY = zelda.game.camera.y +112;
            console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            console.log(zelda.gameOptions.lastCameraPosX);
            console.log(zelda.gameOptions.lastCameraPosY);

        });
        
        this.game.physics.arcade.overlap(this.projectile,this.cameraBot,function(){
        zelda.overworld.projectile.Alive = false;
        zelda.overworld.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.projectile,this.cameraLeft,function(){
        zelda.overworld.projectile.Alive = false;
        zelda.overworld.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.projectile,this.cameraTop,function(){
        zelda.overworld.projectile.Alive = false;
        zelda.overworld.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.projectile,this.cameraRight,function(){
        zelda.overworld.projectile.Alive = false;
        zelda.overworld.projectile.kill();    
        });

        //TRIGGERS PARA CAMBIOS DE PANTALLA
        this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_espada, function(){
            zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x    ;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("sword_room");
        });
        
        this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_D, function(){
            zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_D");
        });
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_M, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_M");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_I, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_L, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x - 16;
            zelda.game.state.start("secret_room_L");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_E, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_E");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_D_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_D");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_M_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_M");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_I_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_A, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_H, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_H");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_G, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_G");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_K, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_K");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_I_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_I");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_A_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 8;
            zelda.LinkObject.lastPositionY = zelda.overworld.Link.position.y+16;
            zelda.game.state.start("secret_room_A");
		});
		
		this.game.physics.arcade.overlap(this.LinkCollider, this.trigger_K_2, function(){
			zelda.LinkObject.lastPositionX = zelda.overworld.Link.position.x + 16;
            zelda.game.state.start("secret_room_K");
		});
		
        
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
        
            this.Link.position = this.LinkCollider.position;

    }, 
    //======================FINAL DEL UPDATE===========================
    /*
    ScrollCameraTop:function(){
        for(var i = 0; i<this.camera.height; i += this.camera.height/100){
            this.camera.position. -= this.camera.height/100;
        }
        //.Link.body.position.y -= 20;
    },
    */
    /*
    ScrollInventario(var upOrDown){
        if(upOrDown == "down"){
            while(this.inventario.x < 0){
                this.inventario.x += 0.1;
            }
        }
    },
    */
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
    
    //Método para animar el andar hacia arriba
    switchLinkScale:function(){
        if(this.Link.scale.x==-1)
      this.Link.scale.x = 1;  
        else{
            this.Link.scale.x = -1;
        }        
        zelda.LinkObject.switched = false;
    },
    
    //Método para hacer que attacking sea false, a este se le hace invoke y sirve tambien para poner los frames de movimiento después de que pare de atacar utilizando loos booleanos looking
    makeLinkNotAttack:function(){
        
        zelda.LinkObject.attacking = false;
        zelda.LinkObject.calledNotAttack = false;
        
        this.sword.kill();
        this.sword.Alive = false;
        
        if(zelda.LinkObject.lookingDown){
            this.Link.scale.setTo(1);
            this.Link.frame = 0;
        }else  if(zelda.LinkObject.lookingUp){
            this.Link.scale.setTo(1);
            this.Link.frame = 2;
        }else if(zelda.LinkObject.lookingLeft){
            this.Link.scale.x=-1;
            this.Link.frame = 4;
        }else{
            this.Link.scale.setTo(1);
            this.Link.frame = 4;
        }
    },
    
    NotHurt:function(){
        
        zelda.LinkObject.calledNotHurt = false;
        zelda.LinkObject.hurt = false;
        
    },	
    
	createProjectile:function(sth){        
        if(!this.projectile.Alive){
        this.projectile.reset(this.Link.position.x, this.Link.position.y);
            this.projectile.Alive = true;
            
            if(sth==0){
            this.projectile.body.velocity.y = 200;
            this.projectile.frame = 1;
            this.projectile.scale.y = 1;
            this.projectile.scale.x = 1;
            }
            else if (sth==1){
            this.projectile.body.velocity.y = -200;
            this.projectile.frame = 1;
            this.projectile.scale.y=-1;
            this.projectile.scale.x = 1;

            }
            else if (sth==2){
            this.projectile.body.velocity.x = -200;
            this.projectile.frame = 0;
            this.projectile.scale.x = 1 ;
            this.projectile.scale.y = 1 ;  
            }
            else{
            this.projectile.body.velocity.x = 200;
            this.projectile.frame = 0;
            this.projectile.scale.x=-1;
            this.projectile.scale.y = 1;  
            }

        }
        
	},
    
    createSword:function(){
        if(!this.sword.isAlive){
            if(this.Link.frame ==9||this.Link.frame==23){

                this.sword.frame = 1;
                this.sword.Alive = true;
                this.sword.scale.y = 1;
                this.sword.scale.x = 1;
                this.sword.reset(this.Link.position.x,this.Link.position.y+16);
            }
            // up
            else if(this.Link.frame == 10 || this.Link.frame==24){


                this.sword.frame = 1;
                this.sword.Alive = true;
                this.sword.scale.y= -1;
                this.sword.scale.x = 1;
                this.sword.reset(this.Link.position.x,this.Link.position.y-16);

            }

            else if(this.Link.frame == 11||this.Link.frame==25){
                if(zelda.LinkObject.lookingLeft){                    

                this.sword.frame = 0;
                this.sword.Alive = true;
                this.sword.scale.x = 1 ;
                this.sword.scale.y = 1 ;  
                this.sword.reset(this.Link.position.x-16,this.Link.position.y);
                    
            }
                else{
                this.sword.frame = 0;
                this.sword.Alive = true;
                this.sword.scale.x= -1;
                this.sword.scale.y = 1;  
                this.sword.reset(this.Link.position.x+16,this.Link.position.y);

                }
            }
        
        
        }
    },        

}
