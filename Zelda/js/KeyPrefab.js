var zelda = zelda || {};

zelda.KeyPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"llave");    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


zelda.KeyPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.KeyPrefab.prototype.constructor = zelda.KeyPrefab;

zelda.KeyPrefab.prototype.update = function(){
        this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(key,linkInstance){
                        //zelda.Inventory.keys++;
				        zelda.Inventory.GetObject(3);
                        zelda.LinkPrefab.grabItemSound.play();
                        key.Alive =false;
                        key.kill();
                    
        } );
}