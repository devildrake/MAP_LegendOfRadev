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
        
        zelda.dungeon.pointBoss= zelda.game.add.sprite(0,0, "pointBoss");
        zelda.dungeon.pointBoss.position.x=zelda.game.camera.x+36+10.7*2;
        zelda.dungeon.pointBoss.position.y=zelda.game.camera.y+38+8.5*-3;
        zelda.dungeon.pointBossAlive=true;                     
        zelda.LinkObject.hasCompass = true;
        compass.kill();
        zelda.LinkPrefab.grabItemSound.play();

        } );
    
    
}