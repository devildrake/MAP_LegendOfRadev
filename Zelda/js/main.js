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
	},
    InventoryScroll:0,
	Unpause:function(event){
		if(zelda.game.paused){
			zelda.game.paused = false;
		}
	},
	Pause:function(level){
		zelda.game.paused = true;
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
posicionesEnemigos: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
especieEnemigos: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
tipoEnemigos: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
initialSpeedEnemigos: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    
InitZones:function(){
    zelda.enemySpawns.zones[0] = [];
    zelda.enemySpawns.zones[1] = [];
    zelda.enemySpawns.zones[2] = [true];                           //OktorokNaranja
    zelda.enemySpawns.zones[3] = [true,true,true,true,true,true];  //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Azul - Oktorok Naranja
    zelda.enemySpawns.zones[4] = [];
    zelda.enemySpawns.zones[5] = [true,true,true];                 //Subterraneo naranja - Subterraneo azul - Subterraneo azul
    zelda.enemySpawns.zones[6] = [];
    zelda.enemySpawns.zones[7] = [];
    zelda.enemySpawns.zones[8] = [true];                           //BichoMar
    zelda.enemySpawns.zones[9] = [true];                           //BichoMar
    zelda.enemySpawns.zones[10] = [true,true,true,true,true];      //BichoMar - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja
    zelda.enemySpawns.zones[11] = [false,false,false,false,false]; //Oktorok Naranja - Oktorok Azul - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[12] = [true,true,true,true,true,true]; //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - 
    zelda.enemySpawns.zones[13] = [true,true,true,true,true,true]; //Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - 
    zelda.enemySpawns.zones[14] = [true,true];                     //Oktorok naranja - Bichomar
    zelda.enemySpawns.zones[15] = [true,true,true,true,true];      //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[16] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[17] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[18] = [true,true,true,true];           //Volador naranja - Volador naranja - Volador naranja - Volador naranja
    zelda.enemySpawns.zones[19] = [true,true,true,true];           //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[20] = [true,true];                     //Cerdo Naranja - Cerdo Azul
    zelda.enemySpawns.zones[21] = [true,true];                     //BichoMar - Oktorok Naranja
    zelda.enemySpawns.zones[22] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[23] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[24] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[25] = [true,true,true,true,true];      //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - BichoMar
    zelda.enemySpawns.zones[26] = [true,true,true,true,true];      //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.zones[27] = [true,true,true,true,true];      //Cerdo Azul - Cerdo Naranja - Cerdo Naranja - Oktorok Azul - Oktorok Azul
    zelda.enemySpawns.zones[28] = [true,true,true,true]; //Bichomar - Subterraneo azul - Volador naranja - Subterraneo azul
    zelda.enemySpawns.zones[29] = [true,true,true,true]; //Tektite naranja - Tektite naranja - Tektite naranja - Tektite naranja
    zelda.enemySpawns.zones[30] = []; 
    zelda.enemySpawns.zones[31] = [true,true,true,true]; //Oktorok naranja - Oktorok naranja - Oktorok naranja - Oktorok naranja
    zelda.enemySpawns.zones[32] = [true,true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.zones[33] = [true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.zones[34] = [true,true,true,true,true,true]; //Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - BichoMar
    
    zelda.enemySpawns.posicionesEnemigos[0] = [];
    zelda.enemySpawns.posicionesEnemigos[1] = [];
    zelda.enemySpawns.posicionesEnemigos[2] = [true];                           //OktorokNaranja
    zelda.enemySpawns.posicionesEnemigos[3] = [true,true,true,true,true,true];  //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Azul - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[4] = [];
    zelda.enemySpawns.posicionesEnemigos[5] = [true,true,true];                 //Subterraneo naranja - Subterraneo azul - Subterraneo azul
    zelda.enemySpawns.posicionesEnemigos[6] = [];
    zelda.enemySpawns.posicionesEnemigos[7] = [];
    zelda.enemySpawns.posicionesEnemigos[8] = [true];                           //BichoMar
    zelda.enemySpawns.posicionesEnemigos[9] = [true];                           //BichoMar
    zelda.enemySpawns.posicionesEnemigos[10] = [true,true,true,true,true];      //BichoMar - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja
    zelda.enemySpawns.posicionesEnemigos[11] = [false,false,false,false,false]; //Oktorok Naranja - Oktorok Azul - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[12] = [true,true,true,true,true,true]; //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - 
    zelda.enemySpawns.posicionesEnemigos[13] = [true,true,true,true,true,true]; //Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - 
    zelda.enemySpawns.posicionesEnemigos[14] = [true,true];                     //Oktorok naranja - Bichomar
    zelda.enemySpawns.posicionesEnemigos[15] = [true,true,true,true,true];      //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[16] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[17] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[18] = [true,true,true,true];           //Volador naranja - Volador naranja - Volador naranja - Volador naranja
    zelda.enemySpawns.posicionesEnemigos[19] = [true,true,true,true];           //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[20] = [true,true];                     //Cerdo Naranja - Cerdo Azul
    zelda.enemySpawns.posicionesEnemigos[21] = [true,true];                     //BichoMar - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[22] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[23] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[24] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[25] = [true,true,true,true,true];      //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - BichoMar
    zelda.enemySpawns.posicionesEnemigos[26] = [true,true,true,true,true];      //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.posicionesEnemigos[27] = [true,true,true,true,true];      //Cerdo Azul - Cerdo Naranja - Cerdo Naranja - Oktorok Azul - Oktorok Azul
    zelda.enemySpawns.posicionesEnemigos[28] = [true,true,true,true]; //Bichomar - Subterraneo azul - Volador naranja - Subterraneo azul
    zelda.enemySpawns.posicionesEnemigos[29] = [true,true,true,true]; //Tektite naranja - Tektite naranja - Tektite naranja - Tektite naranja
    zelda.enemySpawns.posicionesEnemigos[30] = []; 
    zelda.enemySpawns.posicionesEnemigos[31] = [true,true,true,true]; //Oktorok naranja - Oktorok naranja - Oktorok naranja - Oktorok naranja
    zelda.enemySpawns.posicionesEnemigos[32] = [true,true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.posicionesEnemigos[33] = [true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.posicionesEnemigos[34] = [true,true,true,true,true,true]; //Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - BichoMar    
    
    zelda.enemySpawns.especieEnemigos[0] = [];
    zelda.enemySpawns.especieEnemigos[1] = [];
    zelda.enemySpawns.especieEnemigos[2] = [true];                           //OktorokNaranja
    zelda.enemySpawns.especieEnemigos[3] = [true,true,true,true,true,true];  //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Azul - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[4] = [];
    zelda.enemySpawns.especieEnemigos[5] = [true,true,true];                 //Subterraneo naranja - Subterraneo azul - Subterraneo azul
    zelda.enemySpawns.especieEnemigos[6] = [];
    zelda.enemySpawns.especieEnemigos[7] = [];
    zelda.enemySpawns.especieEnemigos[8] = [true];                           //BichoMar
    zelda.enemySpawns.especieEnemigos[9] = [true];                           //BichoMar
    zelda.enemySpawns.especieEnemigos[10] = [true,true,true,true,true];      //BichoMar - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja
    zelda.enemySpawns.especieEnemigos[11] = [false,false,false,false,false]; //Oktorok Naranja - Oktorok Azul - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[12] = [true,true,true,true,true,true]; //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - 
    zelda.enemySpawns.especieEnemigos[13] = [true,true,true,true,true,true]; //Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - 
    zelda.enemySpawns.especieEnemigos[14] = [true,true];                     //Oktorok naranja - Bichomar
    zelda.enemySpawns.especieEnemigos[15] = [true,true,true,true,true];      //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[16] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[17] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[18] = [true,true,true,true];           //Volador naranja - Volador naranja - Volador naranja - Volador naranja
    zelda.enemySpawns.especieEnemigos[19] = [true,true,true,true];           //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[20] = [true,true];                     //Cerdo Naranja - Cerdo Azul
    zelda.enemySpawns.especieEnemigos[21] = [true,true];                     //BichoMar - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[22] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[23] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[24] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[25] = [true,true,true,true,true];      //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - BichoMar
    zelda.enemySpawns.especieEnemigos[26] = [true,true,true,true,true];      //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.especieEnemigos[27] = [true,true,true,true,true];      //Cerdo Azul - Cerdo Naranja - Cerdo Naranja - Oktorok Azul - Oktorok Azul
    zelda.enemySpawns.especieEnemigos[28] = [true,true,true,true]; //Bichomar - Subterraneo azul - Volador naranja - Subterraneo azul
    zelda.enemySpawns.especieEnemigos[29] = [true,true,true,true]; //Tektite naranja - Tektite naranja - Tektite naranja - Tektite naranja
    zelda.enemySpawns.especieEnemigos[30] = []; 
    zelda.enemySpawns.especieEnemigos[31] = [true,true,true,true]; //Oktorok naranja - Oktorok naranja - Oktorok naranja - Oktorok naranja
    zelda.enemySpawns.especieEnemigos[32] = [true,true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.especieEnemigos[33] = [true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.especieEnemigos[34] = [true,true,true,true,true,true]; //Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - BichoMar    
    
    zelda.enemySpawns.tipoEnemigos[0] = [];
    zelda.enemySpawns.tipoEnemigos[1] = [];
    zelda.enemySpawns.tipoEnemigos[2] = [true];                           //OktorokNaranja
    zelda.enemySpawns.tipoEnemigos[3] = [true,true,true,true,true,true];  //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Azul - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[4] = [];
    zelda.enemySpawns.tipoEnemigos[5] = [true,true,true];                 //Subterraneo naranja - Subterraneo azul - Subterraneo azul
    zelda.enemySpawns.tipoEnemigos[6] = [];
    zelda.enemySpawns.tipoEnemigos[7] = [];
    zelda.enemySpawns.tipoEnemigos[8] = [true];                           //BichoMar
    zelda.enemySpawns.tipoEnemigos[9] = [true];                           //BichoMar
    zelda.enemySpawns.tipoEnemigos[10] = [true,true,true,true,true];      //BichoMar - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja
    zelda.enemySpawns.tipoEnemigos[11] = [false,false,false,false,false]; //Oktorok Naranja - Oktorok Azul - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[12] = [true,true,true,true,true,true]; //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - 
    zelda.enemySpawns.tipoEnemigos[13] = [true,true,true,true,true,true]; //Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - 
    zelda.enemySpawns.tipoEnemigos[14] = [true,true];                     //Oktorok naranja - Bichomar
    zelda.enemySpawns.tipoEnemigos[15] = [true,true,true,true,true];      //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[16] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[17] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[18] = [true,true,true,true];           //Volador naranja - Volador naranja - Volador naranja - Volador naranja
    zelda.enemySpawns.tipoEnemigos[19] = [true,true,true,true];           //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[20] = [true,true];                     //Cerdo Naranja - Cerdo Azul
    zelda.enemySpawns.tipoEnemigos[21] = [true,true];                     //BichoMar - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[22] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[23] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[24] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[25] = [true,true,true,true,true];      //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - BichoMar
    zelda.enemySpawns.tipoEnemigos[26] = [true,true,true,true,true];      //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.tipoEnemigos[27] = [true,true,true,true,true];      //Cerdo Azul - Cerdo Naranja - Cerdo Naranja - Oktorok Azul - Oktorok Azul
    zelda.enemySpawns.tipoEnemigos[28] = [true,true,true,true]; //Bichomar - Subterraneo azul - Volador naranja - Subterraneo azul
    zelda.enemySpawns.tipoEnemigos[29] = [true,true,true,true]; //Tektite naranja - Tektite naranja - Tektite naranja - Tektite naranja
    zelda.enemySpawns.tipoEnemigos[30] = []; 
    zelda.enemySpawns.tipoEnemigos[31] = [true,true,true,true]; //Oktorok naranja - Oktorok naranja - Oktorok naranja - Oktorok naranja
    zelda.enemySpawns.tipoEnemigos[32] = [true,true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.tipoEnemigos[33] = [true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.tipoEnemigos[34] = [true,true,true,true,true,true]; //Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - BichoMar
    
    zelda.enemySpawns.initialSpeedEnemigos[0] = [];
    zelda.enemySpawns.initialSpeedEnemigos[1] = [];
    zelda.enemySpawns.initialSpeedEnemigos[2] = [true];                           //OktorokNaranja
    zelda.enemySpawns.initialSpeedEnemigos[3] = [true,true,true,true,true,true];  //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Azul - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[4] = [];
    zelda.enemySpawns.initialSpeedEnemigos[5] = [true,true,true];                 //Subterraneo naranja - Subterraneo azul - Subterraneo azul
    zelda.enemySpawns.initialSpeedEnemigos[6] = [];
    zelda.enemySpawns.initialSpeedEnemigos[7] = [];
    zelda.enemySpawns.initialSpeedEnemigos[8] = [true];                           //BichoMar
    zelda.enemySpawns.initialSpeedEnemigos[9] = [true];                           //BichoMar
    zelda.enemySpawns.initialSpeedEnemigos[10] = [true,true,true,true,true];      //BichoMar - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja
    zelda.enemySpawns.initialSpeedEnemigos[11] = [false,false,false,false,false]; //Oktorok Naranja - Oktorok Azul - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[12] = [true,true,true,true,true,true]; //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - //Tektite Azul - 
    zelda.enemySpawns.initialSpeedEnemigos[13] = [true,true,true,true,true,true]; //Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - Cerdo naranja - 
    zelda.enemySpawns.initialSpeedEnemigos[14] = [true,true];                     //Oktorok naranja - Bichomar
    zelda.enemySpawns.initialSpeedEnemigos[15] = [true,true,true,true,true];      //BichoMar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[16] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[17] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[18] = [true,true,true,true];           //Volador naranja - Volador naranja - Volador naranja - Volador naranja
    zelda.enemySpawns.initialSpeedEnemigos[19] = [true,true,true,true];           //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[20] = [true,true];                     //Cerdo Naranja - Cerdo Azul
    zelda.enemySpawns.initialSpeedEnemigos[21] = [true,true];                     //BichoMar - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[22] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[23] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[24] = [true,true,true,true];           //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[25] = [true,true,true,true,true];      //Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - BichoMar
    zelda.enemySpawns.initialSpeedEnemigos[26] = [true,true,true,true,true];      //Bichomar - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja - Oktorok Naranja
    zelda.enemySpawns.initialSpeedEnemigos[27] = [true,true,true,true,true];      //Cerdo Azul - Cerdo Naranja - Cerdo Naranja - Oktorok Azul - Oktorok Azul
    zelda.enemySpawns.initialSpeedEnemigos[28] = [true,true,true,true]; //Bichomar - Subterraneo azul - Volador naranja - Subterraneo azul
    zelda.enemySpawns.initialSpeedEnemigos[29] = [true,true,true,true]; //Tektite naranja - Tektite naranja - Tektite naranja - Tektite naranja
    zelda.enemySpawns.initialSpeedEnemigos[30] = []; 
    zelda.enemySpawns.initialSpeedEnemigos[31] = [true,true,true,true]; //Oktorok naranja - Oktorok naranja - Oktorok naranja - Oktorok naranja
    zelda.enemySpawns.initialSpeedEnemigos[32] = [true,true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.initialSpeedEnemigos[33] = [true,true,true,true]; //Tektite azul - Tektite azul - Tektite azul - Tektite azul
    zelda.enemySpawns.initialSpeedEnemigos[34] = [true,true,true,true,true,true]; //Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - Subterraneo naranja - BichoMar
    
    
    zelda.enemySpawns.posicionesEnemigos[31] = [1007,891,1007,891,1007,891,1007,891,1007,891];
    zelda.enemySpawns.especieEnemigos[31] = ["Oktorok","Oktorok","Oktorok","Oktorok","Oktorok"];
    zelda.enemySpawns.tipoEnemigos[31] = [0,0,0,0,0];
    zelda.enemySpawns.initialSpeedEnemigos[31] = [1,1,1,1,1];
    console.log(zelda.enemySpawns.zones[31]);
}
    
}

//-------------------------------Inventario-------------------------------

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
    objects:[0,1,0,1,0,0],
    
     //posiciones
        ArrayPosObjX:[125,145,165,185,200
                          ,125,145,165,185,200],
       
        
        row1:50,
        row2:67,
        
        //para saber cuales casillas estan ocupadas en el inventario
        array:[0,0,0,0,0
                   ,0,0,0,0,0],
       
		
		
		InvON: false,
        
        //para saber si ya hemos puesto el objeto en el inventario
        CreateBombs:false,
        CreateVela:false,
        CreatePotion:false,

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
    
       
        
    draw:function(){
        for( var i=0;i<9;i++){
            
             //bombas
            if(zelda.Inventory.objects[1]==1 && zelda.Inventory.CreateBombs==false ){
                
                
                if(i<5){
                this.bomb= zelda.game.add.sprite(zelda.game.camera.x.x+zelda.Inventory.ArrayPosObjX[i],zelda.game.camera.x+zelda.Inventory.row1, "bomba");
                  
                    this.bomb.position.x=zelda.game.camera.x+zelda.Inventory.ArrayPosObjX[i];
                    this.bomb.position.y=zelda.game.camera.y+zelda.Inventory.row1;
                    
                }
                else{
                   this.bomb= zelda.game.add.sprite(this.ArrayPosObjX[i],this.row2, "bomba");
                    
                    this.bomb.position.x=zelda.game.camera.x+zelda.Inventory.ArrayPosObjX[i];
                    this.bomb.position.y=zelda.game.camera.y+zelda.Inventory.row2;
                }
                zelda.Inventory.CreateBombs=true;
                zelda.Inventory.array[i]="bombs";
                console.log(i)
                console.log("bomba")
            }
            //vela
            else if(zelda.Inventory.objects[3]==1 && this.CreateVela==false){
                console.log(i)
                 console.log("vela")
                
                if(i<5){
                    this.vela=zelda.game.add.sprite(this.ArrayPosObjX[i],this.row1, "vela");
                    this.vela.position.x=zelda.game.camera.x+zelda.Inventory.ArrayPosObjX[i];
                    this.vela.position.y=zelda.game.camera.y+zelda.Inventory.row1;
                }
                else{
                    this.vela=zelda.game.add.sprite(this.ArrayPosObjX[i],this.row2, "vela");
                    this.vela.position.x=zelda.game.camera.x+zelda.Inventory.ArrayPosObjX[i];
                    this.vela.position.y=zelda.game.camera.y+zelda.Inventory.row2;
                }
                
                zelda.Inventory.CreateVela=true;
                zelda.Inventory.array[i]="vela";
            }
            
            //Potion
              else if(zelda.Inventory.objects[4]==1 && this.CreatePotion==false){
                
                
                
                if(i<5){
                    this.potion=zelda.game.add.sprite(this.ArrayPosObjX[i],this.row1, "potion");
                    this.potion.position.x=zelda.game.camera.x+zelda.Inventory.ArrayPosObjX[i];
                    this.potion.position.y=zelda.game.camera.y+zelda.Inventory.row1;
                }
                else{
                    this.potion=zelda.game.add.sprite(this.ArrayPosObjX[i],this.row2, "potion");
                    this.potion.position.x=zelda.game.camera.x+zelda.Inventory.ArrayPosObjX[i];
                    this.potion.position.y=zelda.game.camera.y+zelda.Inventory.row2;
                }
                
                zelda.Inventory.CreatePotion=true;
                zelda.Inventory.array[i]="potion";
            }
            
            //objeto
        }
        
    },
    LoadSave:function(){
        
        
        
    }
    
},
    
    
	
//---------------------Final inventario---------------------------------------	

zelda.AIMethods = {
    changeDir: function(obj,current,diagonales){
        if(!diagonales){
            var rand = zelda.randomDataGen.between(0,3);
            //Up
            if(current==0){
                if(rand==0){
                    if(!obj.body.blocked.right){
                        obj.body.velocity.y=0;
                        obj.body.velocity.x = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.left){
                        obj.body.velocity.y=0;
                        obj.body.velocity.x = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.down){
                        obj.body.velocity.y= obj.maxVelocity;
                        obj.body.velocity.x =0;
                    }
                }

                //Down
            }else if(current==1){
                if(rand==0){
                    if(!obj.body.blocked.right){
                        obj.body.velocity.y=0;
                        obj.body.velocity.x = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.left){
                        obj.body.velocity.y=0;
                        obj.body.velocity.x = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.up){
                        obj.body.velocity.y= -obj.maxVelocity;
                        obj.body.velocity.x =0;
                    }
                }

                //Right
            }else if(current==2){
                if(rand==0){
                    if(!obj.body.blocked.down){
                            obj.body.velocity.x=0;
                            obj.body.velocity.y = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.up){
                        obj.body.velocity.x=0;
                        obj.body.velocity.y = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.left){
                        obj.body.velocity.x=-obj.maxVelocity;
                        obj.body.velocity.y = 0;
                    }
                }

                //Left
            }else if(current = 3){
                if(rand==0){
                    if(!obj.body.blocked.down){
                        obj.body.velocity.x=0;
                        obj.body.velocity.y = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.up){
                        obj.body.velocity.x=0;
                        obj.body.velocity.y = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.right){
                        obj.body.velocity.x=obj.maxVelocity;
                        obj.body.velocity.y = 0;
                    }

                }
            }else{
                if(rand==0){
                    if(!obj.body.blocked.down){
                        obj.body.velocity.x=0;
                        obj.body.velocity.y = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.up){
                        obj.body.velocity.x=0;
                        obj.body.velocity.y = -obj.maxVelocity;
                    }
                }else if(rand==2){
                    if(!obj.body.blocked.right){
                        obj.body.velocity.x=obj.maxVelocity;
                        obj.body.velocity.y = 0;
                    }

                }else{
                        obj.body.velocity.x=-obj.maxVelocity;
                        obj.body.velocity.y = 0; 
                }

            }
        }else{
            var rand = zelda.randomDataGen.between(0,3);
            var stopDiagonal = zelda.randomDataGen.between(0,99);
            var changeToStopD = 10;
            //Up
            if(current==0){
                if(rand==0){
                    if(!obj.body.blocked.right){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y=0;
                        obj.body.velocity.x = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.left){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y=0;
                        obj.body.velocity.x = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.down){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x =0;

                            obj.body.velocity.y= obj.maxVelocity;
                    }
                }

                //Down
            }else if(current==1){
                if(rand==0){
                    if(!obj.body.blocked.right){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y=0;
                        obj.body.velocity.x = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.left){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y=0;
                        obj.body.velocity.x = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.up){
                        obj.body.velocity.y= -obj.maxVelocity;
                        
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x =0;
                    }
                }

                //Right
            }else if(current==2){
                if(rand==0){
                    if(!obj.body.blocked.down){
                        if(stopDiagonal<changeToStopD)
                                obj.body.velocity.x=0;
                            
                        obj.body.velocity.y = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.up){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x=0;
                        obj.body.velocity.y = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.left){
                        obj.body.velocity.x=-obj.maxVelocity;
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y = 0;
                    }
                }

                //Left
            }else if(current = 3){
                if(rand==0){
                    if(!obj.body.blocked.down){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x=0;
                        obj.body.velocity.y = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.up){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x=0;
                        obj.body.velocity.y = -obj.maxVelocity;
                    }
                }else{
                    if(!obj.body.blocked.right){
                        obj.body.velocity.x=obj.maxVelocity;
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y = 0;
                    }

                }
            }else{
                if(rand==0){
                    if(!obj.body.blocked.down){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x=0;
                        obj.body.velocity.y = obj.maxVelocity;
                    }
                }else if(rand==1){
                    if(!obj.body.blocked.up){
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.x=0;
                        obj.body.velocity.y = -obj.maxVelocity;
                    }
                }else if(rand==2){
                    if(!obj.body.blocked.right){
                        obj.body.velocity.x=obj.maxVelocity;
                        if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y = 0;
                    }

                }else{
                        obj.body.velocity.x=-obj.maxVelocity;
                    if(stopDiagonal<changeToStopD)
                            obj.body.velocity.y = 0; 
                }

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

    },
    
    SpawnEnemy: function(obj,hasInitialSpeed){
        if(hasInitialSpeed){
            console.log(hasInitialSpeed);
            obj.Alive = true;
            obj.spawned = true;

            if(obj.initialSpeed==0){
                obj.body.velocity.x = obj.maxVelocity;
            }else if(obj.initialSpeed==1){
                obj.body.velocity.x = -obj.maxVelocity;
            }else if(obj.initialSpeed==2){
                obj.body.velocity.y = obj.maxVelocity;
            }else{
                obj.body.velocity.y = -obj.maxVelocity;
            }
        }else{
            obj.Alive = true;
            obj.spawned = true;
        }
    },
    
    Spawning : function(obj,hasInitialSpeed){
        obj.animations.play("Spawn");
        if(!obj.calledSpawn){
            obj.game.time.events.add(Phaser.Timer.SECOND * 0.2,zelda.AIMethods.SpawnEnemy, obj.level,obj,hasInitialSpeed);
            obj.calledSpawn = true;
        }
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

zelda.game.state.start("secret_room_K");