///<reference path="../reference.ts" />

module Rosemary.State {
  export class Main extends Phaser.State {

  	player: Prefab.Player;
  	entityPool: any;
  	worldGroup: any;
  	entityFactory: EntityFactory;

    create() {
      this.stage.disableVisibilityChange = true;
      this.stage.backgroundColor = 0x000000;
      this.entityFactory = new EntityFactory();
      this.entityPool = [];
      this.worldGroup = this.game.add.group();
      for(var i=0;i<6;i++) this.entityPool.push(new Prefab.Entity(this.game,0,0,'null'));
      this.player = new Prefab.Player(this.game, 10,10);

      this.setEventHandlers();
    }

    update() {
    	for(var i=this.entityPool.length-1;i>=0;i--) {
    		if(this.entityPool[i].exists) {
    			this.entityPool[i].exists = true;
    			this.worldGroup.add(this.entityPool.splice(i,1)[0]);
    		}
    	}
    }

    setEventHandlers() {
    	var main = this;
    	Game.socket.on('new player', function(data) {
    		console.log('Player entered world: ('+data.x+','+data.y+') '+data.id);
    		main.entityPool[0].id = data.id;
    		main.entityPool[0].x = data.x;
    		main.entityPool[0].y = data.y;
    		main.entityPool[0].exists = true;
    		});
    	Game.socket.on('player moved', function(data) {
    		//console.log(data.id+' moved to ('+data.x+','+data.y+')');
    		main.worldGroup.forEach(function(ent) {
    			if(data.id == ent.id) {
    				ent.x = data.x;
    				ent.y = data.y;
    			}
    			}, 'this')
    		});
		}

  }
}