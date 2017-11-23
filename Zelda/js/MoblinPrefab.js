var zelda = zelda || {};

zelda.MoblinPrefab = function(game,x,y,type,level,initSpeed){

    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Moblin");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.maxVelocity = 50;
    
    this.spawned  = false;
    this.calledSpawn = false;
    this.initialSpeed = initSpeed;
    
    if(this.type==0){
        this.lives = 1;
        }
    else{
        this.lives = 3;
    }

        this.animations.add("movingLeftNaranja", [0,1], 5, true);
        this.animations.add("movingDownNaranja", [2,3], 5, true);
        this.animations.add("movingRightNaranja", [4,5],5,true);
        this.animations.add("movingUpNaranja", [6,7], 5, true);
        
        this.animations.add("movingLeftAzul", [8,9], 5, true);
        this.animations.add("movingDownAzul", [10,11], 5, true);
        this.animations.add("movingRightAzul", [12,13],5,true);
        this.animations.add("movingUpAzul", [14,15], 5, true);
    
    this.animations.add("Spawn",[16,17,18],15,false);

    this.level = level;

    
	this.game.physics.arcade.enable(this);


    
    //console.log(this.animations);
    
    this.previousVelocity = this.body.velocity;

    
    this.projectile = game.add.sprite(this.body.position.x,this.body.position.y,"Arrow");
	this.projectile.anchor.setTo(0.5);
	this.projectile.scale.setTo(1);
    this.projectile.Alive = false;
    this.projectile.level = this.level;
    this.game.physics.arcade.enable(this.projectile);
    this.projectile.kill();
};

zelda.MoblinPrefab.Respawn = function (obj){
    if(obj.type==0)
        obj.lives = 1;
    else 
        obj.lives = 3;
    
    obj.hurt = false;
    obj.calledNotHurt = true;
    obj.Alive = true;
    obj.spawned  = false;
    obj.calledSpawn = false;
    obj.previousVelocity = obj.body.velocity;

}

    zelda.MoblinPrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity = obj.previousVelocity;
    }

zelda.MoblinPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.MoblinPrefab.prototype.constructor = zelda.MoblinPrefab;



zelda.MoblinPrefab.prototype.update = function(){
        
    if(this.spawned){

        if(this.body.velocity.x==0&&this.body.velocity.y==0){
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
            } );

            if(this.projectile.Alive){
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
                if(this.type==0)
                    this.animations.play("movingRightNaranja");
                else 
                    this.animations.play("movingRightAzul");
            }else if(this.body.velocity.x<0){
                if(this.type==0)
                    this.animations.play("movingLeftNaranja");
                else 
                    this.animations.play("movingLefttAzul");
            }else if(this.body.velocity.y<0){
                if(this.type==0)
                    this.animations.play("movingUpNaranja");
                else 
                    this.animations.play("movingUpAzul");
            }else if(this.body.velocity.y>0){
                if(this.type==0)
                    this.animations.play("movingDownNaranja");
                else 
                    this.animations.play("movingDownAzul");
            }

            if(!this.projectile.Alive&&this.Alive){
                this.randomNumber = zelda.randomDataGen.between(0,4000);
                if(this.randomNumber<20){
                    zelda.AIMethods.CreateProjectile(this,this.body.velocity);
                    if(this.body.velocity.x>0)
                        this.projectile.frame = 2;
                    else if(this.body.velocity.x<0)
                        this.projectile.frame = 0;
                    else if(this.body.velocity.y>0)
                        this.projectile.frame = 1;
                    else this.projectile.frame = 3;
                }
            }

            this.game.physics.arcade.overlap(this.projectile,this.level.linkInstance,function(projectile,linkInstance){
                if(!zelda.LinkObject.hurt){
                    if(linkInstance.body.velocity.x!=0||linkInstance.body.velocity.y!=0){
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
                    }else if(linkInstance.body.velocity.x==0&&linkInstance.body.velocity.y==0){
                        if(projectile.body.velocity.x>0){
                            if(!zelda.LinkObject.lookingLeft){
                             zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Right"); 
                            zelda.LinkObject.hurt = true;
                            zelda.LinkObject.moveFromDmg=true;
                            zelda.LinkObject.calledNotMoveFromDamage=false;

                            }
                        }else if(projectile.body.velocity.x<0){
                            if(!zelda.LinkObject.lookingRight){
                            zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Left");  
                            zelda.LinkObject.hurt = true;
                            zelda.LinkObject.moveFromDmg=true;
                            zelda.LinkObject.calledNotMoveFromDamage=false;

                            }
                        }else if(projectile.body.velocity.y>0){
                            if(!zelda.LinkObject.lookingUp){
                            zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Down");
                            zelda.LinkObject.hurt = true;
                            zelda.LinkObject.moveFromDmg=true;
                            zelda.LinkObject.calledNotMoveFromDamage=false;

                            }
                        }else if(projectile.body.velocity.y<0){
                            if(!zelda.LinkObject.lookingDown){
                            zelda.AIMethods.GetHurt(linkInstance.LinkCollider,"Up");
                            zelda.LinkObject.hurt = true;
                            zelda.LinkObject.moveFromDmg=true;
                            zelda.LinkObject.calledNotMoveFromDamage=false;
                            }
                        }
                    }
                }

                projectile.Alive = false;
                projectile.kill();

            });

            if(this.level.linkInstance.sword.Alive){
                    this.game.physics.arcade.overlap(this,this.level.linkInstance.sword,function(npc,linkSword){
                        if(!npc.hurt)
                        npc.lives--;
                        console.log(npc.lives);
                        if(npc.lives==0){
                            npc.kill();
                            npc.Alive = false;
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
                }


            if(this.level.linkInstance.projectile.Alive){
                    this.game.physics.arcade.overlap(this,this.level.linkInstance.projectile,function(npc,projectile){
                        npc.level.linkInstance.projectile.kill();
                        npc.level.linkInstance.projectile.Alive = false;
                        
                        if(!npc.hurt)
                        npc.lives--;
                        console.log(npc.lives);
                        if(npc.lives==0){
                            npc.kill();
                            npc.Alive = false;
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
                this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.MoblinPrefab.NotHurt, this.level,this);
            }
        }

    }else{
        zelda.AIMethods.Spawning(this,true);
    }
    
}


