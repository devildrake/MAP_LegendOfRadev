var zelda = zelda || {}

zelda.overworld = {
    preload:function(){
        this.load.tilemap("map", "json/MapaZeldaOverWorld16x11.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("OverWorldTileSheetBien16x16", "img/tilesets/OverWorldTileSheetBien16x16.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
        this.load.spritesheet("swordProjectile","img/arrow.png",16,16);
        this.load.spritesheet("Sword","img/Swords.png",16,16);
    },

    create:function(){
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("OverWorldTileSheetBien16x16");
        
        ///Ya se crean las dos capas, Obstacles y ground
        this.map.createLayer("Ground");
        this.map.createLayer("Obstacles");
        
        //Inputs, flechas para andar y Space para atacar por ahora
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        this.loadArrow();
        
        this.sword = this.game.add.sprite(0,0,"Sword");
        this.sword.anchor.setTo(0.5);
        
        this.game.physics.arcade.enable(this.sword);

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
            
    },
    
    update:function(){
        //Se reinicia la velocidad a 0 a cada frame           
        this.Link.body.velocity.setTo(0);        
        
        //La barra espaciadora pone attacking en true
        if(this.space.isDown){
            if(!zelda.LinkObject.attacking){
                if(zelda.LinkObject.currentHearts==zelda.LinkObject.maxHearts){
                    if(zelda.LinkObject.lookingDown){
                    this.createArrow(0);
                    }
                    else if(zelda.LinkObject.lookingUp){
                        this.createArrow(1);
                    }else if(zelda.LinkObject.lookingLeft){
                        this.createArrow(2);
                    }else {
                        this.createArrow(3);
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
                this.Link.body.velocity.x = -zelda.gameOptions.linkSpeed;
                
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
                this.Link.body.velocity.x = zelda.gameOptions.linkSpeed;
                zelda.LinkObject.ResetLooking();

            }else if(this.cursors.up.isDown){
                if(!zelda.LinkObject.switched){
                    zelda.LinkObject.switched = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.15,this.switchLinkScale , this);
                }
                this.Link.body.velocity.y = -zelda.gameOptions.linkSpeed;
                
                if(zelda.LinkObject.hurt)
                    this.Link.animations.play("movingUpHurt");
                else
                    this.Link.animations.play('movingUp');
                
                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingUp = true;

            }else if(this.cursors.down.isDown){
                this.Link.scale.setTo(1);
                this.Link.body.velocity.y = zelda.gameOptions.linkSpeed;
                
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
        
    },	loadArrow:function(){
		this.arrows = this.add.group();
		this.arrows.enableBody = true;
	},
		
	createArrow:function(sth){        
        if(this.arrows.children[0]!=undefined){
            if(!this.arrows.children[0].Alive){
                this.arrows.children[0].Alive = true;
                this.arrows.children[0].reset(this.Link.x, this.Link.y);
                        //IZQUIERDA ABAJO DERECA ARRIBA
        if(sth==0){
		this.arrows.children[0].body.velocity.y = 200;
        this.arrows.children[0].frame = 1;
        }
        else if (sth==1){
        this.arrows.children[0].body.velocity.y = -200;
        this.arrows.children[0].frame = 3;

        }
        else if (sth==2){
        this.arrows.children[0].body.velocity.x = -200;
            this.arrows.children[0].frame = 0;
        }
        else{
        this.arrows.children[0].body.velocity.x = 200;
            this.arrows.children[0].frame = 2;
        }
            }
        }else{
            var arrow = new zelda.arrowPrefab(this.game,this.Link.x, this.Link.y);
            arrow.Alive = true;
			this.arrows.add(arrow);
                    //IZQUIERDA ABAJO DERECA ARRIBA
        if(sth==0){
		arrow.body.velocity.y = 200;
        arrow.frame = 1;
        }
        else if (sth==1){
        arrow.body.velocity.y = -200;
        arrow.frame = 3;

        }
        else if (sth==2){
        arrow.body.velocity.x = -200;
            arrow.frame = 0;
        }
        else{
        arrow.body.velocity.x = 200;
            arrow.frame = 2;
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
                this.sword.scale.y=-1;
                this.sword.scale.x = 1;
                this.sword.reset(this.Link.position.x,this.Link.position.y-16);

            }

            else if(this.Link.frame == 11||this.Link.frame==25){
                if(zelda.LinkObject.lookingLeft){                    

                this.sword.frame = 0;
                this.sword.Alive = true;
                this.sword.scale.x= 1 ;
                this.sword.scale.y = 1 ;  
                this.sword.reset(this.Link.position.x-16,this.Link.position.y);
                    
            }
                else{
                this.sword.frame = 0;
                this.sword.Alive = true;
                this.sword.scale.x=-1;
                this.sword.scale.y = 1;  
                this.sword.reset(this.Link.position.x+16,this.Link.position.y);

                }
            }
        
        
        }
    }
}
