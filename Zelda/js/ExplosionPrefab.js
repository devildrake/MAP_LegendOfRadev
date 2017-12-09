var zelda = zelda || {};

zelda.ExplosionPrefab = function(game,x,y,level,type){

	Phaser.Sprite.call(this,game,x,y,"area");    
 

    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.type = type;
    
}


zelda.ExplosionPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.ExplosionPrefab.prototype.constructor = zelda.ExplosionPrefab;

zelda.ExplosionPrefab.prototype.update = function(){
    
    //hacerlo de cada enemigo
           /* this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(rupy,linkInstance){
                if(){
                    
                        
                        
                }
                
        } );*/
}