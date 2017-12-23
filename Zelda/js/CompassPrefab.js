var zelda = zelda || {};

zelda.CompassPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Compass");
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
}


zelda.CompassPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.CompassPrefab.prototype.constructor = zelda.CompassPrefab;

zelda.CompassPrefab.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(compass,linkInstance){
        zelda.LinkObject.hasCompass = true;
        compass.kill();
        zelda.LinkPrefab.grabItemSound.play();

        } );
    
    
}