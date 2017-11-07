var zelda = zelda || {};

zelda.game = new Phaser.Game(256,512,Phaser.AUTO, null, this, false, false);
zelda.game.state.add("main", zelda.gameState);
zelda.game.state.start("main");