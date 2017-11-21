var zelda = zelda || {}


zelda.InventarioPrefab=function(game,x,y) {
	
    
    create:function(){
       this.inv = this.game.add.sprite(0,0, "background");
		
        //posiciones
        this.positionObj1=125;
        this.positionObj2=145;
        this.positionObj3=165;
        this.positionObj4=185;
        this.positionObj5=200;
        
        this.row1=50;
        this.row2=67;
        
        //para saber cuales casillas estan ocupadas en el inventario
        this.array=[0,0,0,0,0
                   ,0,0,0,0,0]
       
		
		this.game.camera.y = 0;
		
        //para saber si ya hemos puesto el objeto en el inventario
        this.CreateBombs=false;
        this.CreateVela=false;
        this.CreatePotion=false;
        
        
        for( var i=0;i<array.size();i++){
            
            
            if(zelda.Inventory.objects[1]==1 && this.CreateBombs==false ){
                
                
            }
        }
        this.bomb = this.game.add.sprite(this.positionObj1,67, "bomba");
        this.bombs = this.game.add.sprite(this.positionObj2,50, "bomba");
		this.bombd = this.game.add.sprite(this.positionObj3,50, "bomba");
		
        
    },
    
        zelda.InventarioPrefab.prototype = Object.create(Phaser.Sprite.prototype);

    zelda.InventarioPrefab.prototype.constructor = zelda.LinkPrefab;


    zelda.InventarioPrefab.prototype.update = function(){
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.I)){
       		
		}
		
		
        
    }
};