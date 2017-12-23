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
        zelda.Inventory.mapa=zelda.game.add.sprite(zelda.game.camera.x+10,zelda.game.camera.y+10, "minimap");
        zelda.Inventory.mapa.position.x=zelda.game.camera.x+10;
        zelda.Inventory.mapa.position.y=zelda.game.camera.y+5;
        if(zelda.dungeon.pointBossAlive){
            zelda.dungeon.pointBoss.kill();
            zelda.dungeon.pointBoss= zelda.game.add.sprite(0,0, "pointBoss");
            zelda.dungeon.pointBoss.position.x=zelda.game.camera.x+36+10.7*2;
            zelda.dungeon.pointBoss.position.y=zelda.game.camera.y+38+8.5*-3;
        }
        zelda.dungeon.point.kill();
        zelda.dungeon.point = zelda.game.add.sprite(zelda.game.camera.x+36+12*zelda.dungeon.pointCurrentX,zelda.game.camera.y+38+(6*zelda.dungeon.pointCurrentY), "pointMap");
        map.kill();
        zelda.LinkPrefab.grabItemSound.play();

        } );
    
    
}