var zelda = zelda || {};

zelda.SpikesTrapPrefab = function(game,x,y,type,level,initSpeed,zone,posInArray){
    this.posInArray = posInArray
    this.currentZone=zone;
    this.Alive = true;
	Phaser.Sprite.call(this,game,x,y,"SpikesTrap");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.wasPaused = false;
    this.maxVelocity = 75;

    this.level = level;
    
    this.spawned  = false;
    this.calledSpawn = false;
    
	this.game.physics.arcade.enable(this);

    //this.initialSpeed = initSpeed;
    
    
    //console.log(this.animations);
    this.mustMoveOnSight = true;
    //this.previousVelocity = this.body.velocity;
    this.originPos = new Phaser.Point(x-8,y-8);
    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;
    this.alineadoX = false;
    this.alineadoY = false;

};

zelda.SpikesTrapPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.SpikesTrapPrefab.prototype.constructor = zelda.SpikesTrapPrefab;

zelda.SpikesTrapPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.obstacles);
    if(this.spawned){
        if(this.Alive){
            if(!zelda.Inventory.ScrollingInventory&&!zelda.Inventory.InvON){
                
                if(!this.mustMoveOnSight){
                    console.log("A");

                    if((this.body.velocity.x==0&&this.body.velocity.y==0)||(!this.alineadoX&&!this.alineadoY)){
                        console.log("Stuck");
                        if(this.movingUp){
                            this.body.velocity.y=this.maxVelocity/2;
                        }else if(this.movingDown){
                            this.body.velocity.y=-this.maxVelocity/2;
                        }else if(this.movingRight){
                            this.body.velocity.x=-this.maxVelocity/2;
                        }else{
                            this.body.velocity.x=this.maxVelocity/2;
                        }
                    }
                    if(this.body.position.x>this.originPos.x-1&&this.body.position.x<this.originPos.x+1&&this.body.position.y>this.originPos.y-1&&this.body.position.y<this.originPos.y+1){
                        console.log("STOP");
                        this.movingDown = this.movingLeft = this.movingRight = this.movingUp = false;
                        this.mustMoveOnSight=true;
                        this.body.velocity.setTo(0);
                    }
                    
                }
                
                //DETECCIÓN DE QUE ESTA ALINEADO EN X O EN Y
                if((this.level.linkInstance.body.position.x<this.body.position.x+14&&this.level.linkInstance.body.position.x>this.body.position.x-14)){
                                        console.log("Alineado Y");
                    this.alineadoY = true;
                   //console.log("Y aligned");
                    //Más abajo ha de ir hacia abajo
                    if(this.mustMoveOnSight){
                        if(this.level.linkInstance.body.position.y>this.body.position.y){
                            this.body.velocity.y=this.maxVelocity;
                            this.movingDown = true;
                        }else{
                            this.body.velocity.y=-this.maxVelocity;
                            this.movingUp = true;
                        }
                        this.mustMoveOnSight = false;
                    }
                }else{
                    this.alineadoY = false;
                }
                
                if(this.level.linkInstance.body.position.y<this.body.position.y+14&&this.level.linkInstance.body.position.y>this.body.position.y-14){
                   //console.log("X aligned");
                                        console.log("Alienado X");
                        this.alineadoX = true;
                    
                    if(this.mustMoveOnSight){
                        if(this.level.linkInstance.body.position.x>this.body.position.x){
                            this.body.velocity.x=this.maxVelocity;
                            this.movingRight = true;
                        }else{
                            this.body.velocity.x=-this.maxVelocity;
                            this.movingLeft = true;
                        }
                            this.mustMoveOnSight = false;
                    }
                }
                else{
                    this.alineadoX = false;
                }
                
                
                if(this.wasPaused){
                    this.wasPaused = false;

                    this.body.velocity = this.prevVelocity;
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



            }else{
                if(!this.wasPaused){
                    this.wasPaused = true;
                    this.prevVelocity = this.body.velocity;
                    this.body.velocity.setTo(0);
                }
            }
        }
    }
    else{
        zelda.AIMethods.Spawning(this,false);
    }
}

