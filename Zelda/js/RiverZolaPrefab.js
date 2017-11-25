var zelda = zelda || {};

zelda.RiverZolaPrefab = function(game,x,y,level,zone,posInArray){
    this.posInArray = posInArray
    this.currentZone=zone;
    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"RiverZola");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.level = level;
    this.animations.add("moveUnderWater", [0,1], 200, false);
    this.emerged = false;
    this.emerging = false;
    this.calledEmerge = true;
    this.calledSubmerge = false;
    this.calledEmerging = false;
	this.game.physics.arcade.enable(this);
    this.wasPaused = false;

    this.projectile = game.add.sprite(this.body.position.x,this.body.position.y,"riverZolaProjectile");
	this.projectile.anchor.setTo(0.5);
	this.projectile.scale.setTo(1);
    this.projectile.Alive = false;
    this.projectile.level = this.level;
    this.projectile.animations.add("Spawn",[0,1],5,true);
    this.projectile.animations.add("Go",[1,2,3],5,true);
    this.projectile.previousVelocityX=0;
    this.projectile.previousVelocityY=0;
    this.projectile.futureSpeed = {
     x,
        y
    };
    
    this.game.physics.arcade.enable(this.projectile);
    this.projectile.kill();
};

zelda.RiverZolaPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.RiverZolaPrefab.prototype.constructor = zelda.RiverZolaPrefab;




zelda.RiverZolaPrefab.prototype.update = function(){
    if(!zelda.Inventory.InvON&&!zelda.Inventory.ScrollingInventory){
        
        
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

        }
        if(this.Alive){

                if(this.wasPaused){
                this.wasPaused = false;
                
                if(this.projectile.Alive){
                    this.projectile.body.velocity.x = this.projectile.previousVelocityX;
                    this.projectile.body.velocity.y = this.projectile.previousVelocityY;
                    console.log(this.projectile.previousVelocityX);
                                        console.log(this.projectile.previousVelocityY);

                }
            }
            
            this.game.physics.arcade.collide(this,this.level.obstacles);
            this.game.physics.arcade.collide(this,this.level.ground);

                this.game.physics.arcade.overlap(this,this.level.cameraRight,function(npc, a){
                npc.body.velocity.x = -npc.body.velocity.x;
                npc.body.position.x = npc.level.cameraRight.body.position.x-20;

                });
                this.game.physics.arcade.overlap(this,this.level.cameraLeft,function(npc, a){
                npc.body.velocity.x = -npc.body.velocity.x;
                npc.body.position.x = npc.level.cameraLeft.body.position.x+20;
                });
                this.game.physics.arcade.overlap(this,this.level.cameraTop,function(npc, a){
                npc.body.velocity.y = -npc.body.velocity.y;
                    npc.body.position.y = npc.level.cameraTop.body.position.y+20;
                });
                this.game.physics.arcade.overlap(this,this.level.cameraBot,function(npc, a){
                npc.body.velocity.y = -npc.body.velocity.y;
                    npc.body.position.y = npc.level.cameraBot.body.position.y-20;
                    console.log("BRUHBOT");
                });



            if(this.emerged){
                if(!this.calledSubmerge){
                    this.calledSubmerge = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 2,zelda.RiverZolaPrefab.Submerge, this.level,this);
                }

                //console.log(this.calledSubmerge);

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



                if(!this.projectile.Alive&&this.Alive){
                    this.randomNumber = zelda.randomDataGen.between(0,4000);
                    if(this.randomNumber<20){

                        var pollsaEnVinagre = {
                            x: 0,
                            y: 0
                        };
                        console.log(this.level.linkInstance.position.x);
                        console.log(this.body.position.x);
                        pollsaEnVinagre.x = this.level.linkInstance.position.x - this.body.position.x;
                        pollsaEnVinagre.y = this.level.linkInstance.position.y - this.body.position.y;

                        zelda.AIMethods.CreateProjectile(this,(pollsaEnVinagre));
                        //this.projectile.futureSpeed.x = this.projectile.body.velocity.x;
                        //this.projectile.futureSpeed.y = this.projectile.body.velocity.y;
                        console.log(this.projectile);

                        //this.projectile.body.velocity.setTo(0);
                        //this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.RiverZolaPrefab.MoveProjectile, this.level,this);
                        //this.projectile.animations.play("Spawn");
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
                          //  console.log(npc.lives);
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
                    }


                if(this.level.linkInstance.projectile.Alive){
                        this.game.physics.arcade.overlap(this,this.level.linkInstance.projectile,function(npc,projectile){
                            if(!npc.hurt)
                            npc.lives--;
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

            }else if(this.emerging){
                this.animations.play("moveUnderWater");
                if(!this.calledEmerge){
                    this.calledEmerge = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.RiverZolaPrefab.Emerge, this.level,this);    
                    this.body.velocity.setTo(0);
                }else{
                    this.body.velocity.setTo(0);
                }
              //  console.log(this.body.velocity.x);
               // console.log("Emerging");
            }else{
                this.frame = 4;
                this.body.velocity.x = zelda.randomDataGen.between(-300,300);
                this.body.velocity.y = zelda.randomDataGen.between(-300,300);

                if(!this.calledEmerging){
                this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.RiverZolaPrefab.Emerging, this.level,this);    
                this.calledEmerging = true;
                }

                //this.emerging = true;
              //  console.log("Se mueve");
                this.calledSubmerge = false;
                this.calledEmerge = false;
            }

        }else{
            this.frame = 4;
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
    
zelda.RiverZolaPrefab.Emerging = function(obj){
    obj.emerging = true;
   // console.log("emerging");
    obj.calledSubmerge = false;
    obj.calledEmerge = false;

}


zelda.RiverZolaPrefab.Emerge = function(obj){
    obj.emerged = true;
    if(obj.level.linkInstance.body.position.y<obj.body.position.y)
    obj.frame = 3
    
    else{
        obj.frame = 2;
    }
    
   // console.log("emerged");
    obj.calledSubmerge = false;
    obj.calledEmerging = false;
}

zelda.RiverZolaPrefab.Submerge= function(obj){
    obj.emerged = false;
    obj.emerging = false;
    obj.frame = 4;
    obj.calledEmerge = false;
        obj.calledEmerging = false;

}

zelda.RiverZolaPrefab.MoveProjectile = function(obj){
    obj.projectile.body.velocity.x = obj.projectile.futureSpeed.x;
    obj.projectile.body.velocity.y = obj.projectile.futureSpeed.y;
    console.log(obj.projectile.body);
    
    obj.projectile.animations.play("Go");
}



