var zelda = zelda || {};

zelda.KeesePrefab = function(game,x,y,type,level,initSpeed,zone,posInArray){
    this.posInArray = posInArray
    this.currentDungeonZone=zone;
    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Keese");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.wasPaused = false;
    this.hurtBySword = false;
    this.maxVelocity = 25;
    this.firstFewFrames = false;
            this.hurtSound = this.game.add.audio("EnemyHurt");

        this.animations.add("Move", [0,1], 10, true);
        this.animations.add("MoveSlow",[0,1],5,true);
        this.animations.add("Spawn",[2,3,4],15,false);
    
    this.lives = 3;
    this.level = level;
    
    this.spawned  = false;
    this.calledSpawn = false;
    
	this.game.physics.arcade.enable(this);

    this.initialSpeed = initSpeed;
    
    
    //console.log(this.animations);
    
    this.previousVelocity = this.body.velocity;

};

    zelda.KeesePrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity = obj.previousVelocity;
    }

zelda.KeesePrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.KeesePrefab.prototype.constructor = zelda.KeesePrefab;

zelda.KeesePrefab.Respawn = function (obj){

    obj.lives = 3;
    obj.hurt = false;
    obj.calledNotHurt = true;
    obj.Alive = true;
    obj.spawned  = false;
    obj.calledSpawn = false;
    obj.previousVelocity = obj.body.velocity;

}


zelda.KeesePrefab.prototype.update = function(){
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

                if(this.firstFewFrames)
                this.animations.play("Move");

                else{
                    this.animations.play("MoveSlow");
                    this.game.time.events.add(Phaser.Timer.SECOND * 1.2,zelda.KeesePrefab.MoveFaster, this.level,this);

                }

                if(this.body.velocity.x==0&&this.body.velocity.y==0){
                    zelda.AIMethods.changeDir(this,4,true);
                }



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

                            zelda.AIMethods.changeDir(this,zelda.randomDataGen.between(0,3),true);

                            console.log("CHange");
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

                    if(this.body.velocity.x>0){
                        this.animations.play("movingRight");
                    }else if(this.body.velocity.x<0){
                        this.animations.play("movingLeft");
                    }else if(this.body.velocity.y<0){
                        this.animations.play("movingUp");
                    }else if(this.body.velocity.y>0){
                        this.animations.play("movingDown");
                    }


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
                        this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.KeesePrefab.NotHurt, this.level,this);
                    }
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
    }
    else{
        zelda.AIMethods.Spawning(this,true);
    }
}
zelda.KeesePrefab.MoveFaster = function(obj){
    obj.firstFewFrames = true;
}

