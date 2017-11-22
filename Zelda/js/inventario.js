var zelda = zelda || {}


zelda.InventarioPrefab=function(game,x,y,level) {
	
    
    this.create=function(){
       this.inv = this.game.add.sprite(0,0, "background");
		
        //posiciones
        this.ArrayPosObjX=[125,145,165,185,200
                          ,125,145,165,185,200];
       
        
        this.row1=50;
        this.row2=67;
        
        //para saber cuales casillas estan ocupadas en el inventario
        this.array=[0,0,0,0,0
                   ,0,0,0,0,0]
       
		
		this.game.camera.y = 0;
		this.InvON= false;
        
        //para saber si ya hemos puesto el objeto en el inventario
        this.CreateBombs=false;
        this.CreateVela=false;
        this.CreatePotion=false;
        
    this.draw=function{
        for( var i=0;i<array.size();i++){
            
            //bombas
            if(zelda.Inventory.objects[1]==1 && this.CreateBombs==false ){
                
                
                if(i<5){
                this.bomb = this.game.add.sprite(this.ArrayPosObjX[i],this.row1, "bomba");
                }
                else{
                    this.bomb = this.game.add.sprite(this.ArrayPosObjX[i],this.row2, "bomba");
                }
                this.CreateBombs=true;
                this.array[i]="bombs";
                console.log("pintada")
            }
            //vela
            else if(zelda.Inventory.objects[3]==1 && this.CreateVela==false){
                
                
                
                if(i<5){
                this.vela = this.game.add.sprite(this.ArrayPosObjX[i],this.row1, "vela");
                }
                else{
                    this.vela = this.game.add.sprite(this.ArrayPosObjX[i],this.row2, "vela");
                }
                
                this.CreateVela=true;
                this.array[i]="vela";
            }
            
            //Potion
              else if(zelda.Inventory.objects[4]==1 && this.CreatePotion==false){
                
                
                
                if(i<5){
                this.vela = this.game.add.sprite(this.ArrayPosObjX[i],this.row1, "potion");
                }
                else{
                    this.vela = this.game.add.sprite(this.ArrayPosObjX[i],this.row2, "potion");
                }
                
                this.CreatePotion=true;
                  this.array[i]="potion";
            }
            
            //objeto
        }
        
    }
        
        }    ,
    
        zelda.InventarioPrefab.prototype = Object.create(Phaser.Sprite.prototype);

    zelda.InventarioPrefab.prototype.constructor = zelda.LinkPrefab;


    zelda.InventarioPrefab.prototype.update = function(){
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.I)){
            this.InvON=false;
       		this.InventarioPrefab.kill;
            
		}
		
		
        
    }
};