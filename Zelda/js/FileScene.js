var zelda = zelda || {};

zelda.FileScene = {
	
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //cantidades de posiciones de cada estado y la posicion actual
        this.positionsSelectMax=5;
        this.CurrentPosition=1;
        this.slotSelected=0;
        
        //booleanos para intercambiar entre los diferentes apartados
        this.select=true;
        this.register=false;
        this.delete=false;
        
        
        //datos q se cogeran de las partidas guardadas
        this.LinkHearts;
        this.FileName;
        
        
        
	},
    
    preload:function(){
         this.game.stage.backgroundColor = "#black";
        
        this.load.image("select","img/inicio_y_saveFiles/SelectGame.png",256,240);
        this.load.image("register","img/inicio_y_saveFiles/register.png",256,240);
        this.load.image("fotoNegra","img/inicio_y_saveFiles/FondoNegroParaFade.png",256,240);
         this.load.image("corazon", "img/corazon.png");
        
		this.game.load.script('webfont','//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    
    create:function(){
        this.background = this.game.add.sprite(0,0, "select");
		this.background.scale.setTo(1);
        
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        //crear cursor
        this.heart= zelda.game.add.sprite(33,90, "corazon");
        
        this.str1="";
        this.str2="";
        this.str3="";
        this.KeyboardpositionX=[20,40,0,0,0,0,0,0,0,0,0,0]
        this.keyboardpositionY=[140,170,180,200]
    },
    
    update:function(){
        
        
        
        if(this.select==true){
            this.SelectorControls();
        }
        if(this.register==true ){
            this.RegisterControls();
        }
        
        
				
		//pausar el juego con la P
        if(zelda.game.input.keyboard.isDown(Phaser.Keyboard.P)){
			zelda.gameOptions.Pause(this);
		}	
        
        if(this.enter.isDown){
            this.changeScene();
        }
	},
    
    
    SelectorControls:function(){
        
        //mover el cursor/corazon
        if(this.cursors.up.isDown && this.cursors.up.downDuration(.5) && this.CurrentPosition!=4 && this.CurrentPosition!=5){
            if(this.CurrentPosition!=0){
                this.CurrentPosition-=1;
            }else{
                this.CurrentPosition=3;
            }
            
        }else if(this.cursors.down.isDown && this.cursors.down.downDuration(.5) && this.CurrentPosition!=4 && this.CurrentPosition!=5){
             if(this.CurrentPosition!=3){
                this.CurrentPosition+=1;
            }else{
                this.CurrentPosition=0;
            }
            
            
            }
        if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && this.CurrentPosition==4){
            
                this.CurrentPosition+=1; console.log("entra");
            }
        
        else if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && this.CurrentPosition==5){
                this.CurrentPosition-=1;
            }
        
        if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && this.CurrentPosition==5){
                this.CurrentPosition-=1;
            }      
        
        else if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && this.CurrentPosition==4){
                this.CurrentPosition+=1;
            }
        
        //pintar
        if(this.CurrentPosition==1){
            
            this.heart.position.x=33;
            this.heart.position.y=90;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.slotSelected=1;
                this.CurrentPosition=4;
                
                if(zelda.gameOptions.load("save"+this.slotSelected)===null){
                    
                }
                else{
                    //zelda.gameOptions.loadsave=true;
                    zelda.gameOptions.load("save"+this.slotSelected);
                    zelda.game.state.start("overworld");    
                    
                }
                
            }
        }
        else if(this.CurrentPosition==2){
            this.heart.position.x=33;
            this.heart.position.y=115;
            if(this.space.isDown && this.space.downDuration(.5)){
                
                this.slotSelected=2;
                this.CurrentPosition=4;
                
                if(zelda.gameOptions.load("save"+this.slotSelected)===null){
                    
                }
                else{
                    //zelda.gameOptions.loadsave=true;
                    zelda.gameOptions.load("save"+this.slotSelected);
                    zelda.game.state.start("overworld");    
                    
                }
            }
        }
        else if(this.CurrentPosition==3){
            this.heart.position.x=33;
            this.heart.position.y=137;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.slotSelected=3;
                this.CurrentPosition=4;
                
                if(zelda.gameOptions.load("save"+this.slotSelected)===null){
                    
                }
                else{
                    //zelda.gameOptions.loadsave=true;
                    zelda.gameOptions.load("save"+this.slotSelected);
                    zelda.game.state.start("overworld");    
                    
                }
            }
        }
        else if(this.CurrentPosition==4){
            this.heart.position.x=33;
            this.heart.position.y=165;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.register=true;
                this.select=false;
                this.background.kill();
                this.background = this.game.add.sprite(0,0, "register");
                this.background.scale.setTo(1);
                this.heart.kill();
                this.heart= zelda.game.add.sprite(33,90, "corazon");
                this.CurrentPosition=1;
                
            }
        }
        else if(this.CurrentPosition==5){
            this.heart.position.x=33;
            this.heart.position.y=180;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.delete=true;
                this.select=false;
                this.heart.kill();
                this.heart= zelda.game.add.sprite(33,90, "corazon");
                this.CurrentPosition=1;
                
            }
        }
        
        
        //pintar el nombre y los corazones del file
        
    },
    
    RegisterControls:function(){
        
        //mover el cursor/corazon
        if(this.cursors.up.isDown && this.cursors.up.downDuration(.5)){
            if(this.CurrentPosition!=0){
                this.CurrentPosition-=1;
            }else{
                this.CurrentPosition=this.positionsSelectMax;
            }
            
        }else if(this.cursors.down.isDown && this.cursors.down.downDuration(.5)){
             if(this.CurrentPosition!=this.positionsSelectMax){
               this.CurrentPosition+=1;
            }else{
                this.CurrentPosition=0;
            }
            
            
            }
        
        
        //pintar
        if(this.CurrentPosition==1){
            this.heart.position.x=65;
            this.heart.position.y=107;
            if(this.space.isDown && this.space.downDuration(1)){
                
                
            }
        }
        else if(this.CurrentPosition==2){
            this.heart.position.x=160;
            this.heart.position.y=107;
            if(this.space.isDown && this.space.downDuration(1)){
                
                
            }
        }
        //añadir controles teclado
        
    },
    
    
    ReadSave:function(){
      
        
        
        
        
    },
    
   
    
    changeScene:function(){
        
        zelda.game.state.start("overworld");    
    }
}