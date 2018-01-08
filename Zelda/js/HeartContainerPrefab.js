var zelda = zelda || {};

zelda.HeartContainerPrefab = function(game,x,y,level){

	Phaser.Sprite.call(this,game,x,y,"HeartContainer");
    this.scale.setTo(1);
    this.anchor.setTo(.5);
	this.game.physics.arcade.enable(this);
    this.level = level;
    this.Alive = true;
}


zelda.HeartContainerPrefab.prototype = Object.create(Phaser.Sprite.prototype);

zelda.HeartContainerPrefab.prototype.constructor = zelda.HeartContainerPrefab;

zelda.HeartContainerPrefab.prototype.update = function(){
    //console.log(this.level.linkInstance);
    if(this.Alive){
    this.game.physics.arcade.overlap(this,this.level.linkInstance,
        function(heartContainer,linkInstance){
        //eliminar los corazones de antes
        for(var i=0;i< zelda.LinkObject.maxHearts;i++){
            zelda.Inventory.hearts[i].destroy();
         }
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                zelda.Inventory.heart[i].destroy();
            }else{
                if(i==zelda.LinkObject.currentHearts-.5){
                    zelda.Inventory.heart[i].destroy();


                }else{
                    zelda.Inventory.heart[i].destroy();
                }                   
            }
        }
        
        zelda.LinkObject.maxHearts++;
        zelda.LinkObject.currentHearts = zelda.LinkObject.maxHearts;
        zelda.Inventory.heart=[zelda.LinkObject.maxHearts];
        zelda.Inventory.hearts=[zelda.LinkObject.maxHearts];
        
        //pintar los corazones
        for(var i=0;i< zelda.LinkObject.maxHearts;i++){
            zelda.Inventory.hearts[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "emptyHeart");
            zelda.Inventory.hearts[i].position.x=zelda.game.camera.x+175+10*i;
            zelda.Inventory.hearts[i].position.y=zelda.game.camera.y+15;
         }
        for(var i=0;i< zelda.LinkObject.currentHearts;i++){
            if(zelda.LinkObject.currentHearts==1 || zelda.LinkObject.currentHearts==2 || zelda.LinkObject.currentHearts==3 || zelda.LinkObject.currentHearts==4 || zelda.LinkObject.currentHearts==5){
                zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
            }else{
                if(i==zelda.LinkObject.currentHearts-.5){
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "HalfHeart");
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;


                }else{
                    zelda.Inventory.heart[i]=zelda.game.add.sprite(zelda.game.camera.x+50*i,zelda.game.camera.y+20, "corazon");
                    zelda.Inventory.heart[i].position.x=zelda.game.camera.x+175+10*i;
                    zelda.Inventory.heart[i].position.y=zelda.game.camera.y+15;
                }                   
            }
        }
        
        heartContainer.kill();
        zelda.LinkPrefab.grabItemSound.play();
        this.Alive = false;
        
        if(heartContainer.level!=zelda.overworld&&heartContainer.level!=zelda.dungeon){
            //console.log(heartContainer.level);
            heartContainer.level.roomDone=true;
        }
        
        } );
    }
    
}