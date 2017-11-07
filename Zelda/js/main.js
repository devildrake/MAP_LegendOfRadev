var zelda = zelda || {};

zelda.game = new Phaser.Game(512,512,Phaser.AUTO, null, this, false, false);
zelda.game.state.add("main", zelda.sala_secreta_1);
zelda.game.state.start("main");