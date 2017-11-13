var zelda = zelda || {};
//16X11 tiles
zelda.sala_secreta_A = {
	init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(zelda.gameOptions.gameWidth/2,zelda.gameOptions.gameHeight/2);
	},
	
    preload:function(){
        //this.game.stage.backgroundColor = "#ff0000";
        this.game.stage.backgroundColor = "#black";
        //----------Tiles del layaut base------------
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        //-------------------------------------------
        this.load.spritesheet("fuego", "img/fuego.png",17,15);
        this.load.spritesheet("npc", "img/oldman.png",16,16);
        this.load.image("pocion","img/pocion_vida.png");
        this.load.image("corazon","img/slot_corazon.png");
    },
    
    create:function(){
		this.allElements=[];
        this.map = this.game.add.tilemap("sala1");
        this.map.addTilesetImage("secret_tile");
        this.map.createLayer("Rocas");
		this.allElements.push(this.map);
        
        //fuego y animacion de este
        this.fire = [];
        this.fire.push(this.game.add.sprite(5*16,4*16,"fuego",0));
        this.fire.push(this.game.add.sprite(10*16,4*16,"fuego",0));
        for(var i in this.fire){
            this.fire[i].animations.add("idle",[0,1],6,true);
            this.fire[i].animations.play("idle");
        }
        
        //npc
        this.npc = this.game.add.sprite(8*16, 4*16, "npc", 0);
        this.npc.anchor.setTo(.5,0);
        
        //objetos
        this.corazon = this.game.add.sprite(6*16, 6*16,"corazon");
        this.pocion = this.game.add.sprite(9*16, 6*16, "pocion");
		
		 this.game.camera.y -= 47;
    },
    
    update:function(){
        
    }
};