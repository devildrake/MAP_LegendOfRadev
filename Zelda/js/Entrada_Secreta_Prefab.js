var zelda = zelda || {};

//Prefab para bloquear las entradas secretas a las salas.
//
//Tiene el boleano abierta que controla cuando el bloqueo ha sido destruido
//para que la proxima vez que se abra el overworld aparezcan abiertas las 
//que ya has abierto

zelda.EntradaSecreta = function(game,x,y,type){
    Phaser.Sprite.call(this,game,x,y,type);
    
    this.game.physics.arcade.enable(this);
    this.abierta = false;
}

zelda.EntradaSecreta.prototype = Object.create(Phaser.sprite.prototype);
zelda.EntradaSecreta.prototype.constructor = zelda.EntradaSecreta;