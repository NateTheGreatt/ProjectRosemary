///<reference path="../reference.ts" />

module Rosemary.Prefab {
  export class Player extends Phaser.Sprite {
    
    upKey: any;
    downKey: any;
    leftKey: any;
    rightKey: any;

    socket: any;

    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, 'entity', 0);
      
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

      game.add.existing(this);

      Game.socket.emit('new', {x: this.x, y: this.y, id: Game.socket.io.engine.id});
    }

    update() {

      if(this.upKey.isDown) {
          this.y--;
          Game.socket.emit('moved', {x:this.x,y:this.y, id: Game.socket.io.engine.id});
      }
      if(this.downKey.isDown) {
          this.y++;
          Game.socket.emit('moved', {x:this.x,y:this.y, id: Game.socket.io.engine.id});
      }
      if(this.leftKey.isDown) {
          this.x--;
          Game.socket.emit('moved', {x:this.x,y:this.y, id: Game.socket.io.engine.id});
      }
      if(this.rightKey.isDown) {
          this.x++;
          Game.socket.emit('moved', {x:this.x,y:this.y, id: Game.socket.io.engine.id});
      }

    }

  }
}