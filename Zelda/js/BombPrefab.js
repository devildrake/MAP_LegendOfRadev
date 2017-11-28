var zelda = zelda || {};

zelda.BombPrefab = function(game,x,y,level,type){

	Phaser.Sprite.call(this,game,x,y,"bomba");    
 

    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.type = type;
    
}


zelda.BombPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.BombPrefab.prototype.constructor = zelda.BombPrefab;

zelda.BombPrefab.prototype.update = function(){
            this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(rupy,linkInstance){
                if(zelda.Inventory.bombs!=999){
                    
                        zelda.Inventory.bombs+=1;
                        zelda.Inventory.GetObject(2);
                        zelda.LinkPrefab.GrabObject();
                        bomb.kill();
                        
                }
                
        } );
}