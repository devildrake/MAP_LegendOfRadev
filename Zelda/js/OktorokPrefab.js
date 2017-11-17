var zelda = zelda || {};

zelda.OktorokPrefab = function(game,x,y,type){

	Phaser.Sprite.call(this,game,x,y,"Oktorok");    
    this.type = type;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
    
    if(this.type==0){
    this.animations.add("movingLeft", [8,9], 5, true);
	this.animations.add("movingDown", [10,11], 5, true);
	this.animations.add("movingRight", [12,13],5,true);
	this.animations.add("movingUp", [14,15], 5, true);
    }else{
    this.animations.add("movingLeft", [0,1], 5, true);
	this.animations.add("movingDown", [2,3], 5, true);
	this.animations.add("movingRight", [4,5],5,true);
	this.animations.add("movingUp", [6,7], 5, true);
    }

    
    
	this.game.physics.arcade.enable(this);
};

zelda.OktorokPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.OktorokPrefab.prototype.constructor = zelda.OktorokPrefab;



zelda.OktorokPrefab.prototype.update = function(){
    
}