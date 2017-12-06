var zelda = zelda || {};

zelda.InventarioPrefab = function(game,x,y,level){
    
    Phaser.Sprite.call(this,game,0,-zelda.gameOptions.gameHeight+47,"inventario");    
    this.InvButton = game.input.keyboard.addKey(Phaser.Keyboard.I); 
    this.ObjbButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F); 
    this.movingCamera = false;
    //zelda.Inventory.startHUD();

    
    //INVENTARIO POR ENCIMA DE TODO LO DEMÁS
    this.game.add.existing(this);
    this.fixedToCamera = true;
    zelda.Inventory.startHUD();
    //for para pintar los corazones
    for(var i=0;i< zelda.LinkObject.currentHearts;i++){
        if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
        }else{
            if(i==zelda.LinkObject.currentHearts-.5){
                zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            
                            
            }else{
                zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            }                   
        }
    }
}
    

    zelda.InventarioPrefab.prototype = Object.create(Phaser.Sprite.prototype);
    zelda.InventarioPrefab.prototype.constructor = zelda.InventarioPrefab;


    //PRINCIPIO DEL UPDATE=========================================================================================================================================
    //PRINCIPIO DEL UPDATE=========================================================================================================================================

    zelda.InventarioPrefab.prototype.update = function(){
        
    zelda.InventarioPrefab.ScrollInventario(this);
    //quitar corazon cuando pierde uno
    if(zelda.LinkObject.hurt && zelda.LinkObject.currentHearts!=zelda.LinkObject.maxHearts){        
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            zelda.Inventory.heart[i].kill();
            if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                zelda.Inventory.heart[i+1].kill();
                zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            }else{
                if(i==zelda.LinkObject.currentHearts-.5){
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                }else{
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                }                   
            }
        }
    }
    //restablecer corazon cuando recoge uno
    if(zelda.Inventory.healed==true && zelda.LinkObject.currentHearts!=zelda.LinkObject.maxHearts){
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            zelda.Inventory.heart[i].kill();
            if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                zelda.Inventory.heart[i+1].kill();
       
                zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            }else{
                if(i==zelda.LinkObject.currentHearts-.5){   
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            
                            
                }else{
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                }                   
            }
        }
        zelda.Inventory.healed=false;
            
    }
    //volver a pintar los corazones si te curas
    if(zelda.Inventory.healed==true && zelda.LinkObject.currentHearts==zelda.LinkObject.maxHearts){
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            zelda.Inventory.heart[i].kill();
            zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
        }
    }
        
    zelda.Inventory.MovementCursor();
        
    //comprobar si puedes bajar el inventario y si lo estas cambiar el booleano para bajarlo    
    if(this.InvButton.isDown && zelda.Inventory.released && this.InvButton.downDuration(1)&&!zelda.LinkObject.attacking&&!zelda.LinkObject.hurt&&!zelda.LinkObject.invincible&&zelda.gameOptions.cameraArrivedPos){
        //console.log(this.inventario.position.y);
        zelda.gameOptions.InventoryScroll=zelda.game.camera.y;
        zelda.Inventory.released = false;
        zelda.Inventory.ScrollingInventory = true;
        console.log(zelda.Inventory.ScrollingInventory);

    }
        
    if(!this.InvButton.isDown ){
        zelda.Inventory.released = true;
    }
        
    if(this.ObjbButton.isDown && this.ObjbButton.downDuration(1)){
        //seleccionar el boton b y solo pintar el objb si habia algo en esa casilla
        if(zelda.Inventory.InvON==true){
            zelda.Inventory.SelecObjB();
            zelda.Inventory.PintarObjB();
            console.log(zelda.Inventory.ObjectB);}
        else{
                 
        }
    }
    //comprobar si la camara se esta moviendo    
    if(this.movingCamera){

        //poner aqui actualizacion objetos HUD para cuando se mueva
        //y cuando digo aqui no me refiero al for
        zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
        zelda.Inventory.texto.position.y=zelda.game.camera.y+10;  
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
            zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
        }
        //pintar corazones otra vez ahora q la camara se movio
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            }else{
                if(i==zelda.LinkObject.currentHearts-.5){
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15; 
                }else{
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                }                   
            }
        }
        //pintar el objeto B si hay alguno seleccionado
        if(zelda.Inventory.ObjectB!="nothing"){
            zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
            zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
            zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
            zelda.Inventory.PintObj.position.y=zelda.Inventory.PosObjBY;
                
        }
        //pintar espada si la tiene
        if(zelda.Inventory.HasSword){
            zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
            zelda.Inventory.sword.position.y=zelda.game.camera.y+27;

        }
    }
}
    
//funcion de bajar y subir el inventario
zelda.InventarioPrefab.ScrollInventario = function(inventario){
    //para pintar la espada, dont judge me
    if(zelda.Inventory.HasSword &&zelda.Inventory.equippedSword=="Bronze"){
        zelda.Inventory.sword = zelda.game.add.sprite(150+20, 190, "sword", 1);
        zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
        zelda.Inventory.sword.position.y=zelda.game.camera.y+27;
        zelda.Inventory.sword.anchor.setTo(.5);
        zelda.Inventory.sword.scale.setTo(1,-1);
        //zelda.Inventory.HasSword=false;
        zelda.Inventory.equippedSword="";
    }
    //comprobar si el inventario se esta moviendo
    if(zelda.gameOptions.InventoryScroll != 0){
        //comprobar si el inventario esta bajado
        if(zelda.Inventory.InvON==true){
            inventario.fixedToCamera = false;
            inventario.position.y-=1;
            inventario.position.y+=-zelda.game.camera.y;
            inventario.position.x+=-zelda.game.camera.x;
            inventario.fixedToCamera = true;
            //console.log(this.inventario.position.y);
                
            //"pintar" los objetos junto el inventario q sube y baja, pero los pinta debajo por x motivos
            for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=inventario.position.y+15;
                }else{
                    if(i==zelda.LinkObject.currentHearts-.5){
                        zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                        zelda.Inventory.heart[i].position.y=inventario.position.y+15;
                            
                    }else{
                        zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                        zelda.Inventory.heart[i].position.y=inventario.position.y+15;
                    }                   
                }
            }
                
            zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
            zelda.Inventory.texto.position.y=inventario.position.y+10; 
            //pintar espada
            if(zelda.Inventory.HasSword){ 
                zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                zelda.Inventory.sword.position.y=inventario.position.y+27;
            }
            //pintar objeto b si existe
            if(zelda.Inventory.ObjectB!="nothing"){
                zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
                zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
                zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
                zelda.Inventory.PintObj.position.y=inventario.position.y;
                
            }
            //pintar bombas si tienes
            if(zelda.Inventory.CreateBombs==true){
                zelda.Inventory.bomb.kill();
                zelda.Inventory.CreateBombs=false;
            }
            //pintar pociones si tienes  
            if(zelda.Inventory.CreatePotion==true){
                zelda.Inventory.potion.kill();
                zelda.Inventory.CreatePotion=false;
            }
            //pintar vela si tienes
            if(zelda.Inventory.CreateVela==true){
                zelda.Inventory.vela.kill();
                zelda.Inventory.CreateVela=false;
            }
            //eliminar el seleccionador
            zelda.Inventory.selec.kill();
            //pintar la espada si la tienes
            if(zelda.Inventory.HasSword){
                zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                zelda.Inventory.sword.position.y=inventario.position.y+27;
            }
            //comprobarsi el inventario esta subido (justo despues de haber pulsado i)
            if(inventario.position.y==-zelda.gameOptions.gameHeight+47){
                zelda.gameOptions.InventoryScroll=0;       
                //things
                console.log("cerrado");
                zelda.Inventory.ScrollingInventory = false;
                zelda.Inventory.selec.kill();
                 
                //"pintar" los objetos junto el inventario q sube y baja, pero los pinta debajo por x motivos
                for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                    //mover corazones otra vez
                    if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                        zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                        zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                        }else{
                            if(i==zelda.LinkObject.currentHearts-.5){
                                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            }else{
                                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                            }                   
                        }
                    }
                    //mover texto
                    zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
                    zelda.Inventory.texto.position.y=zelda.game.camera.y+10;
                    //mover espada
                    if(zelda.Inventory.HasSword){
                        zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                        zelda.Inventory.sword.position.y=zelda.game.camera.y+27;
                    }
                    //mover objeto b
                    if(zelda.Inventory.ObjectB=="nothing"){
                         //zelda.Inventory.PintObj.kill();

                    }
                    else{
                         zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
                         zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
                         zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
                         zelda.Inventory.PintObj.position.y=zelda.Inventory.PosObjBY;
                    }
                    //cambiar el bool del invOn
                    if(zelda.Inventory.InvON!=false){
                       zelda.Inventory.InvON=false; 
                    }
            }
        }
        else{
            inventario.fixedToCamera = false;
            inventario.position.y+=1;
            inventario.position.y+=-zelda.game.camera.y;
            inventario.position.x+=-zelda.game.camera.x;
            inventario.fixedToCamera = true;  
            //mas movimiento de corazones
            for(var i=0;i< zelda.LinkObject.currentHearts;i++){
                if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=inventario.position.y+15;
                }else{
                    if(i==zelda.LinkObject.currentHearts-.5){
                        zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                        zelda.Inventory.heart[i].position.y=inventario.position.y+15;
     
                    }else{
                        zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                        zelda.Inventory.heart[i].position.y=inventario.position.y+15;
                    }                   
                }
            }//end del for  
            if(zelda.Inventory.HasSword){
                        zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                        zelda.Inventory.sword.position.y=inventario.position.y+202;
                    }
                
                 zelda.Inventory.texto.position.x=zelda.game.camera.x+104;
                  zelda.Inventory.texto.position.y=inventario.position.y+10; 
                
                  if(zelda.Inventory.ObjectB!="nothing"){
                zelda.Inventory.PosObjBX=zelda.game.camera.x+124;
                     zelda.Inventory.PosObjBY=zelda.game.camera.y+18;
                     zelda.Inventory.PintObj.position.x=zelda.Inventory.PosObjBX;
                     zelda.Inventory.PintObj.position.y=inventario.position.y;
                
            }
            zelda.Inventory.MovementCursor();
            // console.log(this.inventario.position.y);
            if(inventario.position.y>=0){
                zelda.gameOptions.InventoryScroll=0;
                console.log("abierto");
                if(zelda.Inventory.HasSword){
                    zelda.Inventory.sword.position.x=zelda.game.camera.x+156;
                    zelda.Inventory.sword.position.y=zelda.game.camera.y+202;
                }
                zelda.Inventory.draw();
                if(zelda.Inventory.InvON!=true){
                   zelda.Inventory.InvON=true; 
                    zelda.Inventory.PintarObjB();
                }

            }
                
        }
    }     
}