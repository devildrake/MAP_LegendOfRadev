var zelda = zelda || {};

zelda.DeathParticlesPrefab = function(game,x,y,level){

    level.load.spritesheet("DeathParticles","img/DeathParticles.png",16,16);
	Phaser.Sprite.call(this,game,x+8,y+8,"DeathParticles");    

    this.animations.add("ParticlesGo",[0,1,2,3,4,5],10,true);
    this.Alive = true;
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    console.log("DeathParticlesCreate");

}


zelda.DeathParticlesPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.DeathParticlesPrefab.prototype.constructor = zelda.DeathParticlesPrefab;

zelda.DeathParticlesPrefab.prototype.update = function(){    
    if(this.Alive){
        this.animations.play("ParticlesGo");
        if(this.frame==5){
            this.Alive =false;
            this.kill();
        }
    }
    
    
}