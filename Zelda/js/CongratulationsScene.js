var zelda = zelda || {}

zelda.Congratulations = { 
	
    init:function(){
        this.game.world.setBounds(0,0,112*16,60*16);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(zelda.gameOptions.gameWidth,zelda.gameOptions.gameHeight);
        
    },
    
    preload:function(){
        this.load.image("Black","img/Blackout.png");
        this.t = this.game.load.bitmapFont("zelda_font","font/zelda_font.png","font/zelda_font.fnt");
    },

    create:function(){
        
        this.str  = "CONGRATULATIONS!";
        this.texto = this.game.add.bitmapText(3*16,16*2+4,"zelda_font",this.str,10);
		//this.texto = this.game.add.text(3*16,16*2+4,this.strToPrint);
        this.texto.align = "center";
        this.ranking=false;
        
        this.rank1=0;
        this.rank2=0;
        this.rank3=0;
        this.rank4=0;
        this.rank5=0;
        
        
        this.name1="";
        this.name2="";
        this.name3="";
        this.name4="";
        this.name5="";
        
    },
    
    update:function(){   
        
        setTimeout(function(){
                   
            zelda.Congratulations.texto.destroy();
            
            zelda.Congratulations.ranking=true;
            
            
                }, 3000);
        
    
        
        
        if(this.ranking){
            
            
            zelda.Congratulations.str  = "Local ranking";
            zelda.Congratulations.texto = zelda.Congratulations.game.add.bitmapText(3*16,16*2+4,"zelda_font",this.str,10);
		    //this.texto = this.game.add.text(3*16,16*2+4,this.strToPrint);
            zelda.Congratulations.texto.align = "center";
            
            
            var load = localStorage.getItem("ranking");
            //copiamos a una variable local
            this.obj= JSON.parse(load );
            
            //comprobamos si existe el archivo ranking
            if(this.obj===null){
                
                this.rank1=zelda.Inventory.ranking;
                var saveObject = {
                    name1: zelda.Inventory.StrSave,
                    name2: "",
                    name3: "",
                    name4: "",
                    name5: "",
                    rank1:this.rank1,
                    rank2:0,
                    rank3:0,
                    rank4:0,
                    rank5:0,
                };
        
                // localStorage only works with strings, so JSON.stringify first.
                localStorage.setItem("ranking", JSON.stringify(saveObject));
            }
            else{
                //cogemos los valores del ranking
                this.rank1=this.obj.rank1;
                this.rank2=this.obj.rank2;
                this.rank3=this.obj.rank3;
                this.rank4=this.obj.rank4;
                this.rank5=this.obj.rank5;
                
                
                this.name1=this.obj.name1;
                this.name2=this.obj.name2;
                this.name3=this.obj.name3;
                this.name4=this.obj.name4;
                this.name5=this.obj.name5;
            }
            
            
            //ordenamos los valores
            
            var points = [this.rank1, this.rank2, this.rank3, this.rank4, this.rank5, zelda.Inventory.ranking];
            points.sort(function(a, b){return b-a});
            
            var names = [this.name1, this.name2, this.name3, this.name4, this.name5,zelda.Inventory.StrSave];
            
            /*--------------------------------------------------------------------------------------------------------*/
            if(this.obj!==null){



                //mas lio para guardar nombres
                if(points[0]==this.obj.rank1){
                    names[0]=this.obj.name1;
                }
                else if(points[0]==this.obj.rank3){
                    names[0]=this.obj.name3;
                } 
                else if(points[0]==this.obj.rank4){
                    names[0]=this.obj.name4;
                } 
                else if(points[0]==this.obj.rank5){
                    names[0]=this.obj.name5;
                } 
                else if(points[0]==zelda.Inventory.ranking){
                    names[0]=zelda.Inventory.StrSave;
                } 

                if(points[1]==this.obj.rank1){
                    names[1]=this.obj.name1;
                }
                else if(points[1]==this.obj.rank3){
                    names[1]=this.obj.name3;
                } 
                else if(points[1]==this.obj.rank4){
                    names[1]=this.obj.name4;
                } 
                else if(points[1]==this.obj.rank5){
                    names[1]=this.obj.name5;
                } 
                else if(points[1]==zelda.Inventory.ranking){
                    names[1]=zelda.Inventory.StrSave;
                } 

                if(points[2]==this.obj.rank1){
                    names[2]=this.obj.name1;
                }
                else if(points[2]==this.obj.rank3){
                    names[2]=this.obj.name3;
                } 
                else if(points[2]==this.obj.rank4){
                    names[2]=this.obj.name4;
                } 
                else if(points[2]==this.obj.rank5){
                    names[2]=this.obj.name5;
                } 
                else if(points[2]==zelda.Inventory.ranking){
                    names[2]=zelda.Inventory.StrSave;
                } 

                if(points[3]==this.obj.rank1){
                    names[3]=this.obj.name1;
                }
                else if(points[3]==this.obj.rank3){
                    names[3]=this.obj.name3;
                } 
                else if(points[3]==this.obj.rank4){
                    names[3]=this.obj.name4;
                } 
                else if(points[3]==this.obj.rank5){
                    names[3]=this.obj.name5;
                } 
                else if(points[3]==zelda.Inventory.ranking){
                    names[3]=zelda.Inventory.StrSave;
                } 


                if(points[4]==this.obj.rank1){
                    names[4]=this.obj.name1;
                }
                else if(points[4]==this.obj.rank3){
                    names[4]=this.obj.name3;
                } 
                else if(points[4]==this.obj.rank4){
                    names[4]=this.obj.name4;
                } 
                else if(points[4]==this.obj.rank5){
                    names[4]=this.obj.name5;
                } 
                else if(points[4]==zelda.Inventory.ranking){
                    names[4]=zelda.Inventory.StrSave;
                } 
            }
            /*------------------------------------------------------------------------*/
            
            zelda.Congratulations.str  = "1-"+names[0]+"..........." +points[0];
            zelda.Congratulations.texto = zelda.Congratulations.game.add.bitmapText(3*6,16*4,"zelda_font",this.str,8);
		    
             zelda.Congratulations.str  = "2-"+names[1]+"..........." +points[1];
            zelda.Congratulations.texto = zelda.Congratulations.game.add.bitmapText(3*6,16*5,"zelda_font",this.str,8);
		    
             zelda.Congratulations.str  = "3-"+names[2]+"..........." +points[2];
            zelda.Congratulations.texto = zelda.Congratulations.game.add.bitmapText(3*6,16*6,"zelda_font",this.str,8);
		    
             zelda.Congratulations.str  = "4-"+names[3]+"..........." +points[3];
            zelda.Congratulations.texto = zelda.Congratulations.game.add.bitmapText(3*6,16*7,"zelda_font",this.str,8);
		    
             zelda.Congratulations.str  = "5-"+names[4]+"..........." +points[4];
            zelda.Congratulations.texto = zelda.Congratulations.game.add.bitmapText(3*6,16*8,"zelda_font",this.str,8);
            
            
            var saveObject = {
                name1: names[0],
                name2: names[1],
                name3: names[2],
                name4: names[3],
                name5: names[4],
                rank1:points[0],
                rank2:points[1],
                rank3:points[2],
                rank4:points[3],
                rank5:points[4],
            };
        
            // localStorage only works with strings, so JSON.stringify first.
            localStorage.setItem("ranking", JSON.stringify(saveObject));
		    
            
            
        }
    }

}