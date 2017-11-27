var zelda = zelda || {};

zelda.LinkPrefab = function(game,x,y,level){
    
	Phaser.Sprite.call(this,game,x,y,"Link");    
    //Phaser.Sprite.call(this.LinkCollider,game,x,y,"LinkCollider");
    
    //  this.LinkCollider.anchor.setTo(0.5,0);
    //  this.LinkCollider.scale.setTo(1);
    
    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.animations.add("movingDown", [0,1], 5, true);
	this.animations.add("movingUp", [2], 5, true);
	this.animations.add("movingSideWays", [3,4],5,true);
	this.animations.add("movingDownHurt", [14,15], 5, true);
	this.animations.add("movingUpHurt", [16], 5, true);
	this.animations.add("movingSideWaysHurt", [17,18],5,true); 
    zelda.LinkObject.calledNotHurt = false;
    this.grabbingObject = false;

	this.level = level;
	if(level != zelda.overworld){
		this.LinkCollider = game.add.sprite(x,y,"LinkCollider");
	}else{
		this.LinkCollider = game.add.sprite(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY,"LinkCollider");
	}
    

    //console.log(this.praticlesA[0]);
    //console.log(this.particlesA[0]);
    
    
	this.LinkCollider.anchor.setTo(0.5,0);
	this.LinkCollider.scale.setTo(1);


    
	game.add.existing(this);
	this.cursors = game.input.keyboard.createCursorKeys();
	this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        

	this.sword = this.game.add.sprite(0,0,"Sword");
	this.sword.anchor.setTo(0.5);
	this.sword.kill();
	this.sword.Alive = false;
    this.descending = false;

	this.projectile = this.game.add.sprite(0,0,"Sword");
	this.projectile.anchor.setTo(0.5);
	this.projectile.Alive = false;
    this.projectile.prevAlive = false;
	this.projectile.kill();

	this.projectile.outOfBoundsKill = true;
	this.projectile.checkWorldBounds = true;
	this.projectile.events.onOutOfBounds.add(function notAlive(){this.projectile.Alive = false;}, this);
    this.projectile.previousVelocityX = 0;
    this.projectile.previousVelocityY = 0;
    this.wasPaused = false;
    


	this.game.physics.arcade.enable(this.projectile);
	this.game.physics.arcade.enable(this.LinkCollider);
    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this.sword);

    if(zelda.LinkPrefab.getSpecialItemSound==undefined)
    zelda.LinkPrefab.getSpecialItemSound =  this.game.add.audio("getSpecialItem");
    
    if(zelda.LinkPrefab.grabHeartSound==undefined)
    zelda.LinkPrefab.grabHeartSound =  this.game.add.audio("GrabHeart");
    
    if(zelda.LinkPrefab.grabItemSound==undefined)
    zelda.LinkPrefab.grabItemSound =  this.game.add.audio("getItem");
    
    if(zelda.LinkPrefab.shootProjectileSound==undefined)
    zelda.LinkPrefab.shootProjectileSound = this.game.add.audio("ShootProjectile");
    
    if(zelda.LinkPrefab.attackSound==undefined)
    zelda.LinkPrefab.attackSound = this.game.add.audio("SwordAttak");
    
    if(zelda.LinkPrefab.blockSound==undefined)
    zelda.LinkPrefab.blockSound = this.game.add.audio("ShieldBlock");
    
    if(zelda.LinkPrefab.stairsSound==undefined)
    zelda.LinkPrefab.stairsSound = this.game.add.audio("Stairs");
   
    if(zelda.LinkPrefab.getHurtSound==undefined)
    zelda.LinkPrefab.getHurtSound = this.game.add.audio("LinkHurt");
    
    if(zelda.LinkPrefab.lowHpSound==undefined)
    zelda.LinkPrefab.lowHpSound = this.game.add.audio("LowHp");
    
        //this.particlesA = game.add.sprite(0,0,"Particles");
    this.particlesA = [0,0,0,0];
        this.particlesA[0] = game.add.sprite(0,0,"Particles");
        this.particlesA[1] = game.add.sprite(0,0,"Particles");
        this.particlesA[2] = game.add.sprite(0,0,"Particles");
        this.particlesA[3] = game.add.sprite(0,0,"Particles");
        

    this.particlesB = [0,0,0,0];
        this.particlesB[0] = game.add.sprite(0,0,"Particles");
        this.particlesB[1] = game.add.sprite(0,0,"Particles");
        this.particlesB[2] = game.add.sprite(0,0,"Particles");
        this.particlesB[3] = game.add.sprite(0,0,"Particles");
        
    for(var i =0;i<this.particlesA.length;i++){
        this.particlesA[i].Alive = false; 
        this.particlesB[i].Alive = false; 
        this.particlesA[i].kill();
        this.particlesB[i].kill();
        this.particlesA[i].scale.setTo(1);
        this.particlesB[i].scale.setTo(1);
        this.particlesA[i].anchor.setTo(1);
        this.particlesB[i].anchor.setTo(1);
        this.game.physics.arcade.enable(this.particlesA[i]);
	   this.game.physics.arcade.enable(this.particlesB[i]);
        this.particlesA[i].frame = i;
                this.particlesB[i].frame = i;

        }
    this.particlesA[0].calledBeDestroyed= false;
        this.particlesB[0].calledBeDestroyed= false;
    zelda.LinkObject.switched = false;
    
    this.spriteSueloEscaleras = this.game.add.sprite(0,0,"GroundTile");
    this.spriteSueloEscaleras.Alive = false;
    this.spriteSueloEscaleras.kill();
    //this.spriteSueloEscaleras.immovable = true;
};

zelda.LinkPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.LinkPrefab.prototype.constructor = zelda.LinkPrefab;



//PRINCIPIO DEL UPDATE=========================================================================================================================================
//PRINCIPIO DEL UPDATE=========================================================================================================================================

zelda.LinkPrefab.prototype.update = function(){
    
    if(zelda.LinkObject.currentHearts==0.5){
        if(!zelda.LinkPrefab.lowHpSound.isPlaying)
        zelda.LinkPrefab.lowHpSound.play();
    }
    
                this.position = this.LinkCollider.position;


	//Se reinicia la velocidad a 0 a cada frame           
	//this.Link.body.velocity.setTo(0);
    if(!zelda.LinkObject.goingDownStairWay&&!zelda.LinkObject.goingUpStairWay){
        if(!zelda.Inventory.ScrollingInventory){
                if(this.wasPaused&&!zelda.Inventory.InvON){
                    this.wasPaused = false;

                    if(this.projectile.Alive){
                        this.projectile.body.velocity.x = this.projectile.previousVelocityX;
                        this.projectile.body.velocity.y = this.projectile.previousVelocityY;
                    }
                }
            if(!zelda.LinkObject.moveFromDmg){
               this.LinkCollider.body.velocity.setTo(0);
            }else if(!zelda.LinkObject.calledNotMoveFromDamage){
                zelda.LinkObject.calledNotMoveFromDamage = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.setMoveFromDamageFalse, this.level);
            }
            this.game.physics.arcade.collide(this.LinkCollider,this.level.obstacles);

            //La barra espaciadora pone attacking en true
            if(this.space.isDown&&this.space.downDuration(1)&&zelda.Inventory.HasSword){
                if(!zelda.LinkObject.attacking){
                    if(zelda.LinkObject.currentHearts==zelda.LinkObject.maxHearts){
                        if(zelda.LinkObject.lookingDown){
                            zelda.LinkPrefab.createProjectile(0,this);
                        }
                        else if(zelda.LinkObject.lookingUp){
                            zelda.LinkPrefab.createProjectile(1,this);
                        }else if(zelda.LinkObject.lookingLeft){
                            zelda.LinkPrefab.createProjectile(2,this);
                        }else {
                            zelda.LinkPrefab.createProjectile(3,this);
                        }
                    }
                }
                if(!zelda.LinkObject.attacking)
                zelda.LinkPrefab.attackSound.play();
                zelda.LinkObject.attacking = true;

            }

            if(zelda.LinkObject.hurt&&!zelda.LinkObject.calledNotHurt){
                if(!zelda.LinkPrefab.getHurtSound.isPlaying)
                zelda.LinkPrefab.getHurtSound.play();
                this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.NotHurt , this.level);
                zelda.LinkObject.calledNotHurt = true;
            }

            if(this.particlesA[0].Alive){

                if(!this.particlesA[0].calledBeDestroyed){
                for(var i=0;i<4;i++)
                this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.AIMethods.BeDestroyed, this.level,this.particlesA[i]);
                    this.particlesA[0].calledBeDestroyed = true;
                }
            }
            if(this.particlesB[0].Alive){
                if(!this.particlesB[0].calledBeDestroyed){
                for(var i=0;i<4;i++)
                this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.AIMethods.BeDestroyed, this.level,this.particlesB[i]);
                    this.particlesB[0].calledBeDestroyed = true;
                }
            }

            if(this.projectile.prevAlive&&!this.projectile.Alive){
                this.projectile.prevAlive=false;

                if(!this.particlesA[0].Alive){
                    this.particlesA[0].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesA[1].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesA[2].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesA[3].reset(this.projectile.position.x,this.projectile.position.y);
                    for(var i=0;i<4;i++)
                        this.particlesA[i].Alive = true;
                        this.particlesA[0].thePos = this.projectile.position;
                    this.particlesA[0].body.velocity.x=-30;
                    this.particlesA[0].body.velocity.y=-30;

                    this.particlesA[1].body.velocity.x=30;
                    this.particlesA[1].body.velocity.y=-30;           

                    this.particlesA[3].body.velocity.x=30;
                    this.particlesA[3].body.velocity.y=30;     

                    this.particlesA[2].body.velocity.x=-30;
                    this.particlesA[2].body.velocity.y=30;
                    //this.particlesA[0].reset(this.projectile.position);



                }else if(!this.particlesB[0].Alive){
                    this.particlesB[0].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesB[1].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesB[2].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesB[3].reset(this.projectile.position.x,this.projectile.position.y);

                    for(var i=0;i<4;i++)
                        this.particlesB[i].Alive = true;

                    this.particlesB[0].body.velocity.x=-30;
                    this.particlesB[0].body.velocity.y=-30;

                    this.particlesB[1].body.velocity.x=30;
                    this.particlesB[1].body.velocity.y=-30;           

                    this.particlesB[3].body.velocity.x=30;
                    this.particlesB[3].body.velocity.y=30;     

                    this.particlesB[2].body.velocity.x=-30;
                    this.particlesB[2].body.velocity.y=30;
                    //this.particlesA[0].reset(this.projectile.position);

                }else{
                    this.particlesA[0].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesA[1].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesA[2].reset(this.projectile.position.x,this.projectile.position.y);
                    this.particlesA[3].reset(this.projectile.position.x,this.projectile.position.y);
                    for(var i=0;i<4;i++)
                        this.particlesA[i].Alive = true;

                    this.particlesA[0].body.velocity.x=-30;
                    this.particlesA[0].body.velocity.y=-30;

                    this.particlesA[1].body.velocity.x=30;
                    this.particlesA[1].body.velocity.y=-30;           

                    this.particlesA[3].body.velocity.x=30;
                    this.particlesA[3].body.velocity.y=30;     

                    this.particlesA[2].body.velocity.x=-30;
                    this.particlesA[2].body.velocity.y=30;
                    //this.particlesA[0].reset(this.projectile.position);
                }



            }

            //Comportamiento si attacking es false, es el movimiento con las flechas 
            if(!zelda.LinkObject.attacking&&!zelda.LinkObject.grabbingObject){
                if(zelda.gameOptions.cameraArrivedPos){
                    if(this.cursors.left.isDown){

                        //this.Link.body.velocity.x = -zelda.gameOptions.linkSpeed;
                        this.LinkCollider.body.velocity.x= -zelda.gameOptions.linkSpeed;

                        if(zelda.LinkObject.hurt)
                            this.animations.play("movingSideWaysHurt");
                        else
                            this.animations.play("movingSideWays");

                        this.scale.x = -1;
                        zelda.LinkObject.ResetLooking();
                        zelda.LinkObject.lookingLeft = true;
                    }else if(this.cursors.right.isDown){

                        if(zelda.LinkObject.hurt)
                            this.animations.play("movingSideWaysHurt");
                        else
                            this.animations.play("movingSideWays");

                        this.scale.setTo(1);
                        this.LinkCollider.body.velocity.x = zelda.gameOptions.linkSpeed;

                        zelda.LinkObject.ResetLooking();
                        zelda.LinkObject.lookingRight = true;
                    }else if(this.cursors.up.isDown){
                            //console.log(zelda.LinkObject.switched);


                        if(!zelda.LinkObject.switched){
                            zelda.LinkObject.switched = true;
                            this.game.time.events.add(Phaser.Timer.SECOND * 0.15,zelda.LinkPrefab.switchLinkScale , this.level,this);

                        }
                        this.LinkCollider.body.velocity.y = -zelda.gameOptions.linkSpeed;

                        if(zelda.LinkObject.hurt)
                            this.animations.play("movingUpHurt");
                        else
                            this.animations.play('movingUp');

                        zelda.LinkObject.ResetLooking();
                        zelda.LinkObject.lookingUp = true;

                    }else if(this.cursors.down.isDown){
                        this.scale.setTo(1);
                        this.LinkCollider.body.velocity.y = zelda.gameOptions.linkSpeed;

                        if(zelda.LinkObject.hurt)
                            this.animations.play("movingDownHurt");
                        else
                            this.animations.play('movingDown');

                        zelda.LinkObject.ResetLooking();
                        zelda.LinkObject.lookingDown = true;
                    }
                    else {
                        if(zelda.LinkObject.lookingUp){
                            this.animations.stop();
                        }else if(zelda.LinkObject.lookingLeft){
                            this.scale.x = -1;
                            if(zelda.LinkObject.hurt)
                                this.frame = 14;
                            else 
                                this.frame = 4;
                        }else if(zelda.LinkObject.lookingDown){
                            if(zelda.LinkObject.hurt)
                                this.frame = 14;
                            else    
                                this.frame = 0;
                        }else{
                            if(zelda.LinkObject.hurt)
                                this.frame = 18;
                            else 
                                this.frame = 4;
                        }


                    }
            }else{
                this.animations.stop();
            }
            }
            //Comportamiento si aun no se ha hecho invoke al método que pone attacking en false
            else if(!zelda.LinkObject.calledNotAttack&&zelda.LinkObject.attacking){
                if(zelda.LinkObject.lookingDown){
                    this.scale.setTo(1);

                    if(zelda.LinkObject.hurt)
                        this.frame = 23;
                    else    
                        this.frame = 9;

                }else if(zelda.LinkObject.lookingUp){
                    this.scale.setTo(1);

                    if(zelda.LinkObject.hurt)
                        this.frame = 24;
                    else
                        this.frame = 10;

                }else if(zelda.LinkObject.lookingLeft){
                    this.scale.x = -1;
                    if(zelda.LinkObject.hurt)
                        this.frame = 25;
                    else
                        this.frame = 11;
                }else{this.scale.setTo(1);
                    if(zelda.LinkObject.hurt)
                        this.frame = 25;
                    else
                        this.frame = 11;
                }

                this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.LinkPrefab.makeLinkNotAttack , this.level, this);
                zelda.LinkObject.calledNotAttack = true;

                zelda.LinkPrefab.createSword(this);
            }
            //Comportamiento si ya se ha hecho el invoke al método que pone attacking en false pero aun no se ha llamado a dicho método
            else{
                if(zelda.LinkObject.lookingDown){
                    if(zelda.LinkObject.hurt)
                        this.frame = 23;
                    else
                        this.frame = 9;
                }else if(zelda.LinkObject.lookingUp){
                    this.scale.setTo(1);
                    if(zelda.LinkObject.hurt)
                        this.frame = 24;
                    else
                        this.frame = 10;
                }else if(zelda.LinkObject.lookingLeft){
                    if(zelda.LinkObject.hurt)
                        this.frame = 25;
                    else
                        this.frame = 11;
                }else{
                    if(zelda.LinkObject.hurt)
                        this.frame = 25;
                    else
                        this.frame = 11;
                }
                //this.createSword();
            }

            if(zelda.LinkObject.grabbingObject){
                this.game.time.events.add(Phaser.Timer.SECOND * 1,zelda.LinkPrefab.StopGrabbing , this.level);
                this.frame = 13;
            }
        }else{


                if(!this.wasPaused){
                    this.wasPaused = true;
                    this.projectile.previousVelocityX = this.projectile.body.velocity.x; 
                    this.projectile.previousVelocityY = this.projectile.body.velocity.y; 
                    this.animations.stop();
                    this.body.velocity.setTo(0);
                    this.LinkCollider.body.velocity.setTo(0);

                    this.projectile.body.velocity.setTo(0);
                    this.prevVelocity = this.body.velocity;

                    this.body.velocity.setTo(0);
                    this.animations.stop();
                }



        }
        if(this.spriteSueloEscaleras.Alive){
            this.spriteSueloEscaleras.kill();
            this.spriteSueloEscaleras.Alive = false;
        }
    }else{
        if(zelda.LinkObject.goingDownStairWay&&!zelda.LinkObject.calledChangeLater){
            if(!zelda.LinkObject.switched){
                zelda.LinkObject.switched = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 0.15,zelda.LinkPrefab.switchLinkScale , this.level,this);
            }
            this.spriteSueloEscaleras.reset(zelda.LinkObject.whereToPlaceStairWayGround.x,zelda.LinkObject.whereToPlaceStairWayGround.y+16);
            this.spriteSueloEscaleras.Alive = true;
            this.LinkCollider.body.velocity.x = 0;
            this.LinkCollider.body.velocity.y = 15;
            this.game.time.events.add(Phaser.Timer.SECOND * 0.94,zelda.LinkPrefab.changeScene, this.level);
            if(!zelda.LinkPrefab.stairsSound.isPlaying)
            zelda.LinkPrefab.stairsSound.play();

        }else if(zelda.LinkObject.goingUpStairWay){
            //console.log(this.spriteSueloEscaleras);
            //this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.changeScene, this.level);
            this.spriteSueloEscaleras.reset(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY);
            //this.LinkCollider.body.velocity.x = 0;
            this.LinkCollider.body.velocity.y = -12;
            this.animations.play("movingDown");
            
            if(!zelda.LinkPrefab.stairsSound.isPlaying)
            zelda.LinkPrefab.stairsSound.play();
            
            
            if(this.position.y+8<this.spriteSueloEscaleras.position.y&&this.spriteSueloEscaleras.Alive){
                zelda.LinkObject.goingUpStairWay = false;
                zelda.overworld.createEnemiesOfCurrentZone();
            }
            this.spriteSueloEscaleras.Alive = true;
        }
        
        
    }
    console.log(zelda.LinkObject.currentHearts);
    
}

//FINAL DEL UPDATE=========================================================================================================================================
//FINAL DEL UPDATE=========================================================================================================================================

zelda.LinkPrefab.GrabObject = function(){
    zelda.LinkObject.grabbingObject = true;
    zelda.LinkPrefab.grabItemSound.play();
    //console.log(zelda.LinkPrefab.grabItemSound);
    //level.linkInstance.getItemMusic.play();
}

zelda.LinkPrefab.StopGrabbing = function(){
    zelda.LinkObject.grabbingObject = false;
}

zelda.LinkPrefab.changeScene = function(){
                    zelda.LinkPrefab.stairsSound.stop();
    zelda.LinkObject.calledChangeLater = false;
    zelda.LinkObject.goingDownStairWay = false;
    zelda.game.state.start(zelda.LinkObject.sceneToGo);


}
zelda.LinkPrefab.PlayGrabHeart = function(){
    if(!zelda.LinkPrefab.grabHeartSound.isPlaying)
        zelda.LinkPrefab.grabHeartSound.play();
}

zelda.LinkPrefab.createSword = function(obj){
	if(!obj.sword.Alive){
		if(obj.frame ==9||obj.frame==23){

			obj.sword.frame = 1;
			obj.sword.scale.y = 1;
			obj.sword.scale.x = 1;
			obj.sword.reset(obj.position.x,obj.position.y+16);
		}
		// up
		else if(obj.frame == 10 || obj.frame==24){
			obj.sword.frame = 1;
			obj.sword.scale.y= -1;
			obj.sword.scale.x = 1;
			obj.sword.reset(obj.position.x,obj.position.y-16);

		}

		else if(obj.frame == 11||obj.frame==25){
			if(zelda.LinkObject.lookingLeft){                    

			obj.sword.frame = 0;
			obj.sword.scale.x = 1 ;
			obj.sword.scale.y = 1 ;  
			obj.sword.reset(obj.position.x-16,obj.position.y);

			}
			else{
			obj.sword.frame = 0;
			obj.sword.scale.x= -1;
			obj.sword.scale.y = 1;  
			obj.sword.reset(obj.position.x+16,obj.position.y);

			}
		}
        obj.sword.Alive = true;

	}
}

zelda.LinkPrefab.makeLinkNotAttack = function(){

	zelda.LinkObject.attacking = false;
	zelda.LinkObject.calledNotAttack = false;

	zelda.LinkPrefab.sword.kill();
	zelda.LinkPrefab.sword.Alive = false;

	if(zelda.LinkObject.lookingDown){
		this.scale.setTo(1);
		this.frame = 0;
	}else  if(zelda.LinkObject.lookingUp){
		this.scale.setTo(1);
		this.frame = 2;
	}else if(zelda.LinkObject.lookingLeft){
		this.scale.x=-1;
		this.frame = 4;
	}else{
		this.scale.setTo(1);
		this.frame = 4;
	}
}

zelda.LinkPrefab.createProjectile = function(sth,obj){        
	if(!obj.projectile.Alive){
            zelda.LinkPrefab.shootProjectileSound.play();

		obj.projectile.reset(obj.position.x, obj.position.y);
		obj.projectile.Alive = true;
        obj.projectile.prevAlive = true;

		if(sth==0){
			obj.projectile.body.velocity.y = 200;
			obj.projectile.frame = 1;
			obj.projectile.scale.y = 1;
			obj.projectile.scale.x = 1;
		}
		else if (sth==1){
			obj.projectile.body.velocity.y = -200;
			obj.projectile.frame = 1;
			obj.projectile.scale.y=-1;
			obj.projectile.scale.x = 1;

		}
		else if (sth==2){
			obj.projectile.body.velocity.x = -200;
			obj.projectile.frame = 0;
			obj.projectile.scale.x = 1 ;
			obj.projectile.scale.y = 1 ;  
		}
		else{
			obj.projectile.body.velocity.x = 200;
			obj.projectile.frame = 0;
			obj.projectile.scale.x=-1;
			obj.projectile.scale.y = 1;  
		}
	}
}

zelda.LinkPrefab.stairWayUp = function(whereX,whereY){
    zelda.LinkObject.goingUpStairWay = true;
    zelda.LinkObject.whereToPlaceStairWayGround.x = whereX;
    zelda.LinkObject.whereToPlaceStairWayGround.y = whereY;

    //zelda.LinkObject.sceneToGo = sceneToGoTo;
}

zelda.LinkPrefab.stairWayDown = function(where,sceneToGoTo){
    zelda.LinkObject.goingDownStairWay = true;
    zelda.LinkObject.whereToPlaceStairWayGround = where;
    zelda.LinkObject.sceneToGo = sceneToGoTo;
}

zelda.LinkPrefab.makeLinkNotAttack = function(obj){
	zelda.LinkObject.attacking = false;
	zelda.LinkObject.calledNotAttack = false;

	obj.sword.kill();
	obj.sword.Alive = false;

	if(zelda.LinkObject.lookingDown){
		obj.scale.setTo(1);
		obj.frame = 0;
	}else  if(zelda.LinkObject.lookingUp){
		obj.scale.setTo(1);
		obj.frame = 2;
	}else if(zelda.LinkObject.lookingLeft){
		obj.scale.x=-1;
		obj.frame = 4;
	}else{
		obj.scale.setTo(1);
		obj.frame = 4;
	}
}
    
    zelda.LinkPrefab.NotHurt = function(){
        
        zelda.LinkObject.calledNotHurt = false;
        zelda.LinkObject.hurt = false;
        
    }
    
    zelda.LinkPrefab.switchLinkScale = function(obj){
        if(obj.scale.x==-1)
      obj.scale.x = 1;  
        else{
            obj.scale.x = -1;
        }        
        zelda.LinkObject.switched = false;
    }
    
    zelda.LinkPrefab.setMoveFromDamageFalse = function(){
        zelda.LinkObject.moveFromDmg = false;
        zelda.LinkObject.calledNotMoveFromDamage = false;
    }

    zelda.LinkPrefab.createParticles = function(){
        
        
    }
