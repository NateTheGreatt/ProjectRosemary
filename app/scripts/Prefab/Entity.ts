module Rosemary.Prefab {
  export class Entity extends Phaser.Sprite {

    id: String;

    constructor(game: Phaser.Game, x: number, y: number, id: string) {
      super(game, x, y, 'entity', 0);
      this.id = id;
      this.exists = false;

    }

    update() {
    }
  }
}