var zelda = zelda || {};

zelda.TektitePrefab = function(game,x,y,type,level,offsetMax,zone,posInArray){
    this.posInArray = posInArray
    this.currentZone=zone;

    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Tektite");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.maxOffset = offsetMax;
    this.jumping = false;
    this.calledStopJumping = false;
    this.wasPaused = false;
    this.hurtBySword = false;
            this.hurtSound = this.game.add.audio("EnemyHurt");

    this.maxVelocity = {
     x,
        y
    };
    if(this.type==0){
        this.lives = 1;
        }
    else{

        this.lives = 3;
    }
    
    this.animations.add("Spawn",[4,5,6],15,false);

        this.animations.add("UpDownNaranja", [2,3], 5, true);
        this.animations.add("UpDownAzul", [0,1], 5, true);

    this.level = level;
	this.game.physics.arcade.enable(this);
    
    //this.posToJump = this.body.position;
    this.posToJump = {
    x,
    y
    };
    
    this.spawned  = false;
    this.calledSpawn = false;
    
};

    zelda.TektitePrefab.StopJumping = function(obj){
        obj.jumping = false;
    }

    zelda.TektitePrefab.CalculateRandomPos = function(obj){

            
        var randomMov = zelda.randomDataGen.between(15,obj.maxOffset);
            
            var randomNum = zelda.randomDataGen.between(0,100);
                    

        if(randomNum>50){
                obj.posToJump.x+=randomMov;
        }else{
                obj.posToJump.x-=randomMov;
        }
        
        if(randomNum%2==0){
            obj.posToJump.y+=randomMov;
        }else{
            obj.posToJump.y-=randomMov;
        }
            
            
            if(obj.posToJump.x>obj.level.cameraRight.body.position.x-16){
                obj.posToJump.x = obj.level.cameraBot.body.position.x-32;
            }if(obj.posToJump.x<obj.level.cameraLeft.body.position.x+16){
                obj.posToJump.x = obj.level.cameraBot.body.position.x+32;
            }
            
            if(obj.posToJump.y<obj.level.cameraTop.body.position.y+32){
                obj.posToJump.y = obj.level.cameraBot.body.position.y+64;
                
            }if(obj.posToJump.y>obj.level.cameraBot.body.position.y-32){
                obj.posToJump.y = obj.level.cameraBot.body.position.y-64;
            }
        


        
    }

    zelda.TektitePrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity.x=0;
        obj.body.velocity.y=0;
    }

zelda.TektitePrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.TektitePrefab.prototype.constructor = zelda.TektitePrefab;

zelda.TektitePrefab.prototype.update = function(){
    if(this.spawned){
        if(this.Alive){     
            if(this.lives==0){
                zelda.AIMethods.Die(this);
            }

            if(!zelda.Inventory.ScrollingInventory&&!zelda.Inventory.InvON){

                if(this.wasPaused){
                    this.wasPaused = false;

                    this.body.velocity = this.prevVelocity;
                }
            
                if(!this.hurt){



                    this.game.physics.arcade.overlap(this,this.level.linkInstance,
                    function(enemy,linkInstance){
                        if(!zelda.LinkObject.hurt&&!zelda.LinkObject.invincible){
                            zelda.LinkObject.hurt = true;
                            zelda.LinkObject.moveFromDmg=true;
                            zelda.LinkObject.calledNotMoveFromDamage=false;
                            zelda.LinkObject.currentHearts-=0.5;
                            if(enemy.body.velocity.y>0)
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Down");
                            else if(enemy.body.velocity.y<0)
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Up");
                            else if(enemy.body.velocity.x>0)
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Right");
                            else 
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Left");
                        }
                    } );


                    if(this.body.velocity.x==0&&this.body.velocity.y==0){
                        if(this.type==0)
                            this.animations.play("UpDownNaranja");
                        else this.animations.play("UpDownAzul");
                    }

                    if(this.level.linkInstance.sword.Alive&&!this.hurtBySword){
                            this.game.physics.arcade.overlap(this,this.level.linkInstance.sword,function(npc,linkSword){
                                if(!npc.hurt){
                                    npc.lives--;
                                    npc.hurtSound.play();
                                }
                                if(npc.lives==0){
                                   //npc.kill();
                                //npc.Alive = false;

                                zelda.AIMethods.Die(npc);
                                }else{
                                    npc.previousVelocity = npc.body.velocity;
                                    npc.hurt = true;
                                    npc.calledNotHurt = false;
                                    var whereTo = "Right";

                                    if(zelda.LinkObject.lookingDown){
                                        whereTo="Down";
                                    }else if(zelda.LinkObject.lookingLeft){
                                        whereTo="Left";
                                    }else if(zelda.LinkObject.lookingUp){
                                        whereTo="Up";
                                    }
                                    npc.previousVelocity = npc.body.velocity;
                                    //zelda.AIMethods.GetHurt(npc,whereTo);
                                    npc.body.velocity.setTo(0);
                                }
                            });
                        }else{
                        this.hurtBySword = false;
                    }


                    if(this.level.linkInstance.projectile.Alive){
                            this.game.physics.arcade.overlap(this,this.level.linkInstance.projectile,function(npc,projectile){
                            npc.level.linkInstance.projectile.kill();
                            npc.level.linkInstance.projectile.Alive = false;
                                if(!npc.hurt){
                                    npc.lives--;
                                    npc.hurtSound.play();
                                }
                                if(npc.lives==0){
                                //npc.kill();
                                //npc.Alive = false;

                                zelda.AIMethods.Die(npc);
                                }else{
                                        npc.previousVelocity = npc.body.velocity;
                                    npc.hurt = true;
                                    npc.calledNotHurt = false;

                                    var whereTo = "Right";

                                    if(projectile.body.velocity.x<0){
                                        whereTo = "Left";
                                    }else if(projectile.body.velocity.y<0){
                                        whereTo = "Up";
                                    }                       
                                    else if(projectile.body.velocity.y>0){
                                        whereTo = "Down";
                                    }


                                    npc.previousVelocity = npc.body.velocity;
                                    zelda.AIMethods.GetHurt(npc,whereTo);
                                }
                            });
                    }
                    
                                    
                if(this.level.linkInstance.boomerang.Alive){
                        if(!this.level.linkInstance.boomerang.returning){
                        this.game.physics.arcade.overlap(this,this.level.linkInstance.boomerang,function(npc,projectile){
                            projectile.returning =  true;

                            if(!npc.hurt){
                            npc.lives--;
                            console.log(npc.lives);
                                npc.hurtSound.play();

                            }
                            if(npc.lives==0){
                                //npc.kill();
                                //npc.Alive = false;

                                zelda.AIMethods.Die(npc);
                                console.log(zelda.enemySpawns.zones[npc.currentZone]);
                            }else{
                                    npc.previousVelocity = npc.body.velocity;
                                npc.hurt = true;
                                npc.calledNotHurt = false;

                                var whereTo = "Right";

                                if(projectile.body.velocity.x<0){
                                    whereTo = "Left";
                                }else if(projectile.body.velocity.y<0){
                                    whereTo = "Up";
                                }                       
                                else if(projectile.body.velocity.y>0){
                                    whereTo = "Down";
                                }


                                npc.previousVelocity = npc.body.velocity;
                                zelda.AIMethods.GetHurt(npc,whereTo);
                            }
                        });
                    }
                }

                    if(!this.jumping){
                        this.animations.play("UpDown");
                        var chanceToJump = zelda.randomDataGen.between(0,100);
                        if(chanceToJump<2){
                            this.jumping = true;
                            zelda.TektitePrefab.CalculateRandomPos(this);

                            this.maxVelocity.x = (this.posToJump.x - this.body.position.x)/16;
                            this.maxVelocity.y = (this.posToJump.y - this.body.position.y)/16;
                            this.calledStopJumping = false;
                        }


                    }else{

                        if(!this.calledStopJumping){
                            this.calledStopJumping = true;
                            this.game.time.events.add(Phaser.Timer.SECOND * 0.3,zelda.TektitePrefab.StopJumping, this.level,this);

                        }

                        if(this.type==0){
                            this.frame = 3;
                        }else{
                            this.frame = 1;
                        }

                        this.body.position.x +=  this.maxVelocity.x;
                        this.body.position.y +=  this.maxVelocity.y;          

                        if(this.body.position.x == this.posToJump.x&&this.body.position.y == this.posToJump.y){
                            this.jumping = false;
                        }
                    }


                    }
                else{
                    if(!this.calledNotHurt){
                        this.calledNotHurt = true;
                        this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.TektitePrefab.NotHurt, this.level,this);
                    }
                }

                this.game.physics.arcade.overlap(this,this.level.cameraRight,function(npc, a){
                //npc.body.velocity.x = -npc.body.velocity.x;
                    npc.posToJump.x = npc.position.x;
                    npc.posToJump.y = npc.position.y;
                    console.log("DoingShit");
                    //npc.jumping=false;

                });
                this.game.physics.arcade.overlap(this,this.level.cameraLeft,function(npc, a){
                //npc.body.velocity.x = -npc.body.velocity.x;
                    npc.posToJump.x = npc.position.x;
                    npc.posToJump.y = npc.position.y;
                    console.log("DoingShit");

                });
                this.game.physics.arcade.overlap(this,this.level.cameraTop,function(npc, a){
                //npc.body.velocity.y = -npc.body.velocity.y;
                    npc.posToJump.x = npc.position.x;
                    npc.posToJump.y = npc.position.y;
                    console.log("DoingShit");

                });
                this.game.physics.arcade.overlap(this,this.level.cameraBot,function(npc, a){
                //npc.body.velocity.y = -npc.body.velocity.y;
                    npc.posToJump.x = npc.position.x;
                    npc.posToJump.y = npc.position.y;
                    console.log("DoingShit");

                });
                
        }else{
                if(!this.wasPaused){
                    this.wasPaused = true;
                    this.prevVelocity = this.body.velocity;
                    this.body.velocity.setTo(0);
                    this.animations.stop();
                }
            }
                
            }

        }else{
            zelda.AIMethods.Spawning(this,false);
        }
    }


