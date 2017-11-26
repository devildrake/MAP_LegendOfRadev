var zelda = zelda || {};

zelda.HeartPrefab = function(game,x,y,level,type){

if(type==0)
	Phaser.Sprite.call(this,game,x,y,"Heart");    
else
    Phaser.Sprite.call(this,game,x,y,"HalfHeart");    

    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.type = type;
}


zelda.HeartPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.HeartPrefab.prototype.constructor = zelda.HeartPrefab;

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
                    }else{
                        zelda.LinkObject.currentHearts+=0.5;
                        if(zelda.LinkObject.currentHearts>zelda.LinkObject.maxHearts){
                            zelda.LinkObject.currentHearts=zelda.LinkObject.maxHearts;
                        }
                        zelda.LinkPrefab.PlayGrabHeart();
                        heart.kill();
                    }
                }
                
        } );
}