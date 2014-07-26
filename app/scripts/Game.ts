/// <reference path="reference.ts"/>

module Rosemary {
  export class Game extends Phaser.Game {

    // static so that the variable is globally available within the Rosemary module
    static socket: any;

    constructor(socket) {
      super(640, 480, Phaser.AUTO, 'game-div');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('main', State.Main);

      Game.socket = socket;
      Game.socket.on('connect', function(){ 
        console.log('Socket Connected with sessionId: '+Game.socket.io.engine.id)
        });
      Game.socket.on('disconnect', function(){
        console.log('Socket disconnected')
        });

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var socketio = io.connect('http://69.119.217.124:3000', {'forceNew': true});
  var game = new Rosemary.Game(socketio);
}