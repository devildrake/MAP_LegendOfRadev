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
	this.animations.add("movingDownHurt", [14,0,14,0,15,1,15,1], 20, true);
	this.animations.add("movingUpHurt", [16,2,16,2], 20, true);
	this.animations.add("movingSideWaysHurt", [17,3,17,3,18,4,18,4],20,true); 
    this.animations.add("Die",[0+14,0,4+14,4,2+14,2],0,true);
    

    
    zelda.LinkObject.calledNotHurt = false;
    this.grabbingObject = false;
    zelda.LinkObject.invincible = false;
	this.level = level;
	if(level != zelda.overworld){
		this.LinkCollider = game.add.sprite(x,y,"LinkCollider");
	}else{
		this.LinkCollider = game.add.sprite(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY,"LinkCollider");
	}

    
	this.LinkCollider.anchor.setTo(0.5,0);
	this.LinkCollider.scale.setTo(1);


    
	game.add.existing(this);
	this.cursors = game.input.keyboard.createCursorKeys();
	this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
    this.debugPosKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.boomerang = game.add.sprite(0,0,"Boomerang");
    this.boomerang.animations.add("Roll",[0,1,2,3,4,5,6,7],15,true);
    this.boomerang.anchor.setTo(0.5);
    this.boomerang.Alive = false;
    this.boomerang.maxDistance = 70;
    this.boomerang.destinedPosX = 0;
    this.boomerang.destinedPosY = 0;
    this.boomerang.returning = false;
    this.boomerang.kill();
    
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
    this.game.physics.arcade.enable(this.boomerang);


    if(zelda.LinkPrefab.usePotionSound==undefined){
        zelda.LinkPrefab.usePotionSound = this.game.add.audio("UsePotion");
    }
    
    if(zelda.LinkPrefab.placeBombSound==undefined){
        zelda.LinkPrefab.placeBombSound = this.game.add.audio("PlaceBomb");
    }
        
    if(zelda.LinkPrefab.blowUpBombSound==undefined){
        zelda.LinkPrefab.blowUpBombSound = this.game.add.audio("BlowBomb");

    }
    
    if(zelda.LinkPrefab.dieMusic==undefined){
        zelda.LinkPrefab.dieMusic = this.game.add.audio("DieMusic");
    }
    
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
    
    if(zelda.LinkPrefab.secretMusic==undefined)
    zelda.LinkPrefab.secretMusic = this.game.add.audio("SecretFound");
    
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
    
    
    if(this.debugPosKey.isDown&&this.debugPosKey.downDuration(1)){
        console.log(this.level.linkInstance.position);
        
        if(this.level==zelda.dungeon)
        console.log("Current zone = " + zelda.LinkObject.currentDungeonZone);
        else
                    console.log("Current zone = " + zelda.LinkObject.currentZone);

            
    }
    
    if(this.level == zelda.dungeon){
		this.game.physics.arcade.collide(this.LinkCollider, this.level.obstacles1);
		this.game.physics.arcade.collide(this.LinkCollider, this.level.obstacles2);
		this.game.physics.arcade.collide(this.LinkCollider, this.level.obstacles3);
		this.game.physics.arcade.collide(this.LinkCollider, this.level.obstacles4);
	}
	
    if(zelda.LinkObject.currentHearts==0.5){
        if(!zelda.LinkPrefab.lowHpSound.isPlaying)
        zelda.LinkPrefab.lowHpSound.play();
    }
    
	this.position = this.LinkCollider.position;
    
    if(zelda.LinkObject.currentHearts<=0){
        zelda.LinkObject.dying = true;
    }
    
	//Se reinicia la velocidad a 0 a cada frame           
	//this.Link.body.velocity.setTo(0);
    if(!zelda.LinkObject.dying){

        if(!zelda.LinkObject.goingDownStairWay&&!zelda.LinkObject.goingUpStairWay){
            if(!zelda.Inventory.ScrollingInventory){
                    if(this.wasPaused&&!zelda.Inventory.InvON){
                        this.wasPaused = false;

                        if(this.projectile.Alive){
                            this.projectile.body.velocity.x = this.projectile.previousVelocityX;
                            this.projectile.body.velocity.y = this.projectile.previousVelocityY;
                        }
                        if(this.boomerang.Alive){
                            this.boomerang.body.velocity.x = this.boomerang.previousVelocityX;
                            this.boomerang.body.velocity.y = this.boomerang.previousVelocityY;

                        }
                    }
                if(!zelda.LinkObject.moveFromDmg){
                   this.LinkCollider.body.velocity.setTo(0);
                }else if(!zelda.LinkObject.calledNotMoveFromDamage){
                    zelda.LinkObject.calledNotMoveFromDamage = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.setMoveFromDamageFalse, this.level);
                }
                this.game.physics.arcade.collide(this.LinkCollider,this.level.obstacles);
                this.game.physics.arcade.collide(this.LinkCollider,this.level.water);

                //La barra espaciadora pone attacking en true
                if(this.space.isDown&&this.space.downDuration(1)&&zelda.Inventory.HasSword&&zelda.gameOptions.cameraArrivedPos){
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
                    this.game.time.events.add(Phaser.Timer.SECOND * 1,zelda.LinkPrefab.NotInvicible , this.level);
                    zelda.LinkObject.calledNotInvincible = true;
                    zelda.LinkObject.calledNotHurt = true;
                    zelda.LinkObject.invincible = true;
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

                            if(zelda.LinkObject.invincible)
                                this.animations.play("movingSideWaysHurt");
                            else
                                this.animations.play("movingSideWays");

                            this.scale.x = -1;
                            zelda.LinkObject.ResetLooking();
                            zelda.LinkObject.lookingLeft = true;
                        }else if(this.cursors.right.isDown){

                            if(zelda.LinkObject.invincible)
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

                            if(zelda.LinkObject.invincible)
                                this.animations.play("movingUpHurt");
                            else
                                this.animations.play('movingUp');

                            zelda.LinkObject.ResetLooking();
                            zelda.LinkObject.lookingUp = true;

                        }else if(this.cursors.down.isDown){
                            this.scale.setTo(1);
                            this.LinkCollider.body.velocity.y = zelda.gameOptions.linkSpeed;

                            if(zelda.LinkObject.invincible)
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
                                if(zelda.LinkObject.invincible)
                                    this.frame = 14;
                                else 
                                    this.frame = 4;
                            }else if(zelda.LinkObject.lookingDown){
                                if(zelda.LinkObject.invincible)
                                    this.frame = 14;
                                else    
                                    this.frame = 0;
                            }else{
                                if(zelda.LinkObject.invincible)
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

                        if(zelda.LinkObject.invincible)
                            this.frame = 23;
                        else    
                            this.frame = 9;

                    }else if(zelda.LinkObject.lookingUp){
                        this.scale.setTo(1);

                        if(zelda.LinkObject.invincible)
                            this.frame = 24;
                        else
                            this.frame = 10;

                    }else if(zelda.LinkObject.lookingLeft){
                        this.scale.x = -1;
                        if(zelda.LinkObject.invincible)
                            this.frame = 25;
                        else
                            this.frame = 11;
                    }else{this.scale.setTo(1);
                        if(zelda.LinkObject.invincible)
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

                if(zelda.LinkObject.grabbingObject&&!zelda.LinkObject.hasTriforce){
                    this.game.time.events.add(Phaser.Timer.SECOND * 1,zelda.LinkPrefab.StopGrabbing , this.level);
                    this.frame = 13;
                }else if(zelda.LinkObject.grabbingObject){
                    this.frame = 13;
                }
                
                if(this.boomerang.Alive){
                    if(this.boomerang.returning){
                        this.boomerang.body.velocity.x = (this.body.position.x - this.boomerang.body.position.x);
                        this.boomerang.body.velocity.y = (this.body.position.y - this.boomerang.body.position.y);

                        var magnitude = (this.body.position.x - this.boomerang.body.position.x) * (this.body.position.x - this.boomerang.body.position.x) + (this.body.position.y - this.boomerang.body.position.y)* (this.body.position.y - this.boomerang.body.position.y);
                        
                        magnitude = Math.sqrt(magnitude);
                        this.boomerang.body.velocity.x = this.boomerang.body.velocity.x/magnitude * 100;
                        this.boomerang.body.velocity.y = this.boomerang.body.velocity.y/magnitude * 100;

                        
                     this.game.physics.arcade.overlap(this,this.boomerang,
                        function(link,boomerang){
                         boomerang.Alive = false;
                         boomerang.kill();
                        link.body.velocity.setTo(0);
                         link.LinkCollider.body.velocity.setTo(0);
                        } );
                    }else{
                        if(this.boomerang.going=="Up"){
                            if(this.boomerang.position.y<this.boomerang.destinedPosY){
                                console.log(this.boomerang.destinedPosY + ", " + this.boomerang.position.y);
                                this.boomerang.returning = true;
                            }
                        }else if(this.boomerang.going=="Down"){
                            if(this.boomerang.position.y>this.boomerang.destinedPosY){
                                this.boomerang.returning = true;
                            }
                        }else if(this.boomerang.going=="Right"){
                            if(this.boomerang.position.x>this.boomerang.destinedPosX){
                                this.boomerang.returning = true;
                            }
                        }else if(this.boomerang.going=="Left"){
                            if(this.boomerang.position.x<this.boomerang.destinedPosX){
                                this.boomerang.returning = true;
                            }
                        }
                        
                        

                    }
                }
                
            }else{
                    if(!this.wasPaused){
                        this.wasPaused = true;
                        this.projectile.previousVelocityX = this.projectile.body.velocity.x; 
                        this.projectile.previousVelocityY = this.projectile.body.velocity.y; 
                        this.boomerang.previousVelocityX = this.boomerang.body.velocity.x; 
                        this.boomerang.previousVelocityY = this.boomerang.body.velocity.y; 
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
        //console.log(zelda.LinkObject.currentHearts);
    }else{
        if(!zelda.LinkPrefab.dieMusic.isPlaying){
            if(!this.playedDeathMusicOnce){
                zelda.LinkPrefab.dieMusic.play();
                this.playedDeathMusicOnce = true;
            }else{
                //CAMBIO DE ESCENA
                if(this.level==zelda.overworld){
                                        console.log("Died in overworld");

                    zelda.LinkObject.currentZone = 30;
                        zelda.LinkObject.lastPositionX = 2*16*16+8*16;
                        zelda.LinkObject.lastPositionY = 4*11*16 + 8*16;
                }
                else {
                    console.log("Died in dungeon");
                    zelda.LinkObject.currentDungeonZone = 38;
                    
                        zelda.LinkObject.lastPositionX = 2*16*16 + 8*16;
                        zelda.LinkObject.lastPositionY = 992;
                }
                zelda.game.state.start("game_over");

            }
        }       
        
        
        //console.log(zelda.LinkPrefab.dieMusic);
        this.level.music.stop();
        this.LinkCollider.body.velocity.setTo(0);
        this.animations.play("Die");
    }
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
			obj.sword.reset(obj.position.x+2,obj.position.y+12);
		}
		// up
		else if(obj.frame == 10 || obj.frame==24){
			obj.sword.frame = 1;
			obj.sword.scale.y= -1;
			obj.sword.scale.x = 1;
			obj.sword.reset(obj.position.x-2,obj.position.y-12);

		}

		else if(obj.frame == 11||obj.frame==25){
			if(zelda.LinkObject.lookingLeft){                    

			obj.sword.frame = 0;
			obj.sword.scale.x = 1 ;
			obj.sword.scale.y = 1 ;  
			obj.sword.reset(obj.position.x-11,obj.position.y+2);

			}
			else{
			obj.sword.frame = 0;
			obj.sword.scale.x= -1;
			obj.sword.scale.y = 1;  
			obj.sword.reset(obj.position.x+11,obj.position.y+2);

			}
		}
        obj.sword.Alive = true;

	}
}

zelda.LinkPrefab.throwBoomerang = function(obj){
    
    
    /*
    this.animations.add("movingDown", [0,1], 5, true);
	this.animations.add("movingUp", [2], 5, true);
	this.animations.add("movingSideWays", [3,4],5,true);
	this.animations.add("movingDownHurt", [14,0,14,0,15,1,15,1], 20, true);
	this.animations.add("movingUpHurt", [16,2,16,2], 20, true);
	this.animations.add("movingSideWaysHurt", [17,3,17,3,18,4,18,4],20,true); 
    
    */
    
    	if(!obj.boomerang.Alive){            
            if(zelda.LinkObject.lookingDown){
            //DOWN
                obj.boomerang.frame = 0;
                obj.boomerang.reset(obj.position.x+2,obj.position.y+12);
                obj.boomerang.destinedPosX = obj.body.position.x+2;
                obj.boomerang.destinedPosY = obj.body.position.y+24+obj.boomerang.maxDistance;
                obj.boomerang.going = "Down";
            }
            // up
            else if(zelda.LinkObject.lookingUp){
                obj.boomerang.frame = 0;
                obj.boomerang.reset(obj.position.x-2,obj.position.y-12);
                obj.boomerang.destinedPosX = obj.body.position.x-2;
                obj.boomerang.destinedPosY = obj.body.position.y-12-obj.boomerang.maxDistance;
                obj.boomerang.going = "Up";
            }
            else if(zelda.LinkObject.lookingLeft){                    
                obj.boomerang.frame = 0;
                obj.boomerang.reset(obj.position.x-11,obj.position.y+2);
                obj.boomerang.destinedPosX = obj.body.position.x-11 -obj.boomerang.maxDistance;
                obj.boomerang.destinedPosY = obj.body.position.y+2;
                obj.boomerang.going = "Left";

                }
            
            else{
                obj.boomerang.frame = 0;
                obj.boomerang.reset(obj.position.x+11,obj.position.y+2);
                obj.boomerang.destinedPosX = obj.body.position.x+22 +obj.boomerang.maxDistance;
                obj.boomerang.destinedPosY = obj.body.position.y+2;
                obj.boomerang.going = "Right";
            }
        obj.boomerang.Alive = true;
        obj.boomerang.animations.play("Roll");
        obj.boomerang.returning = false;
        obj.boomerang.body.velocity.x = (obj.boomerang.destinedPosX - obj.boomerang.body.position.x);
        obj.boomerang.body.velocity.y = (obj.boomerang.destinedPosY - obj.boomerang.body.position.y);
            
            
                        var magnitude = (obj.boomerang.body.velocity.x) * (obj.boomerang.body.velocity.x) + (obj.boomerang.body.velocity.y)* (obj.boomerang.body.velocity.y);
                        
                        magnitude = Math.sqrt(magnitude);
            
                obj.boomerang.body.velocity.x = obj.boomerang.body.velocity.x /magnitude * 100;
                obj.boomerang.body.velocity.y = obj.boomerang.body.velocity.y /magnitude * 100;


        }else{


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
    
    zelda.LinkPrefab.NotInvicible = function(){
        zelda.LinkObject.invincible = false;
        zelda.LinkObject.calledNotInvincible = false;

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
