module Rosemary.Prefab {
  export class Player extends Entity {
    
    upKey: any;
    downKey: any;
    leftKey: any;
    rightKey: any;

    // store previous coordinates for server updates on diff
    prevX: number;
    prevY: number;

    socket: any;

    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y);
      
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

      game.add.existing(this);
    }

    update() {

      if(this.upKey.isDown) {
          this.y--;
          //this.socket.emit('moved', {x:this.x,y:this.y});
      }
      if(this.downKey.isDown) {
          this.y++;
          //this.socket.emit('moved', {x:this.x,y:this.y});
      }
      if(this.leftKey.isDown) {
          this.x--;
          //this.socket.emit('moved', {x:this.x,y:this.y});
      }
      if(this.rightKey.isDown) {
          this.x++;
          //this.socket.emit('moved', {x:this.x,y:this.y});
      }
    }

  }
}