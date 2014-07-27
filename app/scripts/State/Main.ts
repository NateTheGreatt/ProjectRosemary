///<reference path="../reference.ts" />

module Rosemary.State {
  export class Main extends Phaser.State {

  	player: Prefab.Player;
  	entityPool: any;
  	worldGroup: any;
  	entityFactory: EntityFactory;

    create() {
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.stage.disableVisibilityChange = true;
      this.stage.backgroundColor = 0x000000;
      this.entityFactory = new EntityFactory();
      this.entityPool = [];
      this.worldGroup = this.game.add.group();
      for(var i=0;i<100;i++) this.entityPool.push(new Prefab.Entity(this.game,0,0,'entity'));
      this.player = new Prefab.Player(this.game, 10,10);
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      this.setEventHandlers();
    }

    update() {
    	this.scanEntityPool();
    	this.game.physics.arcade.collide(this.player, this.worldGroup, function(player,ent) {
    		console.log('yo');
    		},null,this)
    	this.game.physics.arcade.collide(this.worldGroup, this.worldGroup)
    }

    scanEntityPool() {
    	for(var i=this.entityPool.length-1;i>=0;i--) {
    		if(this.entityPool[i].exists) this.spawnEntity(i);
    	}
    }

    spawnEntity(i) {
 			//this.entityPool[i].reset();
 			this.worldGroup.add(this.entityPool.splice(i,1)[0]);
    }

    setEventHandlers() {
    	var main = this;

    	Game.socket.on('new player', function(data) {
	    	console.log('Player '+data.name+' entered world: ('+data.x+','+data.y+') '+data.id);
	    	// because the update loop is constantly scanning the entityPool,
	  		// we can use any index here and the item will be spawned
	  		for(var i=0;i<main.entityPool.length;i++) {
	  			if(!main.entityPool[i].exists) {
	  				console.log('new guy');
			  		main.entityPool[i].id = <string>data.id;
			  		main.entityPool[i].name = <string>data.name;
			  		//main.entityPool[i].reset(data.x,data.y);
			  		main.entityPool[i].x = data.x;
			  		main.entityPool[i].y = data.y;
			  		main.entityPool[i].exists = true;
			  		break;
	  			}
	  		}
    		});

    	Game.socket.on('player moved', function(data) {
    		//console.log(data.id+' moved to ('+data.x+','+data.y+')');
    		main.worldGroup.forEach(function(ent) {
    			if(data.id == ent.id) {
    				ent.x = data.x;
    				ent.y = data.y;
    				ent.name = data.name;
    			}
    			}, 'this', true)
    		});

    	Game.socket.on('remove player', function(data) {
    		main.worldGroup.forEach(function(ent) {
    			if(data.id == ent.id) {
    				ent.kill();
    				console.log(ent.name+' left the server');
    			}
    			}, 'this', true)
    		})
		}

  }
}