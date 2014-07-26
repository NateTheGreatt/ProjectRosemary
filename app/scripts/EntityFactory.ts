module Rosemary.Prefab {
  export class EntityFactory {

    constructor() {}
    
    create(game: Phaser.Game, x: number, y: number, id: string): Entity {
      return new Entity(game, x, y, id);
    }
  }
}