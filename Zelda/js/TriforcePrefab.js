var zelda = zelda || {};

zelda.TriforcePrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"Triforce");    
    
    this.blackoutRight = game.add.sprite(x+256,y,"Black");
    this.blackoutLeft = game.add.sprite(x-256,y,"Black");
    this.blackoutRight.anchor.setTo(.5);   
    this.blackoutLeft.anchor.setTo(.5);    
    
    this.game.physics.arcade.enable(this.blackoutRight);
	this.game.physics.arcade.enable(this.blackoutLeft);

    this.blackoutLeft.kill();
    this.blackoutRight.kill();
    this.blackoutLeft.level = level;
    this.diePos = this.position;

        
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;    
    this.over = false;
    zelda.TriforcePrefab.TriforceMusic =  this.game.add.audio("TriforceSound");

}


zelda.TriforcePrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.TriforcePrefab.prototype.constructor = zelda.TriforcePrefab;

zelda.TriforcePrefab.prototype.update = function(){
            this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(triforce,linkInstance){
            if(zelda.LinkPrefab.grabItemSound!=undefined){
                zelda.LinkPrefab.grabItemSound.play();
            }
                        zelda.TriforcePrefab.TriforceMusic.play();
                        zelda.LinkObject.grabbingObject = true;
                //triforce
                    this.diePos = this.position;

                        triforce.kill();
                        zelda.LinkObject.hasTriforce = true;
                        zelda.TriforcePrefab.MoveBlacks(triforce);
            });

                                             
        this.game.physics.arcade.collide(this.blackoutRight,this.blackoutLeft,        
             function(blackoutRight,blackoutLeft){
            blackoutLeft.level.triforce.over = true;
            console.log(blackoutLeft.level.triforce.over);
            
        
            });
}

zelda.TriforcePrefab.MoveBlacks = function(triforce){
    triforce.blackoutRight.reset(triforce.diePos.x+256+256+150,triforce.diePos.y-20);
    triforce.blackoutLeft.reset(triforce.diePos.x-256-256-150,triforce.diePos.y-20);
    triforce.blackoutLeft.body.velocity.x = +70;
    triforce.blackoutRight.body.velocity.x = -70;

    
}