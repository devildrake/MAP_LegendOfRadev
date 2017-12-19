var zelda = zelda || {};

zelda.GelPrefab = function(game,x,y,type,level,initSpeed,zone,posInArray){
    this.posInArray = posInArray
    this.currentDungeonZone=zone;
    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Gel");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.maxVelocity = 30;
    this.wasPaused = false;
    this.hurtBySword = false;   
    this.mustMove = false;
    
        this.hurtSound = this.game.add.audio("EnemyHurt");
        this.animations.add("Move", [0,1], 5, true);

    
    if(type==0)
        this.lives = 1;
    else this.lives = 1;
    
    
    
        this.animations.add("Spawn",[2,3,4],15,false);

    this.level = level;

    
	this.game.physics.arcade.enable(this);

    this.spawned  = false;
    this.calledSpawn = false;
    this.initialSpeed = initSpeed;
    
    this.previousVelocity = this.body.velocity;
};

zelda.GelPrefab.Respawn = function (obj){
    if(obj.type==0)
        obj.lives = 1;
    else 
        obj.lives = 3;
    
    obj.Alive = true;
    obj.hurt = false;
    obj.calledNotHurt = true;
    obj.spawned  = false;
    obj.calledSpawn = false;
    obj.previousVelocity = obj.body.velocity;

}

    zelda.GelPrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity = obj.previousVelocity;
    }

zelda.GelPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.GelPrefab.prototype.constructor = zelda.GelPrefab;

zelda.GelPrefab.prototype.update = function(){
    if(!zelda.Inventory.ScrollingInventory&&!zelda.Inventory.InvON){
        if(this.spawned){
            
            if(this.lives==0&&this.Alive){
                zelda.AIMethods.Die(this);
            }
            
            
            
            if(this.wasPaused&&!zelda.Inventory.InvON){
                this.wasPaused = false;
                
                this.body.velocity = this.prevVelocity;

            }

            if(this.body.velocity.x==0&&this.body.velocity.y==0){
                zelda.AIMethods.changeDir(this,4,false);
            }

            this.game.physics.arcade.collide(this,this.level.obstacles);
            this.game.physics.arcade.collide(this,this.level.water);


            if(!this.hurt){
                if(this.prevVelocity.y<0&&this.body.blocked.up){
                    zelda.AIMethods.changeDir(this,0,true);
                }else if(this.prevVelocity.y>0&&this.body.blocked.down){
                        zelda.AIMethods.changeDir(this,1,true);

                }else if(this.prevVelocity.x>0&&this.body.blocked.right){
                        zelda.AIMethods.changeDir(this,2,true);

                }else if(this.prevVelocity.x<0&&this.body.blocked.left){
                        zelda.AIMethods.changeDir(this,3,true);
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





                if(this.level.linkInstance.sword.Alive&&!this.hurtBySword){
                        this.game.physics.arcade.overlap(this,this.level.linkInstance.sword,function(npc,linkSword){
                            if(!npc.hurt)
                            npc.lives--;
                            npc.hurtSound.play();
                            console.log(npc.lives);
                            if(npc.lives==0){
                                npc.kill();
                                npc.Alive = false;
                                //zelda.AIMethods.Die(npc);
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
            else{
                if(!this.calledNotHurt){
                    this.calledNotHurt = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.OktorokPrefab.NotHurt, this.level,this);
                }
            }
            
            if(!this.mustMove){
                this.body.velocity.setTo(0);
                var chancesToMoveAgain = zelda.randomDataGen.between(0,100);
                if(chancesToMoveAgain<5){
                    this.mustMove = true;
                }
                
                
            }else{
                var chancesToStopMoving = zelda.randomDataGen.between(0,100);
                if(chancesToStopMoving<5){
                    this.mustMove = false;
                }
            }
            
            
                if(this.body.velocity.x>0){
                this.frame = 1;

                }else if(this.body.velocity.x<0){
                        this.frame = 1;
                }else if(this.body.velocity.y<0){
                        this.frame = 1;
                }else if(this.body.velocity.y>0){
                        this.frame = 1;
                }
                else this.frame = 0;
            
        }else{
            zelda.AIMethods.Spawning(this,true);
        }
    }else{
        if(!this.wasPaused){
            this.wasPaused = true;
            this.prevVelocity = this.body.velocity;
            
            this.body.velocity.setTo(0);
            this.animations.stop();
        }
    }
}


