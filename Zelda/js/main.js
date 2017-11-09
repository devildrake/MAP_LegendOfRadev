var zelda = zelda || {};

var gameOptions = {
	gameWidth:512,
	gameHeight:480,
    linkSpeed:200
}

zelda.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO, null, this, false, false);
zelda.game.state.add("main", zelda.intro);
zelda.game.state.add("secret_room_1", zelda.sala_secreta_1);
zelda.game.state.add("overworld", zelda.overworld);
zelda.game.state.start("overworld");