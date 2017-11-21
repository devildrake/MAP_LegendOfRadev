var zelda = zelda || {};

zelda.LeeverPrefab = function(game,x,y,level){

    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Leever");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.level = level;
    this.animations.add("moveUnderGround", [0,1], 200, true);
    this.animations.add("move",[2,3],200,true);
    this.emerged = false;
    this.emerging = false;
    this.calledEmerge = true;
    this.calledEmerging = false;
	this.game.physics.arcade.enable(this);
};

zelda.LeeverPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.LeeverPrefab.prototype.constructor = zelda.LeeverPrefab;




zelda.LeeverPrefab.prototype.update = function(){

    if(this.Alive){

        this.game.physics.arcade.collide(this,this.level.obstacles);
        this.game.physics.arcade.collide(this,this.level.water);

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


            if(this.level.linkInstance.sword.Alive&&this.emerged){
                    this.game.physics.arcade.overlap(this,this.level.linkInstance.sword,function(npc,linkSword){
                        if(!npc.hurt)
                        npc.lives--;
                      //  console.log(npc.lives);
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


            if(this.level.linkInstance.projectile.Alive&&this.emerged){
                    this.game.physics.arcade.overlap(this,this.level.linkInstance.projectile,function(npc,projectile){
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

        }else if(this.emerging){
            this.animations.play("moveUnderWater");
            if(!this.calledEmerge){
                this.calledEmerge = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LeeverPrefab.Emerge, this.level,this);    
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
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LeeverPrefab.Emerging, this.level,this);    
            this.calledEmerging = true;
            }

            //this.emerging = true;
          //  console.log("Se mueve");
            this.calledEmerge = false;
        }

    }else{
        this.frame = 4;
    }
}
    
zelda.LeeverPrefab.Emerging = function(obj){
    obj.emerging = true;
   // console.log("emerging");
    obj.calledEmerge = false;

}


zelda.LeeverPrefab.Emerge = function(obj){
    obj.emerged = true;
    if(obj.level.linkInstance.body.position.y<obj.body.position.y)
    obj.frame = 3
    
    else{
        obj.frame = 2;
    }
    
   // console.log("emerged");
    obj.calledEmerging = false;
}



