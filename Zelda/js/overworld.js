var zelda = zelda || {}

zelda.overworld = {
    preload:function(){
        this.load.tilemap("map", "json/MapaZeldaOverWorld16x11.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("OverWorldTileSheetBien16x16", "img/tilesets/OverWorldTileSheetBien16x16.png");
    },
    
    create:function(){
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("OverWorldTileSheetBien16x16");
        this.map.createLayer("world");
    },
    
    update:function(){
        
    }
}