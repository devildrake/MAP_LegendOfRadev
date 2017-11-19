var zelda = zelda || {};

zelda.gameOptions = {
	gameWidth:16*16, //256
	gameHeight:11*16 + 47,//176 + 47 = 223
    linkSpeed:100,
    lastCameraPosX: 2*16*16+8*16,
    lastCameraPosY: 4*11*16 + 9*16,
    cameraPosToGoX: 0,
    cameraPosToGoY: 0,
    borderToSet: "None",
    setBorders: true,
    cameraArrivedPos: true,
	GoToOverworld:function(){
		zelda.game.state.start("overworld");
	}
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
    npcY: 4*16,
};

//Objeto que existe para manejar los booleanos de comportamiento de las animaciones de link, pretendia hacer que
//las animaciones tambien formaran parte de este objeto y así poder usarlo siempre que quisieramos
//Pero al parecer no es posible tener un sprite dentro de un objeto o por lo menosno lo se hacer
zelda.LinkObject = {
    maxHearts: 3,
    currentHearts: 3,
    currentZone: 7*4+2,
    
    lastPositionX: 2*16*16+8*16,
    lastPositionY: 4*11*16 + 8*16,
    
    //Tiene 4 bools para saber a donde esta y estaba mirando para el tema orientación
    lookingUp: false,
    lookingDown: false,
    lookingLeft: false,
    lookingRight:false,
    
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
    
    
    calledNotMoveFromDamage: true,
    moveFromDmg:false,
    
    //Método para Reiniciar los booleanos de looking
    ResetLooking:function(){
        this.lookingUp = false;
        this.lookingDown = false;
        this.lookingLeft = false;
        this.lookingRight = false;
    },
}

//Crear 10 bools por zona?
zelda.enemySpawns = {
zones: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

InitZones:function(){
    this.zones[0] = [];
    this.zones[1] = [];
    this.zones[2] = [true];                           //OktorokNaranja
    this.zones[3] = [true,true,true,true,true,true];  //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Azul - Oktorok Naranja
    this.zones[4] = [];
    this.zones[5] = [true,true,true];                 //Subterraneo naranja - Subterraneo azul - Subterraneo azul
    this.zones[6] = [];
    this.zones[7] = [];
    this.zones[8] = [true];                           //BichoMar
    this.zones[9] = [true];                           //BichoMar
    this.zones[10] = [true,true,true,true,true];      //BichoMar - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja
    this.zones[11] = [false,false,false,false,false]; //Oktorok Naranja - Oktorok Azul - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[12] = [true,true,true,true,true,true]; //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - 
    this.zones[13] = [true,true,true,true,true,true]; //Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - 
    this.zones[14] = [true,true];                     //Oktorok naranja - Bichomar
    this.zones[15] = [true,true,true,true,true];      //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[16] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[17] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[18] = [true,true,true,true];           //Volador naranja - Volador naranja - Volador naranja - Volador naranja
    this.zones[19] = [true,true,true,true];           //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[20] = [true,true];                     //Cerdo Naranja - Cerdo Azul
    this.zones[21] = [true,true];                     //BichoMar - Oktorok Naranja
    this.zones[22] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[23] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[24] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[25] = [true,true,true,true,true];      //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - BichoMar
    this.zones[26] = [true,true,true,true,true];      //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    this.zones[27] = [true,true,true,true,true];      //Cerdo Azul - Cerdo Naranja - Cerdo Naranja - Oktorok Azul - Oktorok Azul
    this.zones[28] = [false,false,false,false,false]; //Bichomar - Subterraneo azul - Volador naranja - Subterraneo azul
    this.zones[29] = [false,false,false,false,false]; //Tektite naranja - Tektite naranja - Tektite naranja - Tektite naranja
    this.zones[30] = [false,false,false,false,false]; 
    this.zones[31] = [false,false,false,false,false]; //Oktorok naranja - Oktorok naranja - Oktorok naranja - Oktorok naranja
    this.zones[32] = [false,false,false,false,false]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul - Tektite azul
    this.zones[33] = [false,false,false,false,false]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul
    this.zones[34] = [false,false,false,false,false]; //Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - BichoMar
}
    
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

zelda.AIMethods = {
    changeDir: function(obj,current){
        var rand = zelda.randomDataGen.between(0,3);
        //Up
        if(current==0){
            if(rand==0){
                obj.body.velocity.y=0;
                obj.body.velocity.x = obj.maxVelocity;
            }else if(rand==1){
                obj.body.velocity.y=0;
                obj.body.velocity.x = -obj.maxVelocity;
            }else{
                obj.body.velocity.y= obj.maxVelocity;
            }

            //Down
        }else if(current==1){
            if(rand==0){
                obj.body.velocity.y=0;
                obj.body.velocity.x = obj.maxVelocity;
            }else if(rand==1){
                obj.body.velocity.y=0;
                obj.body.velocity.x = -obj.maxVelocity;
            }else{
                obj.body.velocity.y= -obj.maxVelocity;
            }

            //Right
        }else if(current==2){
            if(rand==0){
                obj.body.velocity.x=0;
                obj.body.velocity.y = obj.maxVelocity;
            }else if(rand==1){
                obj.body.velocity.x=0;
                obj.body.velocity.y = -obj.maxVelocity;
            }else{
                obj.body.velocity.x=-obj.maxVelocity;
            }

            //Left
        }else{
            if(rand==0){
                obj.body.velocity.x=0;
                obj.body.velocity.y = obj.maxVelocity;
            }else if(rand==1){
                obj.body.velocity.x=0;
                obj.body.velocity.y = -obj.maxVelocity;
            }else{
                obj.body.velocity.x=obj.maxVelocity;
            }
        }
    },
    
    GetHurt: function(obj, fromWhere){
        if(fromWhere=="Up"){
            obj.body.velocity.y=-50;
            obj.body.velocity.x = 0;
        }else if(fromWhere=="Down"){
            obj.body.velocity.y=50;
            obj.body.velocity.x = 0;

        }else if(fromWhere=="Right"){
            obj.body.velocity.x=50;
            obj.body.velocity.y = 0;

        }else{
            obj.body.velocity.x=-50;
            obj.body.velocity.y = 0;
        }
    },
    
    CreateProjectile: function(obj, velocity){
            obj.projectile.Alive = true;
            obj.projectile.reset(obj.body.position.x+8,obj.body.position.y+8);
            obj.projectile.body.velocity.x = velocity.x*2;
            obj.projectile.body.velocity.y = velocity.y*2;

    }
}


zelda.randomDataGen = new Phaser.RandomDataGenerator();
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
//zelda.game.state.start("main");
zelda.game.state.start("sword_room");