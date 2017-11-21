var zelda = zelda || {};

zelda.LeeverPrefab = function(game,x,y,type,level){

    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
    this.Awake = false;
    this.emerged = false;
    this.emerging = false;
	Phaser.Sprite.call(this,game,x,y,"Leever");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.maxVelocity = 15;
    if(this.type==0){
        this.animations.add("Emerge", [0,1,2], 5, true);
        this.animations.add("Move", [3,4], 5, true);
        this.lives = 1;
        }
    else{
        console.log("Azul");
        this.animations.add("Emerge", [5,6,7], 5, true);
        this.animations.add("Move", [8,9], 5, true);
        this.lives = 3;
    }

    this.level = level;

    
	this.game.physics.arcade.enable(this);

};

    zelda.LeeverPrefab.NotHurt = function(obj){
        obj.hurt = false;   
        obj.body.velocity = obj.previousVelocity;
    }

zelda.LeeverPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.LeeverPrefab.prototype.constructor = zelda.LeeverPrefab;



zelda.LeeverPrefab.prototype.update = function(){
    if(!this.Awake)   {
        this.frame = 10;
        var randomNum = zelda.randomDataGen.between(0,1000);
        if(randomNum<10){
            this.Awake =true;
        }
        
        
    } 
    
    
    else{
        if(!this.emerged&&!this.emerging){
            zelda.LeeverPrefab.Emerging(this);
            this.animations.play("Emerge");
        }else if(!this.emerged&&this.emerging){
            this.game.time.events.add(Phaser.Timer.SECOND * 0.3,zelda.LeeverPrefab.Emerge, this.level,this);
        }
        
        else if(this.emerged){
            this.play("Move");
        this.game.physics.arcade.collide(this,this.level.obstacles);
        this.game.physics.arcade.collide(this,this.level.water);

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

        if(!this.hurt&&this.emerged){
            this.body.velocity.x = this.level.linkInstance.LinkCollider.body.position.x - this.body.position.x;
            this.body.velocity.y = this.level.linkInstance.LinkCollider.body.position.y - this.body.position.y;
            this.magnitude = this.body.velocity.x * this.body.velocity.x + this.body.velocity.y * this.body.velocity.y;
            this.magnitude = Math.sqrt(this.magnitude);
            this.body.velocity.x/=this.magnitude;
            this.body.velocity.y/=this.magnitude;

            this.body.velocity.x*=this.maxVelocity;
            this.body.velocity.y*=this.maxVelocity;

    console.log(this.maxVelocity);
    console.log(this.magnitude);

            if(this.body.velocity.x!=0||this.body.velocity.y!=0){
                this.prevVelocity.x = this.body.velocity.x;
                this.prevVelocity.y = this.body.velocity.y;
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



            if(this.body.velocity.x>0){
                this.animations.play("movingRight");
            }else if(this.body.velocity.x<0){
                this.animations.play("movingLeft");
            }else if(this.body.velocity.y<0){
                this.animations.play("movingUp");
            }else if(this.body.velocity.y>0){
                this.animations.play("movingDown");
            }

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
        else if(this.hurt){
            if(!this.calledNotHurt){
                this.calledNotHurt = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.LeeverPrefab.NotHurt, this.level,this);
            }
        }
    }
    }
}

zelda.LeeverPrefab.Emerging = function (obj){
    obj.emerging = true;
}
zelda.LeeverPrefab.Emerge = function (obj){
    obj.emerged = true;
}

