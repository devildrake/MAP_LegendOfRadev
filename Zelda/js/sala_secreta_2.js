var zelda = zelda || {}

zelda.sala_secreta_2 = {
    init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.setGameSize(512/2,480/2);
	},
    
    preload:function(){
        this.game.stage.backgroundColor = "#black";
        this.load.tilemap("sala", "json/Sala_Secreta.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("secret_tile", "img/tilesets/secret_tile.png");
        this.load.spritesheet("fuego", "img/fuego.png",17,15);
        this.load.spritesheet("npc", "img/oldman.png",16, 16);
    },
    
    create:function(){
        this.map = this.game.add.tilemap("sala");
        this.map.addTilesetImage("secret_tile");
        this.map.createLayer("Rocas");
        
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
    },
    
    update:function(){
        
    }
}