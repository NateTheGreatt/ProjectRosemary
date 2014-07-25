module Rosemary.Prefab {
  export class Entity extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
      super(game, x, y, 'entity', 0);

      game.add.existing(this);
    }

    update() {
      // Update prefab here
    }
  }
}