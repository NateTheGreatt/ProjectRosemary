///<reference path="../reference.ts" />

module Rosemary.State {
  export class Main extends Phaser.State {

  	player: Prefab.Player;

    create() {
      this.stage.backgroundColor = 0x000000;
      
      this.player = new Prefab.Player(this.game, 10,10);
    }
  }
}