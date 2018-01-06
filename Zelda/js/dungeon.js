var zelda = zelda || {}
    
zelda.dungeon = {
	init:function(){
		this.game.world.setBounds(0,-47,6*16*16,66*16+16*3);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
	},
    preload:function(){
        this.load.tilemap("dungeonMap", "json/Dungeon1_Devildra.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("DungeonGround", "img/Dungeon/DungeonGround.png");
        this.load.image("walls_dungeon", "img/tilesets/walls_dungeon.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
		this.load.image("LinkCollider", "img/link/LinkCollider.png");
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
        this.load.spritesheet("llave", "img/llave.png",16,16);
		this.load.spritesheet("puerta_normal","img/puerta_normal.png",32,32);
		this.load.spritesheet("puerta_llave","img/puerta_llave.png",32,32);
        this.load.spritesheet("Particles","img/ProjectileParticles.png",16,16);
		this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_oldwoman.png",16, 16);
        this.load.image("bomba", "img/bomba.png");
        this.load.spritesheet("explosion","img/bombaSpriteSheet.png",16,16);
        this.load.image("area","img/Explosion.png");
        this.load.image("vela", "img/vela.png");
        this.load.image("potion", "img/pocion_vida.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("HalfHeart","img/mediocorazon.png");
        this.load.image("emptyHeart","img/emptycorazon.png");
        this.load.image("cursor","img/inventario/selector.png");
        this.load.image("inventario", "img/inventario.png");
        this.load.image("corazon", "img/corazon.png");
        this.load.image("GroundTile","img/GroundSprite.png");
        this.load.image("camaraHorizontal", "img/camara_horizontal_trans.png");
        this.load.image("camaraVertical", "img/camara_vertical_trans.png");
        this.load.image("Triforce","img/Triforce_Piece.png");
		this.load.image("movable_obstacle", "img/roca_dungeon.png");
		this.load.image("trigger","img/trigger_salas.png");
        this.load.audio("TriforceSound","sounds/Music/Triforce_Theme.mp3");
        this.load.image("Black","img/Blackout.png");
        this.load.audio("DungeonMusic","sounds/Music/DungeonTheme.mp3");
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
        this.load.spritesheet("AquamentusProjectile","img/ProyectilAquamentus.png",16,16);
        this.t = this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
        //mapa
        this.load.image("minimap","img/Dungeon/Minimapa.png");
        this.load.image("pointMap","img/pointMap.png");
        this.load.image("pointBoss","img/pointBoss.png");
    },

    create:function(){
        zelda.LinkObject.DiedIn="dungeon";
        this.pointBossAlive=false;
        this.music =  this.game.add.audio("DungeonMusic");
        this.music.loop = true;
        this.music.play();
        this.music.volume = 0.2;
        console.log(this.music);    
        
        this.map = this.game.add.tilemap("dungeonMap");
        this.map.addTilesetImage("DungeonGround");
        this.map.addTilesetImage("walls_dungeon");
        ///Ya se crean las dos capas, Obstacles y ground
        
        this.map.createLayer("Background");
        this.map.createLayer("Ground");
        this.obstacles = this.map.createLayer("Obstacles");
        
		this.map.setCollisionBetween(0,200,true,"Obstacles");

        
        this.loadHearts();
        this.loadKeys();
        this.loadRupies();
        //this.loadBombs();
        this.loadDeathParticles();

        this.loadEnemies();

		this.map.createLayer("Hide");
		
		//Este es la roca que puedes mover para desbloquear secretos.
        this.obstacle1 = this.game.add.sprite(1*16*16+7*16, 2*11*16+5*16,"movable_obstacle");
		this.game.physics.arcade.enable(this.obstacle1);
		this.obstacle1.body.immovable = true;
		
		this.obstacle2 = this.game.add.sprite(1*16*16+6*16, 0*11*16+5*16,"movable_obstacle");
		this.game.physics.arcade.enable(this.obstacle2);
		this.obstacle2.body.immovable = true;
		
		//trigger para la entrada de la sala secreta
		this.trigger = this.game.add.sprite(1*16*16+8*16+5, 0*11*16+5*16+5,"trigger");
		this.game.physics.arcade.enable(this.trigger);
		
		//pintado de las puertas de la dungeon.
        this.linkInstance = new zelda.LinkPrefab(this.game,2*16*16 + 8*16 ,5*11*16 + 7*16,this);
        
		this.drawDoors();

        //Camara
        this.camera.focusOnXY(this.linkInstance.LinkCollider.x, this.linkInstance.LinkCollider.y);
		this.SetCamera();

		//Prefab del inventario
		this.inventario = new zelda.InventarioPrefab(this.game,0,0,this);   
        
        this.triforce = new zelda.TriforcePrefab(this.game,5*16*16 + 8*16 ,16*16-8,this);
        this.game.add.existing(this.triforce);
        
        //guardar en que escena esta por si muere
        
        
        //iniciar punto en mapa
        this.pointCurrentX=0;
        this.pointCurrentY=0;
        this.point= zelda.game.add.sprite(zelda.game.camera.x+36+12*this.pointCurrentX,zelda.game.camera.y+38+8*this.pointCurrentY, "pointMap");
        this.pointBoss= zelda.game.add.sprite(0,0, "pointBoss");
        if(zelda.LinkObject.hasCompass == true){
            zelda.dungeon.pointBoss= zelda.game.add.sprite(0,0, "pointBoss");
            zelda.dungeon.pointBoss.position.x=zelda.game.camera.x+36+10.7*2;
            zelda.dungeon.pointBoss.position.y=zelda.game.camera.y+38+8.5*-3;
            zelda.dungeon.pointBossAlive=true;                     
        }
        //zelda.game.camera.x+36+10.7*2,zelda.game.camera.y+38+8.5*-3
        this.muteButton = this.game.input.keyboard.addKey(Phaser.Keyboard.M); 
        this.playMusic = true;
        
        if(!zelda.LinkObject.hasCompass){
            this.compass = new zelda.CompassPrefab(this.game,968,616,this);
            this.game.add.existing(this.compass);
        }
        
        if(!zelda.LinkObject.hasMap){
            this.map = new zelda.MapPrefab(this.game,712,440,this);
            this.game.add.existing(this.map);
        }
        
        if(!zelda.dungeonEvents.events[3]){
            this.key = new zelda.KeyPrefab(this.game,1192, 485,this);
            this.game.add.existing(this.key);
            this.keys.add(this.key);
        }

        //SALA SECRETA DONDE SE CONSIGUE LA ESPADA BLANCA
		this.fire1 = this.game.add.sprite(5*16,2*11*16+4*16,"fuego",0);
		this.game.physics.arcade.enable(this.fire1);
		this.fire1.body.immovable = true;
		this.fire1.animations.add("idle",[3,4],true);
		this.fire1.animations.play("idle");
		
		this.fire2 = this.game.add.sprite(11*16, 2*11*16+4*16,"fuego",0);
		this.game.physics.arcade.enable(this.fire2);
		this.fire2.body.immovable = true;
		this.fire2.animations.add("idle",[3,4],true);
		this.fire2.animations.play("idle");
		//si tienes el trozo de mapa se activa el poder conseguir la espada blanca en la sala secreta.
		if(zelda.Inventory.trozoMapa){
			
		}
        
        
    },
    
    update:function(){		
        //console.log(this.checkAliveEnemies());
        if(zelda.gameOptions.cameraArrivedPos){
            if(!zelda.dungeonEvents.events[0]){
                if(zelda.LinkObject.currentDungeonZone==8){
                    //console.log(this.checkAliveEnemies());
                    if(this.checkAliveEnemies()==0){
                        zelda.dungeonEvents.events[0] = true;
                        this.key = new zelda.KeyPrefab(this.game,648,54,this);
                        this.game.add.existing(this.key);
                        this.keys.add(this.key);
                    }
                }
            }
            if(!zelda.dungeonEvents.events[1]){
                if(zelda.LinkObject.currentDungeonZone==14){
                    if(!zelda.dungeonEnemySpawns.zones[14][2]){
                        //console.log("spawnAKey");
                        zelda.dungeonEvents.events[1] = true;
                        this.key = new zelda.KeyPrefab(this.game,696,292,this);
                        this.game.add.existing(this.key);
                        this.keys.add(this.key);
                    }
                }
            }
            if(!zelda.dungeonEvents.events[2]){
                if(zelda.LinkObject.currentDungeonZone==21){
                    //console.log(this.checkAliveEnemies());
                    if(this.checkAliveEnemies()==0){
                        zelda.dungeonEvents.events[2] = true;
                        this.boom = new zelda.boomerangToPickUp(this.game,903,406,this);
                        this.game.add.existing(this.boom);
                    }   
                }
            }
                        
            
            if(!zelda.dungeonEvents.events[4]){
                if(zelda.LinkObject.currentDungeonZone==26){
                    //console.log(this.checkAliveEnemies());
                    if(this.checkAliveEnemies()==0){
                        zelda.dungeonEvents.events[4] = true;
                        this.key = new zelda.KeyPrefab(this.game,648,584,this);
                        this.game.add.existing(this.key);
                        this.keys.add(this.key);
                    }   
                }
            }
            
            if(!zelda.dungeonEvents.events[5]){
                if(zelda.LinkObject.currentDungeonZone==37){
                    //console.log(this.checkAliveEnemies());
                    if(this.checkAliveEnemies()==0){
                        zelda.dungeonEvents.events[5] = true;
                        this.key = new zelda.KeyPrefab(this.game,425,1014,this);
                        this.game.add.existing(this.key);
                        this.keys.add(this.key);
                    }   
                }
            }
            
                        
            if(!zelda.dungeonEvents.events[6]){
                if(zelda.LinkObject.currentDungeonZone==39){
                    //console.log(this.checkAliveEnemies());
                    if(this.checkAliveEnemies()==0){
                        zelda.dungeonEvents.events[6] = true;
                        this.key = new zelda.KeyPrefab(this.game,985,999,this);
                        this.game.add.existing(this.key);
                        this.keys.add(this.key);                        
                    }   
                }
			}
        }
        


        
        if(this.muteButton.isDown&&this.muteButton.downDuration(1)){
            this.playMusic= !this.playMusic;
            if(!this.playMusic)
                this.music.stop();
		}
        
        if(!this.music.isPlaying&&this.playMusic){
        	this.music.play();
		}
        
        if(zelda.gameOptions.mustCreateEnemies){
            zelda.gameOptions.mustCreateEnemies = false;
            this.createEnemiesOfCurrentZone();
        }
		
		this.CollisionWithDoors();
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider, this.obstacle1,function(link, obstacle){
			if(obstacle.body.touching.right){
				if(obstacle.x>1*16*16+6*16){
					obstacle.x--;
				}else{
					zelda.dungeon.OpenDoors([15,14]);
				}
			}
		});
		
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider, this.obstacle2,function(link, obstacle){
			if(obstacle.body.touching.up && obstacle.y<0*11*16+6*16){
				obstacle.y++;
			}
		});
			
		//overlap para la entrada de la sala secreta
		this.game.physics.arcade.overlap(this.linkInstance.LinkCollider, this.trigger, function(){
			zelda.game.state.start("secret_room_dungeon");
		})
		

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
        
        this.MoveCamera();
        
        this.SetBorders();
        
        this.LinkBorderColision();
        
        this.ProjectileBorderColision();
        
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.x)){
            zelda.LinkObject.currentHearts -= 0.5;
        }
        
        
        this.ObjBKey=zelda.game.input.keyboard.addKey(Phaser.Keyboard.R);
        if( this.ObjBKey.isDown && this.ObjBKey.downDuration(1) && zelda.Inventory.InvON==false){
            //console.log("o");
            zelda.Inventory.scene="dungeon";
            zelda.Inventory.UseObjectB();
        }
        
  
        //overlaps con la explosion
        if(zelda.Inventory.ExplosionOn){
            
        for(var i=0;i<this.stalfoses.children.length;i++){
            if(this.stalfoses.children[i].Alive){
                    zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.stalfoses.children[i],
                        function(rupy,Enemy){
                        zelda.dungeon.stalfoses.children[i].lives = 0;
                        } );

            }
        }
        
        for(var i=0;i<this.gels.children.length;i++){
            if(this.gels.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.gels.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.gels.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.goriyas.children.length;i++){
            if(this.goriyas.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.goriyas.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.goriyas.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.keeses.children.length;i++){
            if(this.keeses.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.keeses.children[i],
                function(rupy,dungeon){
                        zelda.overworld.keeses.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.wallmasters.children.length;i++){
            if(this.wallmasters.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.wallmasters.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.wallmasters.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.Aquamentuses.children.length;i++){
            if(this.Aquamentuses.children[i].Alive){
                zelda.Inventory.ExplosionInstance.game.physics.arcade.overlap(zelda.Inventory.ExplosionInstance,this.Aquamentuses.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.Aquamentuses.children[i].lives = 0;
                } );
            }
        }
            
                        
                        
                        //PA LAS SALAS SECRETAS HAZ UN GRUPO DE OBJETOS A ROMPER Y YA
                        
    }
            
        
        //overlaps fuego
        
        if(zelda.Inventory.fireOn){
            
        for(var i=0;i<this.stalfoses.children.length;i++){
            if(this.stalfoses.children[i].Alive){
                console.log(zelda.Inventory.plantedFire);
                    this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.stalfoses.children[i],
                        function(rupy,Enemy){
                        zelda.dungeon.stalfoses.children[i].lives = 0;
                        } );

            }
        }
        
        for(var i=0;i<this.gels.children.length;i++){
            if(this.gels.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.gels.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.gels.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.goriyas.children.length;i++){
            if(this.goriyas.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.goriyas.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.goriyas.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.keeses.children.length;i++){
            if(this.keeses.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.keeses.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.keeses.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.wallmasters.children.length;i++){
            if(this.wallmasters.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.wallmasters.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.wallmasters.children[i].lives = 0;
                } );
            }
        }
        
        for(var i=0;i<this.Aquamentuses.children.length;i++){
            if(this.Aquamentuses.children[i].Alive){
                this.game.physics.arcade.overlap(zelda.Inventory.plantedFire.sprite,this.Aquamentuses.children[i],
                function(rupy,Enemy){
                        zelda.dungeon.Aquamentuses.children[i].lives = 0;
                } );
            }
        }
                        //PA LAS SALAS SECRETAS HAZ UN GRUPO DE OBJETOS A ROMPER Y YA
                        
        }
    
    },
	
	ProjectileBorderColision:function(){
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraBot,function(){
        zelda.dungeon.linkInstance.projectile.Alive = false;
        zelda.dungeon.linkInstance.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraLeft,function(){
        zelda.dungeon.linkInstance.projectile.Alive = false;
        zelda.dungeon.linkInstance.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraTop,function(){
        zelda.dungeon.linkInstance.projectile.Alive = false;
        zelda.dungeon.linkInstance.projectile.kill();    
        });
        this.game.physics.arcade.overlap(this.linkInstance.projectile,this.cameraRight,function(){
        zelda.dungeon.linkInstance.projectile.Alive = false;
        zelda.dungeon.linkInstance.projectile.kill();    
        });
        
        this.game.physics.arcade.overlap(this.linkInstance.boomerang,this.cameraBot,function(){
        zelda.dungeon.linkInstance.boomerang.returning = true;
        });
        this.game.physics.arcade.overlap(this.linkInstance.boomerang,this.cameraLeft,function(){
        zelda.dungeon.linkInstance.boomerang.returning = true;
        });
        this.game.physics.arcade.overlap(this.linkInstance.boomerang,this.cameraTop,function(){
        zelda.dungeon.linkInstance.boomerang.returning = true;
        });
        this.game.physics.arcade.overlap(this.linkInstance.boomerang,this.cameraRight,function(){
        zelda.dungeon.linkInstance.boomerang.returning = true;
        });
        
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
			this.allDoors[i].body.immovable = true;
		}
	},
	
	OpenAllDoors:function(){
		for(var i = 0; i<this.allDoors.length; i++){
			this.allDoors[i].frame = 1;
		}	
	},
	
	CloseAllDoors:function(){
		for(var i = 0; i<this.allDoors.length; i++){
			this.allDoors[i].frame = 0;
		}
	},
	
	OpenDoors:function(doors){
		for(var i = 0; i<doors.length; i++){
			this.allDoors[doors[i]].frame = 1;
		}
	},
	
	CloseDoors:function(doors){
		for(var i = 0; i<doors.length; i++){
			this.allDoors[doors[i]].frame = 0;
		}
	},
	
	//Controla la colison con las puertas dependiendo de si están abiertas
	//o cerradas
	CollisionWithDoors:function(){
		for(var i = 0; i<this.allDoors.length; i++){
			if(this.allDoors[i].frame == 0){
				this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.allDoors[i],function(l,d){
					var enemies = false;
					for(var i=0;i<zelda.dungeonEnemySpawns.zones[zelda.LinkObject.currentDungeonZone].length;i++){
						if(zelda.dungeonEnemySpawns.zones[zelda.LinkObject.currentDungeonZone][i]){
							enemies = true;
						}
					}
					if(!enemies){
						if(d.key == "puerta_llave"){
							if(zelda.Inventory.keys < 0){
								zelda.Inventory.keys--;
								d.frame = 1;
							}
						}
					}
				});
			}
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
            heart.calledKill=false;
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
    
    SetCamera:function(){
        this.cameraTop = this.game.add.sprite(this.camera.x, this.camera.y + 47+18, "camaraHorizontal");
        this.cameraTop.anchor.setTo(0,1); 
        this.game.physics.arcade.enable(this.cameraTop);
        //this.cameraTop.fixedToCamera = true;
        this.cameraTop.body.immovable = true;
        
        this.cameraBot = this.game.add.sprite(this.camera.x, this.camera.y+this.camera.height-18, "camaraHorizontal");
        this.game.physics.arcade.enable(this.cameraBot);
        //this.cameraBot.fixedToCamera = true;
        this.cameraBot.body.immovable = true;
        
        this.cameraRight = this.game.add.sprite(this.camera.x+this.camera.width-18, this.camera.y, "camaraVertical");
        this.game.physics.arcade.enable(this.cameraRight);
        //this.cameraRight.fixedToCamera = true;
        this.cameraRight.body.immovable = true;
        
        this.cameraLeft = this.game.add.sprite(this.camera.x+18, this.camera.y, "camaraVertical");
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
                zelda.overworld.pointCurrentY-=1;
            }else if(zelda.gameOptions.borderToSet=="Downwards"){
                zelda.game.camera.y+=2;
                zelda.overworld.pointCurrentY+=1;
            }else if(zelda.gameOptions.borderToSet=="Right"){
                zelda.game.camera.x+=2;
                zelda.overworld.pointCurrentX+=1;
            }else{
                zelda.game.camera.x-=2;
                zelda.overworld.pointCurrentX-=1;
            }
                            this.inventario.movingCamera=true;
                            zelda.dungeon.point.position.x=zelda.game.camera.x+36+(12*zelda.dungeon.pointCurrentX);
                            zelda.dungeon.point.position.y=zelda.game.camera.y+38+(6*zelda.dungeon.pointCurrentY);
                            if(zelda.LinkObject.hasCompass){
                                            zelda.dungeon.pointBoss.position.x=zelda.game.camera.x+36+10.7*2;
                                            zelda.dungeon.pointBoss.position.y=zelda.game.camera.y+38+8.5*-3;
                            }

        }
        //CUANDO LLEGA a la posición destinada se pone en false setBorders para ajustar los bordes de pantalla a la nueva escena
        else{
            if(zelda.gameOptions.cameraArrivedPos==false){
                zelda.gameOptions.cameraArrivedPos=true;
                 zelda.gameOptions.setBorders=false;   
                zelda.dungeon.createEnemiesOfCurrentZone();
                this.inventario.movingCamera=false;

            }
        }
   },

    SetBorders:function(){
                //SE AJUSTAN LOS BORDES cuando setBorders es false y en función de borderToSet, el cual cambia en los métodos de las colisiones con los bordes
        if(!zelda.gameOptions.setBorders){
            if(zelda.gameOptions.borderToSet=="Upwards"){
            zelda.dungeon.cameraTop.body.position.y -= zelda.dungeon.camera.height-47-800;
            zelda.dungeon.cameraBot.body.position.y -= zelda.dungeon.camera.height-47;
            zelda.dungeon.cameraLeft.body.position.y -= zelda.dungeon.camera.height-47;
            zelda.dungeon.cameraRight.body.position.y -= zelda.dungeon.camera.height-47;
            }   else if(zelda.gameOptions.borderToSet=="Downwards"){
            zelda.dungeon.cameraTop.body.position.y += zelda.dungeon.camera.height-47;
            zelda.dungeon.cameraBot.body.position.y += zelda.dungeon.camera.height-47+800;
            zelda.dungeon.cameraLeft.body.position.y += zelda.dungeon.camera.height-47;
            zelda.dungeon.cameraRight.body.position.y += zelda.dungeon.camera.height-47;
            
            }else if(zelda.gameOptions.borderToSet=="Right"){
            zelda.dungeon.cameraTop.body.position.x += zelda.dungeon.camera.width;
            zelda.dungeon.cameraBot.body.position.x += zelda.dungeon.camera.width;
            zelda.dungeon.cameraRight.body.position.x += zelda.dungeon.camera.width+800;
            zelda.dungeon.cameraLeft.body.position.x += zelda.dungeon.camera.width;
            }else{
            zelda.dungeon.cameraTop.body.position.x -= zelda.dungeon.camera.width;
            zelda.dungeon.cameraBot.body.position.x -= zelda.dungeon.camera.width;
            zelda.dungeon.cameraRight.body.position.x -= zelda.dungeon.camera.width;
            zelda.dungeon.cameraLeft.body.position.x -= zelda.dungeon.camera.width-800;
            }
            zelda.gameOptions.setBorders=true;   
        }
    },
    
    LinkBorderColision:function(){
        //FUNCIONAMIENTO DEL CAMBIO DE CAMARA A NIVEL SET DE INFORMACIÓN, SE ESTABLECE QUE cameraArrived es false y se modifica a donde debe ir la cámara en función de con que borde ha chocado
		
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraTop, function(){
            if(zelda.LinkObject.lookingUp){
                zelda.dungeon.despawnEnemiesOfPreviousZone();

                zelda.gameOptions.cameraArrivedPos = false;
                zelda.gameOptions.cameraPosToGoX = zelda.dungeon.camera.x;
                zelda.gameOptions.cameraPosToGoY = zelda.dungeon.camera.y;
                zelda.gameOptions.cameraPosToGoY-=zelda.dungeon.camera.height-47;

                zelda.gameOptions.borderToSet = "Upwards";

                zelda.dungeon.linkInstance.position.y -= 20;

                zelda.dungeon.linkInstance.LinkCollider.body.y-=20;

                zelda.LinkObject.currentDungeonZone-=6;

                zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
                zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;

                zelda.dungeon.cameraTop.body.position.y-=800;

                //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
                ///console.log(zelda.gameOptions.lastCameraPosX);
                //console.log(zelda.gameOptions.lastCameraPosY);
                   // console.log("Camera trying to go to" + zelda.gameOptions.cameraPosToGoY);
                //zelda.overworld.createEnemiesOfCurrentZone();
                zelda.dungeon.pointCurrentY-=1;
              
            }
		});
		this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraBot, function(){
            if(zelda.LinkObject.lookingDown&&zelda.LinkObject.currentDungeonZone!=38){
                zelda.dungeon.despawnEnemiesOfPreviousZone();
                zelda.gameOptions.borderToSet = "Downwards";
                zelda.gameOptions.cameraArrivedPos = false;
                zelda.gameOptions.cameraPosToGoX = zelda.dungeon.camera.x;
                zelda.gameOptions.cameraPosToGoY = zelda.dungeon.camera.y;
                zelda.gameOptions.cameraPosToGoY+=zelda.dungeon.camera.height-47;


                //OFFSET
                zelda.dungeon.cameraBot.body.position.y -=800;

                zelda.dungeon.linkInstance.position.y += 21;
                zelda.dungeon.linkInstance.LinkCollider.body.y+=21;
                zelda.LinkObject.currentDungeonZone+=6;
                zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
                zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;
                //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
                //console.log(zelda.gameOptions.lastCameraPosX);
                //console.log(zelda.gameOptions.lastCameraPosY);

                //console.log("Camera trying to go to" + zelda.gameOptions.cameraPosToGoY);
                        //zelda.overworld.createEnemiesOfCurrentZone();
                 zelda.dungeon.pointCurrentY+=1;
            }
        });
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraRight,function(){
            if(zelda.LinkObject.lookingRight){
                zelda.dungeon.despawnEnemiesOfPreviousZone();
                zelda.gameOptions.borderToSet = "Right";
                zelda.gameOptions.cameraArrivedPos = false;
                zelda.gameOptions.cameraPosToGoX = zelda.dungeon.camera.x;
                zelda.gameOptions.cameraPosToGoY = zelda.dungeon.camera.y;
                zelda.gameOptions.cameraPosToGoX+=zelda.dungeon.camera.width;

                //OFFSET
                zelda.dungeon.cameraRight.body.position.x -=800;
                zelda.dungeon.linkInstance.position.x += 19;
                zelda.dungeon.linkInstance.LinkCollider.body.x+=19;
                zelda.LinkObject.currentDungeonZone++;
                zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
                zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;
                //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
                //console.log(zelda.gameOptions.lastCameraPosX);
                //console.log(zelda.gameOptions.lastCameraPosY);
                        //zelda.overworld.createEnemiesOfCurrentZone();
                
                 //iniciar punto en mapa
                zelda.dungeon.pointCurrentX+=1;
            }
        });
        this.game.physics.arcade.collide(this.linkInstance.LinkCollider,this.cameraLeft,function(){
            if(zelda.LinkObject.lookingLeft){
            zelda.dungeon.despawnEnemiesOfPreviousZone();
            zelda.gameOptions.borderToSet = "Left";
            zelda.gameOptions.cameraArrivedPos = false;
            zelda.gameOptions.cameraPosToGoX = zelda.dungeon.camera.x;
            zelda.gameOptions.cameraPosToGoY = zelda.dungeon.camera.y;
            zelda.gameOptions.cameraPosToGoX-=zelda.dungeon.camera.width;
            
            //OFFSET
            zelda.dungeon.cameraLeft.body.position.x -=800;
            
            zelda.dungeon.linkInstance.position.x -= 19;
            zelda.dungeon.linkInstance.LinkCollider.body.x-=19;
            zelda.LinkObject.currentDungeonZone--;
            zelda.gameOptions.lastCameraPosX = zelda.gameOptions.cameraPosToGoX+128;
            zelda.gameOptions.lastCameraPosY = zelda.gameOptions.cameraPosToGoY +112;
            //console.log(zelda.enemySpawns.zones[zelda.LinkObject.currentZone]);
            //console.log(zelda.gameOptions.lastCameraPosX);
            //console.log(zelda.gameOptions.lastCameraPosY);
            //zelda.overworld.createEnemiesOfCurrentZone();
                
            //iniciar punto en mapa
           zelda.dungeon.pointCurrentX-=1;
            }
        });
        
    },
    createEnemiesOfCurrentZone:function(){
            zelda.dungeon.enabledSpawns = true;
        if(zelda.dungeon.enabledSpawns){
        var j = 0;
            for(var i = 0;i<zelda.dungeonEnemySpawns.zones[zelda.LinkObject.currentDungeonZone].length;++i){
                if(zelda.dungeonEnemySpawns.zones[zelda.LinkObject.currentDungeonZone][i]==true){
                    zelda.dungeon.createEnemy(zelda.dungeonEnemySpawns.especieEnemigos[zelda.LinkObject.currentDungeonZone][i],this.game,zelda.dungeonEnemySpawns.posicionesEnemigos[zelda.LinkObject.currentDungeonZone][j],zelda.dungeonEnemySpawns.posicionesEnemigos[zelda.LinkObject.currentDungeonZone][j+1],zelda.dungeon,zelda.dungeonEnemySpawns.tipoEnemigos[zelda.LinkObject.currentDungeonZone][i],zelda.dungeonEnemySpawns.initialSpeedEnemigos[zelda.LinkObject.currentDungeonZone][i],zelda.LinkObject.currentDungeonZone,i);
                   // console.log("Spawning a " + zelda.dungeonEnemySpawns.especieEnemigos[zelda.LinkObject.currentDungeonZone][i]);
                //    console.log("at " + zelda.dungeonEnemySpawns.posicionesEnemigos[zelda.LinkObject.currentDungeonZone][j] + ", " +zelda.dungeonEnemySpawns.posicionesEnemigos[zelda.LinkObject.currentDungeonZone][j+1]);
                }
                            j+=2;
        }
        }
    },
    
    checkAliveEnemies:function(){
        var counter = 0;
        for(var i=0;i<this.stalfoses.children.length;i++){
            if(this.stalfoses.children[i].Alive){
                counter++;
            }
        }
        
        for(var i=0;i<this.goriyas.children.length;i++){
            if(this.goriyas.children[i].Alive){
                counter++;

            }
        }
        
        for(var i=0;i<this.gels.children.length;i++){
            if(this.gels.children[i].Alive){
                counter++;

            }
        }
        
        for(var i=0;i<this.keeses.children.length;i++){
            if(this.keeses.children[i].Alive){
                counter++;

            }
        }
        
        for(var i=0;i<this.wallmasters.children.length;i++){
            if(this.wallmasters.children[i].Alive){
                counter++;

            }
        }
        
        for(var i=0;i<this.spikeTraps.children.length;i++){
            if(this.spikeTraps.children[i].Alive){
                counter++;

            }
        }
        
        for(var i=0;i<this.Aquamentuses.children.length;i++){
            if(this.Aquamentuses.children[i].Alive){
                counter++;

            }

        }
        return counter;
    },
    
    despawnEnemiesOfPreviousZone:function(){
        for(var i=0;i<this.stalfoses.children.length;i++){
            if(this.stalfoses.children[i].Alive){
                this.stalfoses.children[i].Alive = false;
                this.stalfoses.children[i].kill();
            }
        }
        
        for(var i=0;i<this.goriyas.children.length;i++){
            if(this.goriyas.children[i].Alive){
                this.goriyas.children[i].Alive = false;
                this.goriyas.children[i].kill();
                this.goriyas.children[i].projectile.Alive = false;
                this.goriyas.children[i].projectile.kill()
            }
        }
        
        for(var i=0;i<this.gels.children.length;i++){
            if(this.gels.children[i].Alive){
                this.gels.children[i].Alive = false;
                this.gels.children[i].kill();
                //this.moblins.children[i].projectile.Alive = false;
                //this.moblins.children[i].projectile.kill()
            }
        }
        
        for(var i=0;i<this.keeses.children.length;i++){
            if(this.keeses.children[i].Alive){
                this.keeses.children[i].Alive = false;
                this.keeses.children[i].kill();
            }
        }
        
        for(var i=0;i<this.wallmasters.children.length;i++){
            if(this.wallmasters.children[i].Alive){
                this.wallmasters.children[i].Alive = false;
                this.wallmasters.children[i].kill();
            }
        }
        
        for(var i=0;i<this.spikeTraps.children.length;i++){
            if(this.spikeTraps.children[i].Alive){
                this.spikeTraps.children[i].Alive = false;
                this.spikeTraps.children[i].kill();
            }
        }
        
        for(var i=0;i<this.Aquamentuses.children.length;i++){
            if(this.Aquamentuses.children[i].Alive){
                this.Aquamentuses.children[i].Alive = false;
                this.Aquamentuses.children[i].kill();
                this.Aquamentuses.children[i].projectile.Alive = false;
                this.Aquamentuses.children[i].projectile.kill()
                this.Aquamentuses.children[i].projectile1.Alive = false;
                this.Aquamentuses.children[i].projectile1.kill()                
                this.Aquamentuses.children[i].projectile2.Alive = false;
                this.Aquamentuses.children[i].projectile2.kill()
            }
        }
        
        
    },
    
    loadDeathParticles:function(){
        this.deathParticles = this.add.group();
        this.deathParticles.enableBody = true;
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
    
    loadEnemies:function(){
        this.stalfoses = this.add.group();
        this.stalfoses.enableBody = true;

        this.goriyas = this.add.group();
        this.goriyas.enableBody = true;

        this.gels = this.add.group();
        this.gels.enableBody = true;

        this.keeses = this.add.group();
        this.keeses.enableBody = true;

        this.wallmasters = this.add.group();
        this.wallmasters.enableBody = true;

        this.Aquamentuses = this.add.group();
        this.Aquamentuses.enableBody = true;
        
        this.spikeTraps = this.add.group();
        this.spikeTraps.enableBody = true;
        },
    
    createEnemy:function(enemy, Agame, posX, posY, level, type, movingTowards, currentDungeonZone, posInArray){
        console.log(enemy);
            if(enemy== "Stalfos"){
                var stalfos = this.stalfoses.getFirstExists(false);
                if(!stalfos){
                    stalfos = new zelda.StalfosPrefab(this.game,posX,posY,type,level,movingTowards,currentDungeonZone,posInArray);
                    this.stalfoses.add(stalfos);
                }else{
                    stalfos.type = type;
                    stalfos.reset(posX,posY);
                    stalfos.currentDungeonZone = currentDungeonZone;
                    stalfos.posInArray = posInArray;
                    zelda.StalfosPrefab.Respawn(stalfos);
                    stalfos.initialSpeed = movingTowards;
                }
                console.log(stalfos.currentDungeonZone);
            }
            
            if(enemy== "Goriya"){
                var goriya = this.goriyas.getFirstExists(false);
                if(!goriya){
                    goriya = new zelda.GoriyaPrefab(this.game,posX,posY,type,level,movingTowards,currentDungeonZone,posInArray);
                    this.goriyas.add(goriya);
                }else{
                    goriya.reset(posX,posY);
                    goriya.initialSpeed = movingTowards;
                    goriya.type = type;
                    goriya.Alive = true;
                    goriya.spawned = false;
                    goriya.calledSpawn = false;
                    goriya.firstFewFrames = false;
                    goriya.lives = 3;
                    goriya.currentDungeonZone = currentDungeonZone;
                    goriya.posInArray = posInArray;


                }
            }
            
            if(enemy== "Gel"){
                var gel = this.gels.getFirstExists(false);
                if(!gel){
                    //En este caso movinTowards tiene que ser el offsetMaximo, 30 es un buen numero
                    gel = new zelda.GelPrefab(this.game,posX,posY,type,level,movingTowards,currentDungeonZone,posInArray);
                    this.gels.add(gel);
                }else{
                    gel.currentDungeonZone = currentDungeonZone;
                    gel.reset(posX,posY);
                    gel.hurt = false;
                    gel.calledNotHurt = true;
                    gel.Alive = true;
                    gel.type = type;
                    gel.jumping = false;
                    gel.calledStopJumping = false;
                    gel.lives = 3;
                    gel.spawned  = false;
                    gel.calledSpawn = false;
                    gel.posInArray = posInArray;

                }
            }
            
            if(enemy == "Keese"){

                var keese = this.keeses.getFirstExists(false);
                if(!keese){
                    keese = new zelda.KeesePrefab(this.game,posX,posY,type,level,0,currentDungeonZone,posInArray);
                    this.keeses.add(keese);
                    console.log(keese);
                }else{
                    keese.currentDungeonZone = currentDungeonZone;
                    keese.reset(posX,posY);
                    keese.type = type;
                    keese.posInArray = posInArray;

                    zelda.KeesePrefab.Respawn(keese);
                    
                }
            }
            
            if(enemy== "WallMaster"){
                var wallmaster = this.wallmasters.getFirstExists(false);
                if(!wallmaster){
                    wallmaster = new zelda.WallMasterPrefab(this.game,posX,posY,type,level,movingTowards,currentDungeonZone,posInArray);
                    this.wallmasters.add(wallmaster);                }
                else{
                    wallmaster.reset(posX,posY);
                    wallmaster.Alive = true;
                    wallmaster.currentDungeonZone = currentDungeonZone;
                    wallmaster.posInArray = posInArray;
                    wallmaster.initialSpeed = movingTowards;  
                    wallmaster.isFree = false;
                    wallmaster.body.velocity.setTo(0);
                    wallmaster.lives = 3;
                }
                
                
                console.log(wallmaster.body.position);
            }
            
            if(enemy== "Aquamentus"){
                var aquamentus = this.Aquamentuses.getFirstExists(false);
                if(!aquamentus){
                    aquamentus = new zelda.AquamentusPrefab(this.game,posX,posY,type,level,movingTowards,currentDungeonZone,posInArray);
                    this.Aquamentuses.add(aquamentus);
                }
                else{
                    aquamentus.currentDungeonZone = currentDungeonZone;
                    aquamentus.type = type;
                    aquamentus.reset(posX,posY);
                    zelda.AquamentusPrefab.Respawn(aquamentus);
                    aquamentus.posInArray = posInArray;
                    aquamentus.initialSpeed = movingTowards;
                }
            }
        
                    
            if(enemy== "SpikeTrap"){
                var spikeTrap = this.spikeTraps.getFirstExists(false);
                if(!spikeTrap){
                    spikeTrap = new zelda.SpikesTrapPrefab(this.game,posX,posY,type,level,movingTowards,currentDungeonZone,posInArray);
                    this.spikeTraps.add(spikeTrap);
                }
                else{
                    spikeTrap.currentDungeonZone = currentDungeonZone;
                    spikeTrap.type = type;
                    spikeTrap.reset(posX,posY);
                    zelda.SpikesTrapPrefab.Respawn(spikeTrap);
                    spikeTrap.posInArray = posInArray;
                    spikeTrap.initialSpeed = movingTowards;
                }
            }
            
    }
    
}
