var zelda = zelda || {};

zelda.arrowPrefab = function(game,x,y){
	Phaser.Sprite.call(this,game,x,y,"swordProjectile");
	this.anchor.setTo(.5);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
};

zelda.arrowPrefab.prototype = Object.create(Phaser.Sprite.prototype);
zelda.arrowPrefab.prototype.constructor = zelda.arrowPrefab;
