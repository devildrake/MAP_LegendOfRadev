var zelda = zelda || {};

zelda.boomerangToPickUp = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"boomerangToPickUp");
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
}


zelda.boomerangToPickUp.prototype = Object.create(Phaser.Sprite.prototype);

zelda.boomerangToPickUp.prototype.constructor = zelda.boomerangToPickUp;

zelda.boomerangToPickUp.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(boomerang,linkInstance){
        zelda.Inventory.GetObject(6);
        boomerang.kill();
        zelda.LinkPrefab.grabItemSound.play();

        } );
    
    
}