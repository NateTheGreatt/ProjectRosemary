module Rosemary.Prefab {
  export class Entity extends Phaser.Group {

    id: String;
    sprite: Phaser.Sprite;
    name: any;

    constructor(game: Phaser.Game, x: number, y: number, id: string) {
      super(game, undefined, id, true, true);
      this.id = id;
      this.exists = false;
      this.visible = false;
      this.x = x;
      this.y = y;
      this.sprite = this.create(0,0,'entity');
      this.name = game.add.text(x,y,this.name,{ font: "12pt Arial", fill: "#ffffff" });
      this.add(this.name);

      game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    }

    live() {
      this.exists = true;
      this.visible = true;
    }

    update() {
    }
  }
}