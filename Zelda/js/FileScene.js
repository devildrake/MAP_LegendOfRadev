var zelda = zelda || {};

zelda.FileScene = {
	
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //cantidades de posiciones de cada estado y la posicion actual
        this.positionsSelectMax=5;
        this.CurrentPosition=1;
        this.slotSelected=0;
        this.slotOccupied1=0;
        this.slotOccupied2=0;
        this.slotOccupied3=0;
        
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
        this.load.audio("keyboard","sounds/Sfx/selectKeyboard.WAV");
        this.load.audio("menu","sounds/Sfx/moveMenu.WAV");
        
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
        this.strAux="";
        this.KeyboardpositionX=[44,60,76,92,108,124,140,156,172,188,204,220]
        this.KeyboardpositionY=[120,137,153,167];
        this.Keyboard=false;
        this.i=0;
        this.j=0;
        this.canSave=false;
        this.goingDelete=false;
        this.SfxKeyboard = this.add.audio("keyboard");
        this.SfxMenu = this.add.audio("menu");
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
            this.SfxMenu.play();
            if(this.CurrentPosition!=1){
                this.CurrentPosition-=1;
            }else{
                this.CurrentPosition=3;
            }
            
        }else if(this.cursors.down.isDown && this.cursors.down.downDuration(.5) && this.CurrentPosition!=4 && this.CurrentPosition!=5){
            this.SfxMenu.play();
             if(this.CurrentPosition!=3){
                this.CurrentPosition+=1;
            }else{
                this.CurrentPosition=1;
            }
            
            
            }
        if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && this.CurrentPosition==4){
            this.SfxMenu.play();
            
                this.CurrentPosition+=1; console.log("entra");
            }
        
        else if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && this.CurrentPosition==5){
            this.SfxMenu.play();
                this.CurrentPosition-=1;
            }
        
        if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && this.CurrentPosition==5){
            this.SfxMenu.play();
                this.CurrentPosition-=1;
            }      
        
        else if(this.cursors.down.isDown && this.cursors.down.downDuration(1) && this.CurrentPosition==4){
            this.SfxMenu.play();
                this.CurrentPosition+=1;
            }
        
        //pintar
        if(this.CurrentPosition==1){
            
            this.heart.position.x=33;
            this.heart.position.y=90;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.SfxKeyboard.play();
                this.slotSelected=1;
                this.CurrentPosition=4;
               if(this.delete==true){
                   localStorage.removeItem("save"+this.slotSelected);
                   this.delete=false;
                   this.texto1.kill();
               } else{
                if(zelda.gameOptions.load("save"+this.slotSelected)===null){
                    
                }
                else{
                    //zelda.gameOptions.loadsave=true;
                    zelda.gameOptions.load("save"+this.slotSelected);
                    zelda.game.state.start("overworld");    
                    
                }
                   this.CurrentPosition=4;
               }
            }
        }
        else if(this.CurrentPosition==2){
            this.heart.position.x=33;
            this.heart.position.y=115;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.SfxKeyboard.play();
                this.slotSelected=2;
                
                if(this.delete==true){
                   localStorage.removeItem("save"+this.slotSelected);
                   this.delete=false;
                   this.texto2.kill();
               } else{
                if(zelda.gameOptions.load("save"+this.slotSelected)===null){
                    
                }
                else{
                    //zelda.gameOptions.loadsave=true;
                    zelda.gameOptions.load("save"+this.slotSelected);
                    zelda.game.state.start("overworld");    
                    
                }
            this.CurrentPosition=4;
            }
            }
        }
        else if(this.CurrentPosition==3){
            this.heart.position.x=33;
            this.heart.position.y=137;
            if(this.space.isDown && this.space.downDuration(1)){
                this.slotSelected=3;
                this.SfxKeyboard.play();
                if(this.delete==true){
                   localStorage.removeItem("save"+this.slotSelected);
                   this.delete=false;
                   this.texto3.kill();
               } else{
                if(zelda.gameOptions.load("save"+this.slotSelected)===null){
                    
                }
                else{
                    //zelda.gameOptions.loadsave=true;
                    zelda.gameOptions.load("save"+this.slotSelected);
                    zelda.game.state.start("overworld");    
                    
                }
                 this.CurrentPosition=4;  
               }
            }
        }
        else if(this.CurrentPosition==4){
            this.heart.position.x=33;
            this.heart.position.y=165;
            if(this.space.isDown && this.space.downDuration(1)){
                this.SfxKeyboard.play();
                this.register=true;
                this.select=false;
                this.background.kill();
                this.background = this.game.add.sprite(0,0, "register");
                this.background.scale.setTo(1);
                this.heart.kill();
                this.heart= zelda.game.add.sprite(33,90, "corazon");
                this.CurrentPosition=1;
                this.str1="";
                this.str2="";
                this.str3="";
                if(zelda.gameOptions.load("save"+1)!==null){
                  this.texto1.kill();  
                }
                
                if(zelda.gameOptions.load("save"+2)!==null){
                    this.texto2.kill();
                }
                
                if(zelda.gameOptions.load("save"+3)!==null){
                   this.texto3.kill(); 
                }
                
            }
        }
        else if(this.CurrentPosition==5){
            this.heart.position.x=33;
            this.heart.position.y=180;
            if(this.space.isDown && this.space.downDuration(.5)){
                this.delete=true;
                this.SfxKeyboard.play();
                this.heart.kill();
                this.heart= zelda.game.add.sprite(33,90, "corazon");
                this.CurrentPosition=1;
                
            }
        }
        
        
        //pintar el nombre y los corazones del file
         if(zelda.gameOptions.load("save"+1)!==null){
                    var load1 = localStorage.getItem("save"+1);
                    //copiamos a una variable local
                   var obj1= JSON.parse(load1 );
                 this.texto1 = zelda.game.add.text(75,95, obj1.FileName);
                this.texto1.fill = "white";
                this.texto1.font = "Press Start 2P";
                this.texto1.fontSize =7;
                this.texto1.align = "center";
            
        
                }
         if(zelda.gameOptions.load("save"+2)!==null){
                      var load2 = localStorage.getItem("save"+2);
                    //copiamos a una variable local
                   var obj2= JSON.parse(load2 );
                 this.texto2 = zelda.game.add.text(75,95, obj2.FileName);
                this.texto2.fill = "white";
                this.texto2.font = "Press Start 2P";
                this.texto2.fontSize =7;
                this.texto2.align = "center";
            
                }
         if(zelda.gameOptions.load("save"+3)!==null){
                      var load3 = localStorage.getItem("save"+3);
                    //copiamos a una variable local
                   var obj3= JSON.parse(load3 );
                this.texto3 = zelda.game.add.text(75,95, obj3.FileName);
                this.texto3.fill = "white";
                this.texto3.font = "Press Start 2P";
                this.texto3.fontSize =7;
                this.texto3.align = "center";
             
                }
        
        
    },
    
    //registrar file
    RegisterControls:function(){
        
        //mover el cursor/corazon
        if(this.cursors.left.isDown && this.cursors.left.downDuration(.5) && this.Keyboard==false){
            this.SfxMenu.play();
            if(this.CurrentPosition!=0){
                this.CurrentPosition-=1;
            }else{
                this.CurrentPosition=this.positionsSelectMax;
            }
            
        }else if(this.cursors.right.isDown && this.cursors.right.downDuration(.5) && this.Keyboard==false){
            this.SfxMenu.play();
             if(this.CurrentPosition!=this.positionsSelectMax){
               this.CurrentPosition+=1;
            }else{
                this.CurrentPosition=0;
            }
            
            
            }
        if(((this.cursors.up.isDown && this.cursors.up.downDuration(1)) || (this.cursors.down.isDown && this.cursors.down.downDuration(1)))){
            this.Keyboard=!this.Keyboard;
            this.SfxMenu.play();
            //console.log(this.Keyboard);
            this.i=0;
            this.j=0;
        }
        
        //pintar
        if(this.CurrentPosition==1 && this.Keyboard==false ){
            this.heart.position.x=65;
            this.heart.position.y=107;
            if(this.space.isDown && this.space.downDuration(1) && this.canSave==true ){
                //poner register
                  this.SfxKeyboard.play();

                       
                    if(this.slotSelected){
                        zelda.Inventory.StrSave=this.str1;
                    }else if(this.slotSelected){
                        zelda.Inventory.StrSave=this.str2;
                    }else if(this.slotSelected){
                        zelda.Inventory.StrSave=this.str3;
                    }
                    var str="save"+this.slotSelected;
                    zelda.gameOptions.save(str);
                zelda.game.state.start("overworld");
                  
            
            }
            this.canSave=true;
        }
        else if(this.CurrentPosition==2 && this.Keyboard==false){
            this.heart.position.x=160;
            this.heart.position.y=107;
            if(this.space.isDown && this.space.downDuration(1)){
                //poner "funcion" end
                this.SfxKeyboard.play();
                this.register=false;
                this.select=true;
                this.background.kill();
                this.background = this.game.add.sprite(0,0, "select");
                this.background.scale.setTo(1);
                this.heart.kill();
                this.heart= zelda.game.add.sprite(33,90, "corazon");
                this.CurrentPosition=1;
                this.slotSelected=0;
                this.canSave=false;
                //aqui faltara poner q se muevan los nombres de los files ya existentes
            }
        }
        //añadir controles teclado
        
        if(this.Keyboard==true){
            //pintar texto str en posicion dependiendo del file que vas a rellenar
            
            
            //movimiento en keyboard
            this.heart.position.x=this.KeyboardpositionX[this.i];
            this.heart.position.y=this.KeyboardpositionY[this.j];
            
            if(this.cursors.right.isDown && this.cursors.right.downDuration(.5)){
                this.SfxMenu.play();
                this.i++;
                if(this.i>=11 && this.j>=4){
                    this.i=0;
                    this.j=0;
                }
                else if(this.i==11){
                    this.i=0;
                    this.j++;
                }
                
                
            }
            if(this.cursors.left.isDown && this.cursors.left.downDuration(.5)){
                this.SfxMenu.play();
                this.i--;
                if(this.i<0 && this.j<=0){
                    this.i=10;
                    this.j=3;
                }
                else if(this.i<0){
                    this.i=10;
                    this.j--;
                }
                
                
            }
            
            //seleccionar letra, añadirla al string pertinente
            
            if(this.space.isDown && this.space.downDuration(.5)){
               this.SfxKeyboard.play();
                if(this.i==0){
                    if(this.j==0){
                        this.strAux="A";
                    }else if(this.j==1){
                        this.strAux="L";
                    }else if(this.j==2){
                        this.strAux="W";
                    }
                    else if(this.j==3){
                        this.strAux="0";
                    }
                }
                else if(this.i==1){
                    if(this.j==0){
                        this.strAux="B";
                    }else if(this.j==1){
                        this.strAux="M";
                    }else if(this.j==2){
                        this.strAux="X";
                    }
                    else if(this.j==3){
                        this.strAux="1";
                    }
                }
                else if(this.i==2){
                    if(this.j==0){
                        this.strAux="C";
                    }else if(this.j==1){
                        this.strAux="N";
                    }else if(this.j==2){
                        this.strAux="Y";
                    }
                    else if(this.j==3){
                        this.strAux="2";
                    }
                }
                else if(this.i==3){
                    if(this.j==0){
                        this.strAux="D";
                    }else if(this.j==1){
                        this.strAux="O";
                    }else if(this.j==2){
                        this.strAux="Z";
                    }
                    else if(this.j==3){
                        this.strAux="3";
                    }
                }
                else if(this.i==4){
                    if(this.j==0){
                        this.strAux="E";
                    }else if(this.j==1){
                        this.strAux="P";
                    }else if(this.j==2){
                        this.strAux="-";
                    }
                    else if(this.j==3){
                        this.strAux="4";
                    }
                }
                else if(this.i==5){
                    if(this.j==0){
                        this.strAux="F";
                    }else if(this.j==1){
                        this.strAux="Q";
                    }else if(this.j==2){
                        this.strAux=".";
                    }
                    else if(this.j==3){
                        this.strAux="5";
                    }
                }
                else if(this.i==6){
                    if(this.j==0){
                        this.strAux="G";
                    }else if(this.j==1){
                        this.strAux="R";
                    }else if(this.j==2){
                        this.strAux=",";
                    }
                    else if(this.j==3){
                        this.strAux="6";
                    }
                }
                else if(this.i==7){
                    if(this.j==0){
                        this.strAux="H";
                    }else if(this.j==1){
                        this.strAux="S";
                    }else if(this.j==2){
                        this.strAux="!";
                    }
                    else if(this.j==3){
                        this.strAux="7";
                    }
                }
                else if(this.i==8){
                    if(this.j==0){
                        this.strAux="I";
                    }else if(this.j==1){
                        this.strAux="T";
                    }else if(this.j==2){
                        this.strAux="'";
                    }
                    else if(this.j==3){
                        this.strAux="8";
                    }
                }
                else if(this.i==9){
                    if(this.j==0){
                        this.strAux="J";
                    }else if(this.j==1){
                        this.strAux="U";
                    }else if(this.j==2){
                        this.strAux="&";
                    }
                    else if(this.j==3){
                        this.strAux="9";
                    }
                }
                else if(this.i==10){
                    if(this.j==0){
                        this.strAux="K";
                    }else if(this.j==1){
                        this.strAux="V";
                    }else if(this.j==2){
                        this.strAux=".";
                    }
                    else if(this.j==3){
                        this.strAux=" ";
                    }
                }
               
               //ahora se lo sumamos al string correspondiente
                    if(this.slotSelected==1){
                        
                        this.str1+=this.strAux;
                    }
                    else if(this.slotSelected==2){

                            this.str2+=this.strAux;
                        }
                    else if(this.slotSelected==3){

                                this.str3+=this.strAux;
                            }
            
                
            console.log("click");
            
           
        }
            
             //pintar el string pertinente
            if(this.slotSelected==1){
                  
                this.texto1 = zelda.game.add.text(100,45, this.str1);
                this.texto1.fill = "white";
                this.texto1.font = "Press Start 2P";
                this.texto1.fontSize =7;
                this.texto1.align = "center";
                
            }
            
            else if(this.slotSelected==2){
                
                this.texto2 = zelda.game.add.text(100,68, this.str2);
                this.texto2.fill = "white";
                this.texto2.font = "Press Start 2P";
                this.texto2.fontSize =7;
                this.texto2.align = "center";
                
                
             }
            else if(this.slotSelected==3){

               this.texto3 = zelda.game.add.text(100,90, this.str3);
                this.texto3.fill = "white";
                this.texto3.font = "Press Start 2P";
                this.texto3.fontSize =7;
                this.texto3.align = "center";
                
            }
            
            
        }
        //pintar aqui si ya hay un slot ocupado
            if(zelda.gameOptions.load("save"+1)!==null){
                  this.texto1.position.x=100;
                  this.texto1.position.y=45;
                }
                
                if(zelda.gameOptions.load("save"+2)!==null){
                    this.texto2.position.x=100;
                  this.texto2.position.y=68;
                }
                
                if(zelda.gameOptions.load("save"+3)!==null){
                   this.texto1.position.x=100;
                  this.texto1.position.y=90;
                }
        
    },
    
    
    ReadSave:function(){
      
        
        
        
        
    },
    
   
    
    changeScene:function(){
        
        zelda.game.state.start("overworld");    
    }
}