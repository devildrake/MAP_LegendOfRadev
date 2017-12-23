var zelda = zelda || {};

zelda.HeartContainerPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"HeartContainer");
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


zelda.HeartContainerPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.HeartContainerPrefab.prototype.constructor = zelda.HeartContainerPrefab;

zelda.HeartContainerPrefab.prototype.update = function(){
    if(this.Alive){
    this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(heartContainer,linkInstance){
        zelda.LinkObject.maxHearts++;
        zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
        heartContainer.kill();
        zelda.LinkPrefab.grabItemSound.play();
        this.Alive = false;
        } );
    }
    
}