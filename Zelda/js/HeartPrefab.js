var zelda = zelda || {};

zelda.HeartPrefab = function(game,x,y,level,type){

	Phaser.Sprite.call(this,game,x,y,"HeartSpriteSheet");    
    
    this.animations.add("HeartDissappear",[0,2],5,true);
    this.animations.add("HalfHeartDissappear",[1,2],5,true);
    this.calledKill = false;
    this.calledBlink = false;
    this.Alive = true;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.type = type;
    if(this.type==0){
        this.frame = 1;
    }else 
        this.frame = 0;
}


zelda.HeartPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.HeartPrefab.prototype.constructor = zelda.HeartPrefab;

zelda.HeartPrefab.Blink = function(h){
    if(h.type==0)
        h.animations.play("HalfHeartDissappear");
    else
        h.animations.play("HeartDissappear");

        this.game.time.events.add(Phaser.Timer.SECOND * 2.5,zelda.HeartPrefab.Kill , h.level,h);
}


zelda.HeartPrefab.Kill = function(h){
    h.animations.stop();
    h.kill();
    h.Alive = false;
}

zelda.HeartPrefab.prototype.update = function(){
            this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(heart,linkInstance){
                if(zelda.LinkObject.currentHearts!=zelda.LinkObject.maxHearts){
                    if(heart.type==0){
                        zelda.LinkObject.currentHearts+=1;
                        if(zelda.LinkObject.currentHearts>zelda.LinkObject.maxHearts){
                            zelda.LinkObject.currentHearts=zelda.LinkObject.maxHearts;
                        }
                        zelda.LinkPrefab.PlayGrabHeart();
                        heart.kill();
                        heart.Alive = false;
                        heart.animations.stop();
                        zelda.Inventory.healed=true;
                    }else{
                        zelda.LinkObject.currentHearts+=0.5;
                        if(zelda.LinkObject.currentHearts>zelda.LinkObject.maxHearts){
                            zelda.LinkObject.currentHearts=zelda.LinkObject.maxHearts;
                        }
                        zelda.LinkPrefab.PlayGrabHeart();
                        heart.Alive = false;
                        heart.animations.stop();
                        heart.kill();
                        zelda.Inventory.healed=true;
                    }
                }
                
        } );
    
    if(this.Alive&&!this.calledKill){
        this.calledKill=true;
        this.game.time.events.add(Phaser.Timer.SECOND * 2.5,zelda.HeartPrefab.Blink , this.level,this);
    }
    
    
}