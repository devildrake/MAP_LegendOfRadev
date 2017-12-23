var zelda = zelda || {};

zelda.MapPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Map");
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
}


zelda.MapPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.MapPrefab.prototype.constructor = zelda.MapPrefab;

zelda.MapPrefab.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(map,linkInstance){
        zelda.LinkObject.hasMap = true;
        map.kill();
        zelda.LinkPrefab.grabItemSound.play();

        } );
    
    
}