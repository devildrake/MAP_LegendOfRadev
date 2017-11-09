var zelda = zelda || {}

//Objeto que existe para manejar los booleanos de comportamiento de las animaciones de link, pretendia hacer que las animaciones tambien formaran parte de este objeto y así poder usarlo siempre que quisieramos
//Pero al parecer no es posible tener un sprite dentro de un objeto o por lo menosno lo se hacer
var LinkObject = {
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

zelda.overworld = {
    preload:function(){
        this.load.tilemap("map", "json/MapaZeldaOverWorld16x11.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("OverWorldTileSheetBien16x16", "img/tilesets/OverWorldTileSheetBien16x16.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
    },

    create:function(){
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("OverWorldTileSheetBien16x16");
        
        ///Ya se crean las dos capas, Obstacles y ground
        this.map.createLayer("Ground");
        this.map.createLayer("Obstacles");
        
        //Inputs, flechas para andar y Space para atacar por ahora
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        //Spritesheet de Link, con sus animaciones de movimiento (LAS DE ATAQUE SON FRAMES QUIETOS) al que se aplican las físicas
        this.Link = this.game.add.sprite(0,0, "Link");
        this.Link.scale.setTo(1);
        this.Link.anchor.x = 0.5;
        this.Link.anchor.y = 0.5;
		this.Link.animations.add("movingDown", [0,1], 5, true);
        this.Link.animations.add("movingUp", [2], 5, true);
        this.Link.animations.add("movingSideWays", [3,4],5,true);
		this.Link.animations.add("movingDownHurt", [14,15], 5, true);
        this.Link.animations.add("movingUpHurt", [16], 5, true);
        this.Link.animations.add("movingSideWaysHurt", [17,18],5,true);        
        
        this.game.physics.arcade.enable(this.Link);
            
    },
    
    update:function(){
        
        //Se reinicia la velocidad a 0 a cada frame           
        this.Link.body.velocity.setTo(0);        
        
        //La barra espaciadora pone attacking en true
        if(this.space.isDown){
            LinkObject.attacking = true;
            LinkObject.hurt = true;
        }
        
        if(LinkObject.hurt&&!LinkObject.calledNotHurt){
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5,this.NotHurt , this);
            LinkObject.calledNotHurt = true;
        }
        
        //Comportamiento si attacking es false, es el movimiento con las flechas 
        if(!LinkObject.attacking){
            if(this.cursors.left.isDown){
                this.Link.body.velocity.x = -gameOptions.linkSpeed;
                
                if(LinkObject.hurt)
                    this.Link.animations.play("movingSideWaysHurt");
                else
                    this.Link.animations.play("movingSideWays");
                
                this.Link.scale.x = -1;
                LinkObject.ResetLooking();
                LinkObject.lookingLeft = true;
            }else if(this.cursors.right.isDown){
                
                if(LinkObject.hurt)
                    this.Link.animations.play("movingSideWaysHurt");
                else
                    this.Link.animations.play("movingSideWays");
                
                this.Link.scale.setTo(1);
                this.Link.body.velocity.x = gameOptions.linkSpeed;
                LinkObject.ResetLooking();

            }else if(this.cursors.up.isDown){
                if(!LinkObject.switched){
                    LinkObject.switched = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 0.15,this.switchLinkScale , this);
                }
                this.Link.body.velocity.y = -gameOptions.linkSpeed;
                
                if(LinkObject.hurt)
                    this.Link.animations.play("movingUpHurt");
                else
                    this.Link.animations.play('movingUp');
                
                LinkObject.ResetLooking();
                LinkObject.lookingUp = true;

            }else if(this.cursors.down.isDown){
                this.Link.scale.setTo(1);
                this.Link.body.velocity.y = gameOptions.linkSpeed;
                
                if(LinkObject.hurt)
                    this.Link.animations.play("movingDownHurt");
                else
                    this.Link.animations.play('movingDown');
                
                LinkObject.ResetLooking();
                LinkObject.lookingDown = true;
            }
            else {
                if(LinkObject.lookingUp){
                    this.Link.animations.stop();
                }else if(LinkObject.lookingLeft){
                    this.Link.scale.x = -1;
                    if(LinkObject.hurt)
                        this.Link.frame = 14;
                    else 
                        this.Link.frame = 4;
                }else if(LinkObject.lookingDown){
                    if(LinkObject.hurt)
                        this.Link.frame = 14;
                    else    
                        this.Link.frame = 0;
                }else{
                    if(LinkObject.hurt)
                        this.Link.frame = 18;
                    else 
                        this.Link.frame = 4;
                }
            }
        }
        //Comportamiento si aun no se ha hecho invoke al método que pone attacking en false
        else if(!LinkObject.calledNotAttack){
            if(LinkObject.lookingDown){
                this.Link.scale.setTo(1);
                
                if(LinkObject.hurt)
                    this.Link.frame = 23;
                else    
                    this.Link.frame = 9;
                
            }else if(LinkObject.lookingUp){
                this.Link.scale.setTo(1);
                
                if(LinkObject.hurt)
                    this.Link.frame = 24;
                else
                    this.Link.frame = 10;
                
            }else if(LinkObject.lookingLeft){
                this.Link.scale.x = -1;
                if(LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }else{this.Link.scale.setTo(1);
                if(LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }
            
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5,this.makeLinkNotAttack , this);
            LinkObject.calledNotAttack = true;
            console.log(LinkObject.attacking);
            
            
        }
        //Comportamiento si ya se ha hecho el invoke al método que pone attacking en false pero aun no se ha llamado a dicho método
        else{
            if(LinkObject.lookingDown){
                if(LinkObject.hurt)
                    this.Link.frame = 23;
                else
                    this.Link.frame = 9;
            }else if(LinkObject.lookingUp){
                this.Link.scale.setTo(1);
                if(LinkObject.hurt)
                    this.Link.frame = 24;
                else
                    this.Link.frame = 10;
            }else if(LinkObject.lookingLeft){
                if(LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }else{
                if(LinkObject.hurt)
                    this.Link.frame = 25;
                else
                    this.Link.frame = 11;
            }
        }
    },
    
    //Método para animar el andar hacia arriba
    switchLinkScale:function(){
        if(this.Link.scale.x==-1)
      this.Link.scale.x = 1;  
        else{
            this.Link.scale.x = -1;
        }        
        LinkObject.switched = false;
    },
    
    //Método para hacer que attacking sea false, a este se le hace invoke y sirve tambien para poner los frames de movimiento después de que pare de atacar utilizando loos booleanos looking
    makeLinkNotAttack:function(){
    LinkObject.attacking = false;
    LinkObject.calledNotAttack = false;
        if(LinkObject.lookingDown){
            this.Link.scale.setTo(1);
            this.Link.frame = 0;
        }else  if(LinkObject.lookingUp){
            this.Link.scale.setTo(1);
            this.Link.frame = 2;
        }else if(LinkObject.lookingLeft){
            this.Link.scale.x=-1;
            this.Link.frame = 4;
        }else{
            this.Link.scale.setTo(1);
            this.Link.frame = 4;
        }
    },
    
    NotHurt:function(){
    LinkObject.calledNotHurt = false;
    LinkObject.hurt = false;
    }
}