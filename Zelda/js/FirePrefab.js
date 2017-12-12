var zelda = zelda || {};

zelda.FirePrefab = function(game,x,y,level,whereTo){

    Phaser.Sprite.call(this,game,x,y,"FireSpriteSheet");    
    this.animations.add("DO",[0,1],15,true);
    this.Alive = true;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    //console.log(this);
    this.initSpeed = 0.5;
    this.sprite = game.add.sprite(this.position.x,this.position.y,"FireSpriteSheet");
    this.posToGoX = x;
    this.posToGoY = y;
    this.sprite.animations.add("DO",[0,1],15,true);
    	this.game.physics.arcade.enable(this.sprite);

    this.arrived = false;
    this.calledOverlap = false;
    switch(whereTo){
        case 0:
            this.body.velocity.x = this.initSpeed;
            this.posToGoX += 16;
            console.log(this.posToGoX);
            this.going = "Right";
            break;
        case 1:
            this.body.velocity.x = -this.initSpeed;
            this.posToGoX -=16;
                        console.log(this.posToGoX);

            this.going = "Left";

            break;
        case 2:
            this.body.velocity.y = -this.initSpeed;
            this.posToGoY -=16;
            this.going = "Up";

            break;
        case 3:
            this.body.velocity.y = this.initSpeed;
            this.posToGoY +=16;
            this.going = "Down";
            break;
        default:
            break;
    }
    

}


zelda.FirePrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.FirePrefab.prototype.constructor = zelda.FirePrefab;

zelda.ExplosionPrefab.prototype.update = function(){
    console.log("Update not working for some stupid reason");
}

zelda.FirePrefab.Update = function(s){
	//esto es para que rompa los arbolicos

	s.sprite.game.physics.arcade.overlap(s.sprite,zelda.overworld.blockGroup,function(s,o){
		if(o.key == "arbol") o.kill();
	});
	
    if(s.Alive){
        s.sprite.position = s.position;
        s.animations.play("DO"); 
        s.sprite.animations.play("DO");    

        s.position.x += s.body.velocity.x;
        s.position.y += s.body.velocity.y;

        if(s.going=="Down"){
            if(s.position.y>=s.posToGoY){
                s.arrived = true;
            }
        }else if(s.going=="Up"){
            if(s.position.y<=s.posToGoY){
                s.arrived = true;
            }
        }else if(s.going=="Right"){
            if(s.position.x>=s.posToGoX){
                s.arrived = true;
            }
        }else if(s.going=="Left"){
            if(s.position.x<=s.posToGoX){
                s.arrived = true;
            }
        }

        if(s.arrived){
            s.body.velocity.setTo(0);
            if(!s.calledOverlap){
                s.game.time.events.add(Phaser.Timer.SECOND * 0.75,zelda.FirePrefab.Dissappear, s.level,s);
                s.calledOverlap = true;
            }
        }
        //this.body.position
        //console.log(s.posToGoX);
    }
};

zelda.FirePrefab.Dissappear = function(s){
    zelda.Inventory.fireOn=false;
    s.Alive = false;
    s.arrived = false;
    s.calledOverlap = false;
    s.sprite.kill();
}

zelda.FirePrefab.Restart = function(s){
    s.posToGoX = s.position.x;
    s.posToGoY = s.position.y;
    
        switch(s.whereTo){
        case 0:
            s.body.velocity.x = s.initSpeed;
            s.posToGoX += 16;
            console.log(s.position.x);
            console.log(s.posToGoX);
            s.going = "Right";
            break;
        case 1:
            s.body.velocity.x = -s.initSpeed;
            s.posToGoX -=16;
                        console.log(s.posToGoX);

            s.going = "Left";

            break;
        case 2:
            s.body.velocity.y = -s.initSpeed;
            s.posToGoY -=16;
            s.going = "Up";
            break;
        case 3:
            s.body.velocity.y = s.initSpeed;
            s.posToGoY +=16;
            s.going = "Down";
            break;
        default:
            break;
    }
    
    
        if(s.going=="Down"){
            if(s.position.y>=s.posToGoY){
                s.arrived = true;
            }
        }else if(s.going=="Up"){
            if(s.position.y<=s.posToGoY){
                s.arrived = true;
            }
        }else if(s.going=="Right"){
            if(s.position.x>=s.posToGoX){
                s.arrived = true;
            }
        }else if(s.going=="Left"){
            if(s.position.x<=s.posToGoX){
                s.arrived = true;
            }
        }
}