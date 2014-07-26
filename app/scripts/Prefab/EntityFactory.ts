module Rosemary {
  export class EntityFactory {

    constructor() {}
    
    create(game: Phaser.Game, x: number, y: number, id: string): Prefab.Entity {
      return new Prefab.Entity(game, x, y, id);
    }
  }
}