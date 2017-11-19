var zelda = zelda || {};

zelda.LinkPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Link");    
    //Phaser.Sprite.call(this.LinkCollider,game,x,y,"LinkCollider");
    
    //  this.LinkCollider.anchor.setTo(0.5,0);
    //  this.LinkCollider.scale.setTo(1);
    
    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.animations.add("movingDown", [0,1], 5, true);
	this.animations.add("movingUp", [2], 5, true);
	this.animations.add("movingSideWays", [3,4],5,true);
	this.animations.add("movingDownHurt", [14,15], 5, true);
	this.animations.add("movingUpHurt", [16], 5, true);
	this.animations.add("movingSideWaysHurt", [17,18],5,true); 


	this.level = level;
	if(level != zelda.overworld){
		this.LinkCollider = game.add.sprite(x,y,"LinkCollider");
		this.frame = 0;
	}else{
		this.LinkCollider = game.add.sprite(zelda.LinkObject.lastPositionX,zelda.LinkObject.lastPositionY,"LinkCollider");
	}

	this.LinkCollider.anchor.setTo(0.5,0);
	this.LinkCollider.scale.setTo(1);


	game.add.existing(this);
	this.cursors = game.input.keyboard.createCursorKeys();
	this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        

	this.sword = this.game.add.sprite(0,0,"Sword");
	this.sword.anchor.setTo(0.5);
	this.sword.kill();
	this.sword.Alive = false;


	this.projectile = this.game.add.sprite(0,0,"Sword");
	this.projectile.anchor.setTo(0.5);
	this.projectile.Alive = false;
	this.projectile.kill();

	this.projectile.outOfBoundsKill = true;
	this.projectile.checkWorldBounds = true;
	this.projectile.events.onOutOfBounds.add(function notAlive(){this.projectile.Alive = false;}, this);

	this.game.physics.arcade.enable(this.projectile);
	this.game.physics.arcade.enable(this.LinkCollider);
    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this.sword);

    
    
    
};

zelda.LinkPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.LinkPrefab.prototype.constructor = zelda.LinkPrefab;



zelda.LinkPrefab.prototype.update = function(){
	//Se reinicia la velocidad a 0 a cada frame           
	//this.Link.body.velocity.setTo(0);
    
    if(!zelda.LinkObject.moveFromDmg){
	   this.LinkCollider.body.velocity.setTo(0);
    }else if(!zelda.LinkObject.calledNotMoveFromDamage){
        zelda.LinkObject.calledNotMoveFromDamage = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.setMoveFromDamageFalse, this.level);
    }
	//this.game.physics.arcade.collide(this.Link,this.obstacles);
	this.game.physics.arcade.collide(this.LinkCollider,this.level.obstacles);

	//La barra espaciadora pone attacking en true
	if(this.space.isDown&&this.space.downDuration(1)){
		if(!zelda.LinkObject.attacking){
			if(zelda.LinkObject.currentHearts==zelda.LinkObject.maxHearts){
				if(zelda.LinkObject.lookingDown){
					zelda.LinkPrefab.createProjectile(0,this);
				}
				else if(zelda.LinkObject.lookingUp){
					zelda.LinkPrefab.createProjectile(1,this);
				}else if(zelda.LinkObject.lookingLeft){
					zelda.LinkPrefab.createProjectile(2,this);
				}else {
					zelda.LinkPrefab.createProjectile(3,this);
				}
			}
		}
		zelda.LinkObject.attacking = true;

	}

	if(zelda.LinkObject.hurt&&!zelda.LinkObject.calledNotHurt){
		this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.NotHurt , this.level);
		zelda.LinkObject.calledNotHurt = true;
	}
    
    

	//Comportamiento si attacking es false, es el movimiento con las flechas 
	if(!zelda.LinkObject.attacking){
        if(zelda.gameOptions.cameraArrivedPos){
            if(this.cursors.left.isDown){

                //this.Link.body.velocity.x = -zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.x= -zelda.gameOptions.linkSpeed;

                if(zelda.LinkObject.hurt)
                    this.animations.play("movingSideWaysHurt");
                else
                    this.animations.play("movingSideWays");

                this.scale.x = -1;
                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingLeft = true;
            }else if(this.cursors.right.isDown){

                if(zelda.LinkObject.hurt)
                    this.animations.play("movingSideWaysHurt");
                else
                    this.animations.play("movingSideWays");

                this.scale.setTo(1);
                //this.Link.body.velocity.x = zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.x = zelda.gameOptions.linkSpeed;

                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingRight = true;
            }else if(this.cursors.up.isDown){
                if(!zelda.LinkObject.switched){
                    zelda.LinkObject.switched = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.15,zelda.LinkPrefab.switchLinkScale , this.level,this);
                }
                //this.Link.body.velocity.y = -zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.y = -zelda.gameOptions.linkSpeed;

                if(zelda.LinkObject.hurt)
                    this.animations.play("movingUpHurt");
                else
                    this.animations.play('movingUp');

                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingUp = true;

            }else if(this.cursors.down.isDown){
                this.scale.setTo(1);
                //this.Link.body.velocity.y = zelda.gameOptions.linkSpeed;
                this.LinkCollider.body.velocity.y = zelda.gameOptions.linkSpeed;

                if(zelda.LinkObject.hurt)
                    this.animations.play("movingDownHurt");
                else
                    this.animations.play('movingDown');

                zelda.LinkObject.ResetLooking();
                zelda.LinkObject.lookingDown = true;
            }
            else {
                if(zelda.LinkObject.lookingUp){
                    this.animations.stop();
                }else if(zelda.LinkObject.lookingLeft){
                    this.scale.x = -1;
                    if(zelda.LinkObject.hurt)
                        this.frame = 14;
                    else 
                        this.frame = 4;
                }else if(zelda.LinkObject.lookingDown){
                    if(zelda.LinkObject.hurt)
                        this.frame = 14;
                    else    
                        this.frame = 0;
                }else{
                    if(zelda.LinkObject.hurt)
                        this.frame = 18;
                    else 
                        this.frame = 4;
                }

                
            }
    }else{
        this.animations.stop();
    }
	}
	//Comportamiento si aun no se ha hecho invoke al método que pone attacking en false
	else if(!zelda.LinkObject.calledNotAttack){
		if(zelda.LinkObject.lookingDown){
			this.scale.setTo(1);

			if(zelda.LinkObject.hurt)
				this.frame = 23;
			else    
				this.frame = 9;

		}else if(zelda.LinkObject.lookingUp){
			this.scale.setTo(1);

			if(zelda.LinkObject.hurt)
				this.frame = 24;
			else
				this.frame = 10;

		}else if(zelda.LinkObject.lookingLeft){
			this.scale.x = -1;
			if(zelda.LinkObject.hurt)
				this.frame = 25;
			else
				this.frame = 11;
		}else{this.scale.setTo(1);
			if(zelda.LinkObject.hurt)
				this.frame = 25;
			else
				this.frame = 11;
		}

		this.game.time.events.add(Phaser.Timer.SECOND * 0.5,zelda.LinkPrefab.makeLinkNotAttack , this.level, this);
		zelda.LinkObject.calledNotAttack = true;

		zelda.LinkPrefab.createSword(this);
	}
	//Comportamiento si ya se ha hecho el invoke al método que pone attacking en false pero aun no se ha llamado a dicho método
	else{
		if(zelda.LinkObject.lookingDown){
			if(zelda.LinkObject.hurt)
				this.frame = 23;
			else
				this.frame = 9;
		}else if(zelda.LinkObject.lookingUp){
			this.scale.setTo(1);
			if(zelda.LinkObject.hurt)
				this.frame = 24;
			else
				this.frame = 10;
		}else if(zelda.LinkObject.lookingLeft){
			if(zelda.LinkObject.hurt)
				this.frame = 25;
			else
				this.frame = 11;
		}else{
			if(zelda.LinkObject.hurt)
				this.frame = 25;
			else
				this.frame = 11;
		}
		//this.createSword();
	}
	this.position = this.LinkCollider.position;
}

zelda.LinkPrefab.createSword = function(obj){
	if(!obj.sword.Alive){
		if(obj.frame ==9||obj.frame==23){

			obj.sword.frame = 1;
			obj.sword.scale.y = 1;
			obj.sword.scale.x = 1;
			obj.sword.reset(obj.position.x,obj.position.y+16);
		}
		// up
		else if(obj.frame == 10 || obj.frame==24){
			obj.sword.frame = 1;
			obj.sword.scale.y= -1;
			obj.sword.scale.x = 1;
			obj.sword.reset(obj.position.x,obj.position.y-16);

		}

		else if(obj.frame == 11||obj.frame==25){
			if(zelda.LinkObject.lookingLeft){                    

			obj.sword.frame = 0;
			obj.sword.scale.x = 1 ;
			obj.sword.scale.y = 1 ;  
			obj.sword.reset(obj.position.x-16,obj.position.y);

			}
			else{
			obj.sword.frame = 0;
			obj.sword.scale.x= -1;
			obj.sword.scale.y = 1;  
			obj.sword.reset(obj.position.x+16,obj.position.y);

			}
		}
        obj.sword.Alive = true;

	}
}

zelda.LinkPrefab.makeLinkNotAttack = function(){

	zelda.LinkObject.attacking = false;
	zelda.LinkObject.calledNotAttack = false;

	zelda.LinkPrefab.sword.kill();
	zelda.LinkPrefab.sword.Alive = false;

	if(zelda.LinkObject.lookingDown){
		this.scale.setTo(1);
		this.frame = 0;
	}else  if(zelda.LinkObject.lookingUp){
		this.scale.setTo(1);
		this.frame = 2;
	}else if(zelda.LinkObject.lookingLeft){
		this.scale.x=-1;
		this.frame = 4;
	}else{
		this.scale.setTo(1);
		this.frame = 4;
	}
}

zelda.LinkPrefab.createProjectile = function(sth,obj){        
	if(!obj.projectile.Alive){
		obj.projectile.reset(obj.position.x, obj.position.y);
		obj.projectile.Alive = true;

		if(sth==0){
			obj.projectile.body.velocity.y = 200;
			obj.projectile.frame = 1;
			obj.projectile.scale.y = 1;
			obj.projectile.scale.x = 1;
		}
		else if (sth==1){
			obj.projectile.body.velocity.y = -200;
			obj.projectile.frame = 1;
			obj.projectile.scale.y=-1;
			obj.projectile.scale.x = 1;

		}
		else if (sth==2){
			obj.projectile.body.velocity.x = -200;
			obj.projectile.frame = 0;
			obj.projectile.scale.x = 1 ;
			obj.projectile.scale.y = 1 ;  
		}
		else{
			obj.projectile.body.velocity.x = 200;
			obj.projectile.frame = 0;
			obj.projectile.scale.x=-1;
			obj.projectile.scale.y = 1;  
		}
	}
}

zelda.LinkPrefab.makeLinkNotAttack = function(obj){
	zelda.LinkObject.attacking = false;
	zelda.LinkObject.calledNotAttack = false;

	obj.sword.kill();
	obj.sword.Alive = false;

	if(zelda.LinkObject.lookingDown){
		obj.scale.setTo(1);
		obj.frame = 0;
	}else  if(zelda.LinkObject.lookingUp){
		obj.scale.setTo(1);
		obj.frame = 2;
	}else if(zelda.LinkObject.lookingLeft){
		obj.scale.x=-1;
		obj.frame = 4;
	}else{
		obj.scale.setTo(1);
		obj.frame = 4;
	}
}
    
    zelda.LinkPrefab.NotHurt = function(){
        
        zelda.LinkObject.calledNotHurt = false;
        zelda.LinkObject.hurt = false;
        
    }
    
    zelda.LinkPrefab.switchLinkScale = function(obj){
        if(obj.scale.x==-1)
      obj.scale.x = 1;  
        else{
            obj.scale.x = -1;
        }        
        zelda.LinkObject.switched = false;
    }
    
    zelda.LinkPrefab.setMoveFromDamageFalse = function(){
        zelda.LinkObject.moveFromDmg = false;
        zelda.LinkObject.calledNotMoveFromDamage = false;
    }

