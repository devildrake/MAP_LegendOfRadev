var zelda = zelda || {}

zelda.overworld = {
    preload:function(){
        this.load.tilemap("map", "json/MapaZeldaOverWorld16x11.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("OverWorldTileSheetBien16x16", "img/tilesets/OverWorldTileSheetBien16x16.png");
		this.load.spritesheet("Link", "img/Link_SpriteSheet.png",16,16);
    },
    
    create:function(){
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("OverWorldTileSheetBien16x16");
        this.map.createLayer("Ground");
        this.map.createLayer("Obstacles");
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.Link = this.game.add.sprite(0,0, "Link");
        this.Link.scale.setTo(1);
		this.Link.animations.add("movingDown", [0,1], 5, true);
		this.Link.animations.add("movingUp", [2], 5, true);
		this.Link.animations.add("movingSideWays", [3,4], 5, true);

        
        this.game.physics.arcade.enable(this.Link);

    },
    
    update:function(){
        
        
        this.Link.body.velocity.x = 0;
        this.Link.body.velocity.y = 0;
        
        if(this.cursors.left.isDown){
            this.Link.body.velocity.x = -gameOptions.linkSpeed;
            console.log("Bruh");
            this.Link.scale.x = -1;
            this.Link.animations.play('movingSideWays');
        }else if(this.cursors.right.isDown){
            this.Link.body.velocity.x = gameOptions.linkSpeed;
            this.Link.animations.play('movingSideWays');
            this.Link.scale.x = 1;
        }
        else if(this.cursors.up.isDown){
            this.Link.body.velocity.y = -gameOptions.linkSpeed;
            this.Link.animations.play('movingUp');
            
        }else if(this.cursors.down.isDown){
            this.Link.body.velocity.y = gameOptions.linkSpeed;
            //this.Link.scale=1;
            this.Link.animations.play('movingDown');
        }
        else{
            this.Link.frame = 0;
            this.Link.scale.setTo(1);

        }
    }
}