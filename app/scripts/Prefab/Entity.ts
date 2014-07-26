module Rosemary.Prefab {
  export class Entity extends Phaser.Group {

    id: string;
    sprite: Phaser.Sprite;
    name: string;
    label: any;

    constructor(game: Phaser.Game, x: number, y: number, id: string, name: string = 'entity') {
      super(game, undefined, id, true, true);
      this.id = id;
      this.name = name;
      this.exists = false;
      this.visible = false;
      this.x = x;
      this.y = y;
      this.sprite = this.create(0,0,'entity');
      this.label = game.add.text(x,y,name,{ font: "12pt Arial", fill: "#ffffff", align: "center" });
      this.label.anchor.setTo(0.5,0.5);
      this.label.y = -10;
      this.add(this.label);

      //game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    }

    live() {
      this.exists = true;
      this.visible = true;
    }

    update() {
      if(this.name != this.label.text) {
        this.label.setText(this.name); 
      }
    }

    kill() {
      this.exists = false;
      this.visible = false;
    }
  }
}