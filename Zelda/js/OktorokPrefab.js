var zelda = zelda || {};

zelda.OktorokPrefab = function(game,x,y,type,level,initSpeed){

	Phaser.Sprite.call(this,game,x,y,"Oktorok");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    this.prevVelocity = new Phaser.Point(0,0);
    this.maxVelocity = 30;
    if(this.type==0){
        this.animations.add("movingLeft", [8,9], 5, true);
        this.animations.add("movingDown", [10,11], 5, true);
        this.animations.add("movingRight", [12,13],5,true);
        this.animations.add("movingUp", [14,15], 5, true);
        }
    else{
        this.animations.add("movingLeft", [0,1], 5, true);
        this.animations.add("movingDown", [2,3], 5, true);
        this.animations.add("movingRight", [4,5],5,true);
        this.animations.add("movingUp", [6,7], 5, true);
    }

    this.level = level;

    
	this.game.physics.arcade.enable(this);

    if(initSpeed==0){
        this.body.velocity.x = this.maxVelocity;
    }else if(initSpeed==1){
                this.body.velocity.x = -this.maxVelocity;

    }else if(initSpeed==2){
                this.body.velocity.y = this.maxVelocity;

    }else{
                this.body.velocity.y = -this.maxVelocity;
    }
    
};

zelda.OktorokPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.OktorokPrefab.prototype.constructor = zelda.OktorokPrefab;



zelda.OktorokPrefab.prototype.update = function(){
    
    this.game.physics.arcade.collide(this,this.level.obstacles);
    
if(this.prevVelocity.y<0&&this.body.blocked.up){
    zelda.AIMethods.changeDir(this,0);
}else if(this.prevVelocity.y>0&&this.body.blocked.down){
        zelda.AIMethods.changeDir(this,1);

}else if(this.prevVelocity.x>0&&this.body.blocked.right){
        zelda.AIMethods.changeDir(this,2);

}else if(this.prevVelocity.x<0&&this.body.blocked.left){
        zelda.AIMethods.changeDir(this,3);
}

    
    if(this.body.velocity.x!=0||this.body.velocity.y!=0){
        this.prevVelocity.x = this.body.velocity.x;
        this.prevVelocity.y = this.body.velocity.y;
    }

    
        this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(enemy,linkInstance){
            zelda.LinkObject.hurt = true;
            zelda.LinkObject.moveFromDmg=true;
            zelda.LinkObject.calledNotMoveFromDamage=false;
            
            console.log(enemy.body.velocity);
            
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
        
}

