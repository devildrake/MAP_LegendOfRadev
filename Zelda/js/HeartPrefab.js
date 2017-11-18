var zelda = zelda || {};

zelda.HeartPrefab = function(game,x,y,level){


	Phaser.Sprite.call(this,game,x,y,"Heart");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;

}


zelda.HeartPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.HeartPrefab.prototype.constructor = zelda.HeartPrefab;

zelda.HeartPrefab.prototype.update = function(){
            this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(heart,linkInstance){

                if(zelda.LinkObject.currentHearts!=zelda.LinkObject.maxHearts){
                    zelda.LinkObject.currentHearts+=1;
                    if(zelda.LinkObject.currentHearts>zelda.LinkObject.maxHearts){
                        zelda.LinkObject.currentHearts=zelda.LinkObject.maxHearts;
                    }
                    heart.kill();
                }
                
        } );
}