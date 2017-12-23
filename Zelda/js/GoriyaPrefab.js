var zelda = zelda || {};

zelda.GoriyaPrefab = function(game,x,y,type,level,initSpeed,zone,posInArray){
    this.posInArray = posInArray
    this.currentDungeonZone =zone;
    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Goriya");    
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


        this.lives = 3;
    

        this.animations.add("movingLeft", [0,1], 12, true);
        this.animations.add("movingDown", [2,3], 12, true);
        this.animations.add("movingRight", [4,5],12,true);
        this.animations.add("movingUp", [6,7], 12, true);
    
    this.animations.add("Spawn",[8,9,10],15,false);

    this.level = level;

    
	this.game.physics.arcade.enable(this);
    this.hurtBySword = false;

    
    //console.log(this.animations);
    
    this.previousVelocity = this.body.velocity;

    
    this.projectile = game.add.sprite(this.body.position.x,this.body.position.y,"Boomerang");
    this.projectile.animations.add("Roll",[0,1,2,3,4,5,6,7],15,true);
    this.projectile.returning = false;
    this.projectile.previousVelocityX=0;
    this.projectile.previousVelocityY=0;
	this.projectile.anchor.setTo(0.5);
	this.projectile.scale.setTo(1);
    this.projectile.Alive = false;
    this.projectile.level = this.level;
    this.projectile.wasPaused = false;
    this.game.physics.arcade.enable(this.projectile);
    this.projectile.kill();
};

zelda.GoriyaPrefab.Respawn = function (obj){

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

zelda.GoriyaPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.GoriyaPrefab.prototype.constructor = zelda.GoriyaPrefab;



zelda.GoriyaPrefab.prototype.update = function(){
        
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
            if(this.lives==0&&this.Alive){
                zelda.AIMethods.Die(this);
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

                if(this.body.velocity.x>0){
                        this.animations.play("movingRight");
                }else if(this.body.velocity.x<0){
                        this.animations.play("movingLeft");
                }else if(this.body.velocity.y<0){
                        this.animations.play("movingUp");
                }else if(this.body.velocity.y>0){
                        this.animations.play("movingDown");
                }

                if(!this.projectile.Alive&&this.Alive){
                    this.randomNumber = zelda.randomDataGen.between(0,4000);
                    if(this.randomNumber<20){
                        zelda.AIMethods.CreateProjectile(this,this.body.velocity);
                        this.projectile.returning = false;
                        this.projectile.animations.play("Roll");
                        console.log("ShouldRoll");
                    }
                }

                this.game.physics.arcade.overlap(this.projectile,this.level.linkInstance,function(projectile,linkInstance){
                    if(!zelda.LinkObject.hurt&&!zelda.LinkObject.invincible){
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
                            
                            if(npc.lives==0){
                                //npc.kill();
                                //npc.Alive = false;

                                zelda.AIMethods.Die(npc);

                            }
                            
                            if(!npc.hurt){
                                npc.lives--;
                                npc.hurtSound.play();
                            }
                            else{
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


