var zelda = zelda || {};

zelda.AquamentusPrefab = function(game,x,y,type,level,initSpeed,zone,posInArray){
    this.posInArray = posInArray
    this.currentZone=zone;
    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Aquamentus");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.maxVelocity = 50;
    this.wasPaused = false;
    this.spawned  = false;
    this.calledSpawn = false;
    this.initialSpeed = initSpeed;
    this.hurtSound = this.game.add.audio("EnemyHurt");


        this.lives = 6;
    

        this.animations.add("move", [0,1,2,3], 5, true);
    
    this.animations.add("Spawn",[4,5,6],15,false);

    this.level = level;

    
	this.game.physics.arcade.enable(this);
    this.hurtBySword = false;

    
    //console.log(this.animations);
    
    this.previousVelocity = this.body.velocity;

    
    this.projectile = game.add.sprite(this.body.position.x,this.body.position.y,"Boomerang");
    this.projectile.previousVelocityX=0;
    this.projectile.previousVelocityY=0;
	this.projectile.anchor.setTo(0.5);
	this.projectile.scale.setTo(1);
    this.projectile.Alive = false;
    this.projectile.level = this.level;
    this.projectile.wasPaused = false;
    this.game.physics.arcade.enable(this.projectile);
    this.projectile.kill();
    
    this.projectile1 = game.add.sprite(this.body.position.x,this.body.position.y,"Boomerang");
    this.projectile1.previousVelocityX=0;
    this.projectile1.previousVelocityY=0;
	this.projectile1.anchor.setTo(0.5);
	this.projectile1.scale.setTo(1);
    this.projectile1.Alive = false;
    this.projectile1.level = this.level;
    this.projectile.wasPaused = false;
    this.game.physics.arcade.enable(this.projectile1);
    this.projectile1.kill();
    
    this.projectile2 = game.add.sprite(this.body.position.x,this.body.position.y,"Boomerang");
    this.projectile2.previousVelocityX=0;
    this.projectile2.previousVelocityY=0;
	this.projectile2.anchor.setTo(0.5);
	this.projectile2.scale.setTo(1);
    this.projectile2.Alive = false;
    this.projectile2.level = this.level;
    this.projectile2.wasPaused = false;
    this.game.physics.arcade.enable(this.projectile2);
    this.projectile2.kill();
    
    
};

zelda.AquamentusPrefab.Respawn = function (obj){

        obj.lives = 3;
    
    obj.hurt = false;
    obj.calledNotHurt = true;
    obj.Alive = true;
    obj.spawned  = false;
    obj.calledSpawn = false;
    obj.previousVelocity = obj.body.velocity;

}

    zelda.GoriyaPrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity = obj.previousVelocity;
    }

zelda.AquamentusPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.AquamentusPrefab.prototype.constructor = zelda.AquamentusPrefab;



zelda.AquamentusPrefab.prototype.update = function(){
        
    if(this.spawned){
        if(!zelda.Inventory.InvON&&!zelda.Inventory.ScrollingInventory){
            
            if(this.wasPaused){
                this.wasPaused = false;
                
                this.body.velocity = this.prevVelocity;
                if(this.projectile.Alive){
                    this.projectile.body.velocity.x = this.projectile.previousVelocityX;
                    this.projectile.body.velocity.y = this.projectile.previousVelocityY;
                    console.log(this.projectile.previousVelocityX);
                    console.log(this.projectile.previousVelocityY);

                }
            }
            
            
            if(this.body.velocity.x==0&&this.body.velocity.y==0&&!this.projectile.Alive){
                zelda.AIMethods.changeDir(this,4,false);
            }
            this.game.physics.arcade.collide(this,this.level.obstacles);
            this.game.physics.arcade.collide(this,this.level.water);


            if(!this.hurt){
                if(this.prevVelocity.y<0&&this.body.blocked.up){
                    zelda.AIMethods.changeDir(this,0,false);
                }else if(this.prevVelocity.y>0&&this.body.blocked.down){
                        zelda.AIMethods.changeDir(this,1,false);

                }else if(this.prevVelocity.x>0&&this.body.blocked.right){
                        zelda.AIMethods.changeDir(this,2,false);

                }else if(this.prevVelocity.x<0&&this.body.blocked.left){
                        zelda.AIMethods.changeDir(this,3,false);
                }


                if(this.body.velocity.x!=0||this.body.velocity.y!=0){
                    this.prevVelocity.x = this.body.velocity.x;
                    this.prevVelocity.y = this.body.velocity.y;
                }

                var chancesOfChangingDir = zelda.randomDataGen.between(0,200);
                    if(chancesOfChangingDir<2){

                        zelda.AIMethods.changeDir(this,zelda.randomDataGen.between(0,3,false));
                    }


                this.game.physics.arcade.overlap(this,this.level.linkInstance,
                function(enemy,linkInstance){
                    if(!zelda.LinkObject.hurt){
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

                if(this.projectile.Alive){
                    this.body.velocity.setTo(0);
                    var distanceFromOriginX = this.body.position.x - this.projectile.body.position.x;
                    var distanceFromOriginY = this.body.position.y - this.projectile.body.position.y;
                    var distanceFromOrigin = Math.sqrt((distanceFromOriginX*distanceFromOriginX)+(distanceFromOriginY*distanceFromOriginY));
                    console.log(distanceFromOrigin);
                    
                    if(distanceFromOrigin>100&&!this.projectile.returning&&distanceFromOrigin<300){
                        this.projectile.returning= true;
                        this.projectile.body.velocity.x = -this.projectile.body.velocity.x;
                        this.projectile.body.velocity.y = -this.projectile.body.velocity.y;
                    }
                    
                    
                    this.game.physics.arcade.overlap(this.projectile,this.level.cameraBot,function(projectile, a){
                    projectile.Alive = false;
                    projectile.kill();  
                    });

                    this.game.physics.arcade.overlap(this.projectile,this.level.cameraTop,function(projectile, a){
                    projectile.Alive = false;
                    projectile.kill();  
                    });    

                    this.game.physics.arcade.overlap(this.projectile,this.level.cameraLeft,function(projectile, a){
                    projectile.Alive = false;
                    projectile.kill();  
                    });    

                    this.game.physics.arcade.overlap(this.projectile,this.level.cameraRight,function(projectile, a){
                    projectile.Alive = false;
                    projectile.kill();  
                    });
                    
                    if(this.projectile.returning){
                                            
                    this.game.physics.arcade.overlap(this.projectile,this,function(projectile, a){
                    projectile.Alive = false;
                    projectile.kill();  
                    });
                    }

                    if(this.projectile.body.velocity.x==0&&this.projectile.body.velocity.y==0){
                        this.projectile.Alive = false;
                        this.projectile.kill();
                    }
                }
                this.game.physics.arcade.overlap(this,this.level.cameraRight,function(npc, a){
                npc.body.velocity.x = -npc.body.velocity.x;

                });
                this.game.physics.arcade.overlap(this,this.level.cameraLeft,function(npc, a){
                npc.body.velocity.x = -npc.body.velocity.x;

                });
                this.game.physics.arcade.overlap(this,this.level.cameraTop,function(npc, a){
                npc.body.velocity.y = -npc.body.velocity.y;

                });
                this.game.physics.arcade.overlap(this,this.level.cameraBot,function(npc, a){
                npc.body.velocity.y = -npc.body.velocity.y;

                });

                this.animations.play("move");

                this.game.physics.arcade.overlap(this.projectile,this.level.linkInstance,function(projectile,linkInstance){
                    if(!zelda.LinkObject.hurt){
                        if(linkInstance.LinkCollider.body.velocity.x!=0||linkInstance.LinkCollider.body.velocity.y!=0){
                            zelda.LinkObject.hurt = true;
                            zelda.LinkObject.moveFromDmg=true;
                            zelda.LinkObject.calledNotMoveFromDamage=false;
                            if(projectile.body.velocity.x>0){
                                 zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Right");   
                            }else if(projectile.body.velocity.x<0){
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Left");   

                            }else if(projectile.body.velocity.y>0){
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Down");   

                            }else if(projectile.body.velocity.y<0){
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Up");   

                            }
                        }else if(linkInstance.LinkCollider.body.velocity.x==0&&linkInstance.LinkCollider.body.velocity.y==0){
                            if(projectile.body.velocity.x>0){
                                if(!zelda.LinkObject.lookingLeft){
                                 zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Right"); 
                                zelda.LinkObject.hurt = true;
                                zelda.LinkObject.moveFromDmg=true;
                                zelda.LinkObject.calledNotMoveFromDamage=false;

                                }else{
                                    zelda.LinkPrefab.blockSound.play();

                                }
                            }else if(projectile.body.velocity.x<0){
                                if(!zelda.LinkObject.lookingRight){
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Left");  
                                zelda.LinkObject.hurt = true;
                                zelda.LinkObject.moveFromDmg=true;
                                zelda.LinkObject.calledNotMoveFromDamage=false;

                                }else{
                                    zelda.LinkPrefab.blockSound.play();

                                }
                            }else if(projectile.body.velocity.y>0){
                                if(!zelda.LinkObject.lookingUp){
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Down");
                                zelda.LinkObject.hurt = true;
                                zelda.LinkObject.moveFromDmg=true;
                                zelda.LinkObject.calledNotMoveFromDamage=false;

                                }else{
                                    zelda.LinkPrefab.blockSound.play();

                                }
                            }else if(projectile.body.velocity.y<0){
                                if(!zelda.LinkObject.lookingDown){
                                zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Up");
                                zelda.LinkObject.hurt = true;
                                zelda.LinkObject.moveFromDmg=true;
                                zelda.LinkObject.calledNotMoveFromDamage=false;
                                }else{
                                    zelda.LinkPrefab.blockSound.play();

                                }
                            }
                        }
                    }

                    projectile.Alive = false;
                    projectile.kill();

                });

                if(this.level.linkInstance.sword.Alive&&!this.hurtBySword){
                        this.game.physics.arcade.overlap(this,this.level.linkInstance.sword,function(npc,linkSword){
                            if(!npc.hurt){
                                npc.lives--;
                                npc.hurtSound.play();
                            }
                            console.log(npc.lives);
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
                                zelda.AIMethods.GetHurt(npc,whereTo);
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
                            console.log(npc.lives);
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

                }
            else{
                if(!this.calledNotHurt){
                    this.calledNotHurt = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.GoriyaPrefab.NotHurt, this.level,this);
                }
            }
        }else{
            if(!this.wasPaused){
                this.wasPaused = true;
                this.projectile.previousVelocityX = this.projectile.body.velocity.x; 
                this.projectile.previousVelocityY = this.projectile.body.velocity.y; 
                console.log(this.projectile.body.velocity.x);
                console.log(this.projectile.body.velocity.y);

                this.projectile.body.velocity.setTo(0);
                this.prevVelocity = this.body.velocity;

                this.body.velocity.setTo(0);
                this.animations.stop();
            }
        }
    }
    else{
        zelda.AIMethods.Spawning(this,true);
    }
    
}


