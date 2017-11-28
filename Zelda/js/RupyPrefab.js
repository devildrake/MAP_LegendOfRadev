var zelda = zelda || {};

zelda.RupyPrefab = function(game,x,y,level,type){

	Phaser.Sprite.call(this,game,x,y,"rupia");    
 

    
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.type = type;
     if(this.type==0){
        this.frame = 0;
    }else 
        this.frame = 1;
}


zelda.RupyPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.RupyPrefab.prototype.constructor = zelda.RupyPrefab;

zelda.RupyPrefab.prototype.update = function(){
            this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(rupy,linkInstance){
                if(zelda.Inventory.rupies!=999){
                    if(rupy.type==0){
                        zelda.Inventory.rupies+=5;
                        zelda.Inventory.GetObject:function(1);
                        zelda.LinkPrefab.GrabObject();
                        rupy.kill();
                       
                    }else{
                        zelda.Inventory.rupies+=1;
                        zelda.Inventory.GetObject:function(1);
                        zelda.LinkPrefab.GrabObject();
                        heart.kill();
                        
                    }
                }
                
        } );
}