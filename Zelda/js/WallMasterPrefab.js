var zelda = zelda || {};

//initSpeed es el 6o parametro y va en este orden de 0 a 3 Right Left Up Down
zelda.WallMasterPrefab = function(game,x,y,type,level,initSpeed,zone,posInArray){
    this.posInArray = posInArray
    this.currentZone=zone;
    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"WallMaster");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.wasPaused = false;
    this.hurtBySword = false;
    this.maxVelocity = 25;
    this.hurtSound = this.game.add.audio("EnemyHurt");

    this.animations.add("Move", [0,1], 10, true);
    this.lives = 3;
    this.level = level;
    
    this.spawned  = false;
    this.calledSpawn = false;
    
	this.game.physics.arcade.enable(this);

    this.initialSpeed = initSpeed;
    
    this.isFree = false;
    this.posToGoX = x;
    this.posToGoY = y;
    
    switch(this.initialSpeed){
        case 0:
            //this.body.velocity.x = this.maxVelocity;
            this.posToGoX += 32;
            console.log(this.position.x);
            console.log(this.posToGoX);
            this.going = "Right";
            break;
        case 1:
            //this.body.velocity.x = -this.maxVelocity;
            this.posToGoX -=32;
            console.log(this.posToGoX);

            this.going = "Left";

            break;
        case 2:
            //this.body.velocity.y = -this.maxVelocity;
            this.posToGoY -=32;
            this.going = "Up";
            break;
        case 3:
            //this.body.velocity.y = this.maxVelocity;
            this.posToGoY +=32;
            this.going = "Down";
            break;
        default:
            break;
    }
    
    
    //console.log(this.animations);
    this.previousVelocity = this.body.velocity;

};

    zelda.WallMasterPrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity = obj.previousVelocity;
    }

zelda.WallMasterPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.WallMasterPrefab.prototype.constructor = zelda.WallMasterPrefab;



zelda.WallMasterPrefab.prototype.update = function(){
        if(this.Alive){

            if(this.lives==0)
                zelda.AIMethods.Die(this);
            
            if(!zelda.Inventory.ScrollingInventory&&!zelda.Inventory.InvON){
                
                if(this.isFree){
                    if(this.wasPaused){
                        this.wasPaused = false;

                        this.body.velocity = this.prevVelocity;
                    }

                    this.animations.play("Move");



                    if(this.body.velocity.x==0&&this.body.velocity.y==0&&!this.hurtBySword){
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

                            }


                        this.game.physics.arcade.overlap(this,this.level.linkInstance,
                        function(enemy,linkInstance){
                            if(!zelda.LinkObject.hurt&&!zelda.LinkObject.invincible){
                                zelda.LinkObject.hurt = true;
                                zelda.LinkObject.moveFromDmg=true;
                                zelda.LinkObject.calledNotMoveFromDamage=false;
                                zelda.game.state.start("dungeon");                                
                                
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
                                    if(!npc.hurt){
                                        npc.lives--;
                                        npc.hurtSound.play();
                                    }
                                    console.log(npc.lives);
                                    if(npc.lives==0){

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
                                        npc.body.velocity.setTo(0);
                                        npc.hurtBySword = true;
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
                                    if(npc.lives==0){

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
                            this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.WallMasterPrefab.NotHurt, this.level,this);
                        }
                    }
                }else{
                    //console.log("Not Free");
                    if(this.body.velocity.x==0&&this.body.velocity.y==0){
                        console.log("Trying To set Free and move " + this.going);

                        var chancesToStartMoving = zelda.randomDataGen.between(0,1000);
                        if(chancesToStartMoving==1){
                                switch(this.initialSpeed){
                                    case 0:
                                        this.body.velocity.x = this.maxVelocity;
                                        console.log(this.position.x);
                                        console.log(this.posToGoX);
                                        this.going = "Right";
                                        break;
                                    case 1:
                                        this.body.velocity.x = -this.maxVelocity;
                                        console.log(this.posToGoX);

                                        this.going = "Left";

                                        break;
                                    case 2:
                                        this.body.velocity.y = -this.maxVelocity;
                                        this.going = "Up";
                                        break;
                                    case 3:
                                        this.body.velocity.y = this.maxVelocity;
                                        this.going = "Down";
                                        break;
                                    default:
                                        console.log("Default");
                                        break;
                                }
                        }
                    }else{
                        console.log("Trying to get to " +  this.posToGoX + ", " +this.posToGoY + " from " + this.body.position + " With this speed: " + this.body.velocity);
                        this.animations.play("Move");
                        switch(this.going){
                            case "Right":
                                if(this.body.position.x>=this.posToGoX){
                                    this.isFree=true;
                                }
                                break;
                            case "Left":
                                if(this.body.position.x<=this.posToGoX){
                                    this.isFree=true;
                                }
                                break;
                            case "Up":
                                if(this.body.position.y<=this.posToGoY){
                                    this.isFree=true;
                                }
                                
                                break;
                            case "Down":
                                if(this.body.position.y>=this.posToGoY){
                                    this.isFree=true;
                                }
                                break;
                            default:
                                console.log("Default");
                                break;
                        }
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

