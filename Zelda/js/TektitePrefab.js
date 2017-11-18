var zelda = zelda || {};

zelda.TektitePrefab = function(game,x,y,type,level,offsetMax){

    this.hurt = false;
    this.calledNotHurt = true;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"Tektite");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.maxOffset = offsetMax;
    
    if(this.type==0){
        this.animations.add("UpDown", [2,3], 5, true);
        this.lives = 1;
        }
    else{
        this.animations.add("UpDown", [0,1], 5, true);

        this.lives = 3;
    }

    this.level = level;
	this.game.physics.arcade.enable(this);
    
    this.posToJump = this.body.position;

};



    zelda.TektitePrefab.CalculateRandomPos = function(obj){

            
        var randomMov = zelda.randomDataGen.between(15,obj.maxOffset);
            
            var randomNum = zelda.randomDataGen.between(0,100);
            
        console.log(randomNum);
        

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
            
            
            if(obj.posToJump.x+16>obj.level.cameraRight.body.position.x){
                obj.posToJump.x = obj.level.cameraBot.body.position.x-16;
            }else if(obj.posToJump.x-16<obj.level.cameraLeft.body.position.x){
                obj.posToJump.x = obj.level.cameraBot.body.position.x+16;
            }
            
            if(obj.posToJump.y+16<obj.level.cameraTop.body.position.y){
                obj.posToJump.y = obj.level.cameraBot.body.position.y-16;
            }else if(obj.posToJump.y-16>obj.level.cameraBot.body.position.y){
                obj.posToJump.y = obj.level.cameraBot.body.position.y+16;
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
    
    if(!this.hurt){



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


        if(this.body.velocity.x==0&&this.body.velocity.y==0){
            this.animations.play("UpDown");
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
    else{
        if(!this.calledNotHurt){
            this.calledNotHurt = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.TektitePrefab.NotHurt, this.level,this);
        }
    }
    
}

