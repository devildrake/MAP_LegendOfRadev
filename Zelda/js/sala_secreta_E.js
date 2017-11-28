var zelda = zelda || {}

zelda.sala_secreta_E = {
	roomDone:false,
	
	init:function(){
		this.game.world.setBounds(0,-47,zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
	},
	
	preload:function(){
		this.game.stage.backgroundColor = "#black";
        //----------Elementos del layaut base------------
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        this.load.spritesheet("fuego", "img/spawn_fuego.png",16,16);
        this.load.spritesheet("npc", "img/spawn_oldwoman.png",16, 16);
        //-------------------------------------------
		
		this.load.spritesheet("vida","img/pocion_vida.png",16,16);
		this.load.spritesheet("mana", "img/pocion_azul.png",16,16);
		this.load.spritesheet("papel", "img/objeto_azul.png",16,16);
		this.load.spritesheet("inventario", "img/inventario.png");
		this.load.image("collider", "img/camara_horizontal.png");
		this.load.image("collider_inv", "img/collider_invisible.png");
		   //-----------Inventario
		
        this.load.image("bomba", "img/bomba.png");
        this.load.image("vela", "img/vela.png");
        //this.load.image("potion", "img/pocion_vida.png");
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
		
		this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},
	
	create:function(){
		//--------Pintado del layout base------------
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
        
        this.InvButton = this.game.input.keyboard.addKey(Phaser.Keyboard.I); 
        this.ObjbButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F); 
		
		if(!this.roomDone){
			//npc
			this.npc = this.game.add.sprite(zelda.secretLayout.npcX, zelda.secretLayout.npcY, "npc");
			this.npc.anchor.setTo(.5,0);
			this.npc.animations.add("spawn", [0,1,2,3], 6, false);
			this.npc.animations.add("despawn",[3,4], 6, true);
			this.npc.animations.play("spawn");
			this.game.physics.arcade.enable(this.npc);
			this.npc.body.immovable = true;
			this.npc.animations.currentAnim.onComplete.add(function(){
				//items
				zelda.sala_secreta_E.mana = zelda.sala_secreta_E.game.add.sprite(zelda.secretLayout.item2_1X,zelda.secretLayout.itemY,"mana");
				zelda.sala_secreta_E.game.physics.arcade.enable(zelda.sala_secreta_E.mana);
				zelda.sala_secreta_E.mana.animations.add("despawn",[0,1],6,true);
				zelda.sala_secreta_E.vida = zelda.sala_secreta_E.game.add.sprite(zelda.secretLayout.item2_2X,zelda.secretLayout.itemY,"vida");
				zelda.sala_secreta_E.game.physics.arcade.enable(zelda.sala_secreta_E.vida);
				zelda.sala_secreta_E.vida.animations.add("despawn",[0,1],6,true);

				zelda.sala_secreta_E.papel = zelda.game.add.sprite(zelda.secretLayout.npcX+16, zelda.secretLayout.npcY, "papel");
				zelda.sala_secreta_E.papel.anchor.setTo(.5,0);
				zelda.sala_secreta_E.game.physics.arcade.enable(zelda.sala_secreta_E.papel);
				zelda.sala_secreta_E.papel.animations.add("despawn",[0,1],6,true);
			});
		}
		
		//-------------------------------------------
		
		this.game.camera.y -= 47;
		
		this.link = new zelda.LinkPrefab(this.game,zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight-60,this);
		
		this.inventario = this.game.add.sprite(0,-zelda.gameOptions.gameHeight+47, "inventario");
        this.inventario.fixedToCamera = true;
		
		this.game.input.onDown.add(zelda.gameOptions.Unpause);
		
		//TRIGGER PARA SALIR DE LA SALA AL OVERWORLD
		this.trigger = this.game.add.sprite(0,180,"collider");
		this.game.physics.arcade.enable(this.trigger);
		this.trigger.body.immovable = true;
		
		//COLLIDER PARA LIMITAR EL MOVIMIENTO
		this.collider = this.game.add.sprite(0,16*3,"collider_inv");
		this.game.physics.arcade.enable(this.collider);
		this.collider.body.immovable = true;
        
        //pintar corazones
        zelda.Inventory.startHUD();
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                    }else{
                        if(i==zelda.LinkObject.currentHearts-.5){
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            
                            
                        }else{
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            }                   
                    }
            
            
                 }
	},
	
	update:function(){
        this.ScrollInventario();
		//SALIR DE LA SALA
		this.game.physics.arcade.collide(this.link.LinkCollider,this.trigger,function(){
			zelda.gameOptions.GoToOverworld();
		});
		//quitar corazon cuando pierde uno
        if(zelda.LinkObject.hurt && zelda.LinkObject.currentHearts!=zelda.LinkObject.maxHearts){
                
             for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                 zelda.Inventory.heart[i].kill();
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    zelda.Inventory.heart[i+1].kill();
                    
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                    }else{
                        if(i==zelda.LinkObject.currentHearts-.5){
                           
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            
                            
                        }else{
                            
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            }                   
                    }
                
            
                }
            }
        //restablecer corazon cuando recoge uno
        if(zelda.Inventory.healed==true && zelda.LinkObject.currentHearts!=zelda.LinkObject.maxHearts){
            
            for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                 zelda.Inventory.heart[i].kill();
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    zelda.Inventory.heart[i+1].kill();
                    
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                    }else{
                        if(i==zelda.LinkObject.currentHearts-.5){
                           
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            
                            
                        }else{
                            
                            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            }                   
                    }
                
            
                }
            zelda.Inventory.healed=false;
            
        }
        if(zelda.Inventory.healed==true && zelda.LinkObject.currentHearts==zelda.LinkObject.maxHearts){
            for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                    zelda.Inventory.heart[i].kill();
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            }
        }
        zelda.Inventory.MovementCursor();
		this.game.physics.arcade.collide(this.link.LinkCollider,this.collider);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.npc);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire1);
		this.game.physics.arcade.collide(this.link.LinkCollider, this.fire2);
		
		if(!this.roomDone){
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.vida,function(link,vida){
				zelda.LinkPrefab.GrabObject();
				vida.y = vida.y - 8;
				zelda.sala_secreta_E.mana.animations.play("despawn");
				zelda.sala_secreta_E.papel.animations.play("despawn");
				zelda.sala_secreta_E.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_E.vida.destroy();
					zelda.sala_secreta_E.mana.destroy();
					zelda.sala_secreta_E.papel.destroy();
					zelda.sala_secreta_E.npc.destroy();
				},this);
				zelda.sala_secreta_E.roomDone = true;
				zelda.Inventory.GetObject(10);
			});

			this.game.physics.arcade.overlap(this.link.LinkCollider, this.mana, function(link, mana){
				zelda.LinkPrefab.GrabObject();
				mana.y = mana.y - 8;
				zelda.sala_secreta_E.vida.animations.play("despawn");
				zelda.sala_secreta_E.papel.animations.play("despawn");
				zelda.sala_secreta_E.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_E.vida.destroy();
					zelda.sala_secreta_E.mana.destroy();
					zelda.sala_secreta_E.papel.destroy();
					zelda.sala_secreta_E.npc.destroy();
				},this);
				zelda.sala_secreta_E.roomDone = true;
				zelda.Inventory.GetObject(13);
			});
			this.game.physics.arcade.overlap(this.link.LinkCollider, this.papel, function(link, papel){
				zelda.LinkPrefab.GrabObject();
				papel.y = papel.y - 8;
				zelda.sala_secreta_E.mana.animations.play("despawn");
				zelda.sala_secreta_E.vida.animations.play("despawn");
				zelda.sala_secreta_E.npc.animations.play("despawn");
				zelda.game.time.events.add(Phaser.Timer.SECOND, function(){
					zelda.sala_secreta_E.vida.destroy();
					zelda.sala_secreta_E.mana.destroy();
					zelda.sala_secreta_E.papel.destroy();
					zelda.sala_secreta_E.npc.destroy();
				},this);
				zelda.sala_secreta_E.roomDone = true;
				zelda.Inventory.GetObject(16);
			});
		}
		//botton I
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
    ScrollInventario(){
            
                  if(zelda.Inventory.HasSword &&zelda.Inventory.equippedSword=="Bronze"){

                    zelda.Inventory.sword = zelda.game.add.sprite(150+20, 190, "sword", 1);
                    zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                    zelda.Inventory.sword.position.y=zelda.game.camera.y+27;
                    zelda.Inventory.sword.anchor.setTo(.5);
                    zelda.Inventory.sword.scale.setTo(1,-1);
                    //zelda.Inventory.HasSword=false;
                    zelda.Inventory.equippedSword="";
                    }
            
        if(zelda.gameOptions.InventoryScroll != 0){
            
            if(zelda.Inventory.InvON==true){
                this.inventario.fixedToCamera = false;
        
                
                this.inventario.position.y-=1;
                this.inventario.position.y+=-zelda.game.camera.y;
                this.inventario.position.x+=-zelda.game.camera.x;
                this.inventario.fixedToCamera = true;
               //console.log(this.inventario.position.y);
                
                //"pintar" los objetos junto el inventario q sube y baja, pero los pinta debajo por x motivos
                for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=this.inventario.position.y+15;
                    }else{
                        if(i==zelda.LinkObject.currentHearts-.5){
                            
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=this.inventario.position.y+15;
                            
                            
                        }else{
                            
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=this.inventario.position.y+15;
                            }                   
                    }
            
            
                 }
                
                 zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
                  zelda.Inventory.texto.position.y=this.inventario.position.y+10; 
               
                           if(zelda.Inventory.HasSword){ 
                            zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                            zelda.Inventory.sword.position.y=this.inventario.position.y+27;
                           }


                  if(zelda.Inventory.ObjectB!="nothing"){
                zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
                     zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
                     zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
                     zelda.Inventory.PintObj.position.y=this.inventario.position.y;
                
            }
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
                zelda.Inventory.selec.kill();
                if(zelda.Inventory.HasSword){
                            zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                            zelda.Inventory.sword.position.y=this.inventario.position.y+27;
                        }
             if(this.inventario.position.y==-zelda.gameOptions.gameHeight+47){
                zelda.gameOptions.InventoryScroll=0;
                
                         
                //things
                 console.log("cerrado");
                 zelda.Inventory.ScrollingInventory = false;
                 zelda.Inventory.selec.kill();
                 
                 //"pintar" los objetos junto el inventario q sube y baja, pero los pinta debajo por x motivos
                          for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                    if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                        
                         zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                        zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                        }else{
                            if(i==zelda.LinkObject.currentHearts-.5){
                                
                                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;


                            }else{
                                
                                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                                }                   
                        }


                     }
                     zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
                      zelda.Inventory.texto.position.y=zelda.game.camera.y+10;
                        if(zelda.Inventory.HasSword){
                            zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                            zelda.Inventory.sword.position.y=zelda.game.camera.y+27;
                        }
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
                
                 for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    
                     zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=this.inventario.position.y+15;
                    }else{
                        if(i==zelda.LinkObject.currentHearts-.5){
                            
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=this.inventario.position.y+15;
                            
                            
                        }else{
                            
                            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                            zelda.Inventory.heart[i].position.y=this.inventario.position.y+15;
                            }                   
                    }
            
           

                            


                 }
                
                    if(zelda.Inventory.HasSword){
                        zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                        zelda.Inventory.sword.position.y=this.inventario.position.y+202;
                    }
                
                 zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
                  zelda.Inventory.texto.position.y=this.inventario.position.y+10; 
                
                  if(zelda.Inventory.ObjectB!="nothing"){
                zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
                     zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
                     zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
                     zelda.Inventory.PintObj.position.y=this.inventario.position.y;
                
            }
                
                
                zelda.Inventory.MovementCursor();
               // console.log(this.inventario.position.y);
             if(this.inventario.position.y>=0){
                zelda.gameOptions.InventoryScroll=0;
                console.log("abierto");
                 
                
                  if(zelda.Inventory.HasSword){
                      
                        zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                        zelda.Inventory.sword.position.y=zelda.game.camera.y+202;
                    }
                 
                zelda.Inventory.draw();
                if(zelda.Inventory.InvON!=true){
                   zelda.Inventory.InvON=true; 
                     zelda.Inventory.PintarObjB();
                }
                
                 
                 //controles en inventario
                 
                 
              }
                
            }
        }
        
    }
}