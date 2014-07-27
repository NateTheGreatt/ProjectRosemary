///<reference path="../reference.ts" />

module Rosemary.Prefab {
  export class Player extends Entity {
    
    upKey: any;
    downKey: any;
    leftKey: any;
    rightKey: any;

    prevX: number;
    prevY: number;


    constructor(game: Phaser.Game, x: number, y: number) {
      if(this.getHtmlName()) var name = this.getHtmlName();
      else var name = 'player' 
      super(game, x, y, Game.socket.io.engine.id, name);
      
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

      this.exists = true;
      game.add.existing(this);

      Game.socket.emit('new', this.packet());
    }

    update() {
      this.controls();

      var htmlName = this.getHtmlName();
      if(htmlName != this.name) this.name = htmlName;

      if(this.x != this.prevX || this.y != this.prevY) {
        Game.socket.emit('moved', this.packet());
      }

      this.prevX = this.x;
      this.prevY = this.y;

      super.update();
    }

    getHtmlName() {
      return (<HTMLInputElement>document.getElementById('name')).value;
    }

    controls() {

      this.body.velocity.x = 0;
      this.body.velocity.y = 0;

      if(this.upKey.isDown) {
          this.body.velocity.y = -100;
      }
      if(this.downKey.isDown) {
          this.body.velocity.y = 100;
      }
      if(this.leftKey.isDown) {
          this.body.velocity.x = -100;
      }
      if(this.rightKey.isDown) {
          this.body.velocity.x = 100;
      }

      if(this.game.input.mousePointer.isDown) {

      }

    }

    packet() {
      return {x: this.x, y: this.y, id: Game.socket.io.engine.id, name: this.name};
    }

  }
}