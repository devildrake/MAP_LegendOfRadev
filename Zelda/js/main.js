var zelda = zelda || {};

zelda.gameOptions = {
	gameWidth:512,
	gameHeight:480,
    linkSpeed:200
}


//Objeto que existe para manejar los booleanos de comportamiento de las animaciones de link, pretendia hacer que las animaciones tambien formaran parte de este objeto y así poder usarlo siempre que quisieramos
//Pero al parecer no es posible tener un sprite dentro de un objeto o por lo menosno lo se hacer
zelda.LinkObject = {
    maxHearts: 3,
    currentHearts: 3,
    
    //Tiene 3 bools para saber a donde esta y estaba mirando para el tema orientación
    lookingUp: false,
    lookingDown: false,
    lookingLeft: false,
    
    //Un booleano para gestionar si ha recibido daño
    hurt: false,
    
    //Un booleano para gestionar si se ha llamado al método que pone hurt en false
    calledNotHurt:false,
    
    //Un booleano para gestionar si esta atacando
    attacking: false,
    
    //Este booleano evita que se hagan multiples llamadas al método que niega attacking
    calledNotAttack:false,
    
    //Este booleano sirve para animar el andar hacia arriba de Link, SE PUEDE SUSTITUIR POR UN SPRITESHEET QUE TENGA AMBOS FRAMES HACIA ARRIBA
    switched:false,
    
    //Método para Reiniciar los booleanos de looking
    ResetLooking:function(){
        this.lookingUp = false;
        this.lookingDown = false;
        this.lookingLeft = false;
    },
}


zelda.game = new Phaser.Game(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight,Phaser.AUTO, null, this, false, false);
zelda.game.state.add("main", zelda.intro);
zelda.game.state.add("secret_room_1", zelda.sala_secreta_1);
zelda.game.state.add("secret_room_2", zelda.sala_secreta_2);
zelda.game.state.add("overworld", zelda.overworld);
//zelda.game.state.start("secret_room_2");
zelda.game.state.start("overworld");
