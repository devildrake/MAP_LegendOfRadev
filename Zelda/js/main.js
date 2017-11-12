var zelda = zelda || {};

zelda.gameOptions = {
	gameWidth:16*16,
	gameHeight:11*16,
    linkSpeed:400
}

//objeto para colocar los elementos del layout de las salas secretas
zelda.secretLayout = {
    fireX1: 4*16,
    fireY: 4*16,
    fireX2: 11*16,
	//usar estos cuando hay 3 objetos
    item1X: 5*16,
    item2X: 8*16,
    item3X: 10*16,
	//usar estos cuando hay 2 objetos
	item2_1X: 5*16,
	item2_2X: 10*16,
	//la Y siempre es la misma
    itemY: 6*16,
    npcX: 8*16,
    //la Y para todos los objetos
    npcY: 4*16
};

//Objeto que existe para manejar los booleanos de comportamiento de las animaciones de link, pretendia hacer que
//las animaciones tambien formaran parte de este objeto y así poder usarlo siempre que quisieramos
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

zelda.Inventory={
    
    bombs: 0,
    keys:0,
    rupies:0,
    ring:false,
    stairs:false,
    ObjectB:"nothing",
    
    //el [0] sera el boomerang
    //el [1] sera las bombas
    //el [2] sera el arco
    //el [3] sera la vela
    //el [4] sera la poti vida(roja)
    //el [5] sera la poti azul(??)
    objects:[0,0,0,0,0,0],

    GetObject:function(nameObject){
        
        if(nameObject==1){
            this.rupies+=1;
        }
        else if(nameObject==2){
            this.bombs+=1;
        }
        else if(nameObject==3){
            this.keys+=1;
        }
        else if(nameObject==4){
            this.ring=true;
        }
        else if(nameObject==5){
            this.stairs=true;
        }
        else if(nameObject==6){
            this.objects[0]=1;
        }
        else if(nameObject==7){
             this.objects[1]=1;
        }
         else if(nameObject==8){
             this.objects[2]=1;
        }
         else if(nameObject==9){
             this.objects[3]=1;
        }
        else if(nameObject==10){
             this.objects[4]=1;
        }
        else if(nameObject==11){
            this.objects[5]=1;
        }
    
},
    
    LoadSave:function(){
        
        
        
    },
    
    
    
}

//activar las fisicas a todo el proyecto


zelda.game = new Phaser.Game(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight,Phaser.AUTO, null, this, false, false);
zelda.game.state.add("main", zelda.intro);
zelda.game.state.add("sword_room", zelda.sala_espada);
zelda.game.state.add("secret_room_A", zelda.sala_secreta_A);
zelda.game.state.add("secret_room_D", zelda.sala_secreta_D);
zelda.game.state.add("secret_room_M", zelda.sala_secreta_M);
zelda.game.state.add("secret_room_I", zelda.sala_secreta_I);
zelda.game.state.add("secret_room_L", zelda.sala_secreta_L);
zelda.game.state.add("secret_room_E", zelda.sala_secreta_E);
zelda.game.state.add("secret_room_H", zelda.sala_secreta_H);
zelda.game.state.add("secret_room_K", zelda.sala_secreta_K);
zelda.game.state.add("secret_room_G", zelda.sala_secreta_G);
zelda.game.state.add("overworld", zelda.overworld);
zelda.game.state.add("dungeon", zelda.dungeon);

//Escena que se pinta
zelda.game.state.start("overworld");
