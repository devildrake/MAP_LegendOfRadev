var zelda = zelda || {};

zelda.swordPrefab = function(game,x,y){
	Phaser.Sprite.call(this,game,x,y,"Sword");
    

    
	this.anchor.setTo(.5);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
    console.log("Bruh");
};

zelda.swordPrefab.prototype = Object.create(Phaser.Sprite.prototype);
zelda.swordPrefab.prototype.constructor = zelda.swordPrefab;
