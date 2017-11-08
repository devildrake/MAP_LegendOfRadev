var zelda = zelda || {};

zelda.game = new Phaser.Game(512,480,Phaser.AUTO, null, this, false, false);
zelda.game.state.add("main", zelda.intro);
zelda.game.state.add("secret_room_1", zelda.sala_secreta_1);
zelda.game.state.start("main");