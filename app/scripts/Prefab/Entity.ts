module Rosemary.Prefab {
  export class Entity extends Phaser.Sprite {

    id: string;
    name: string;
    label: any;

    constructor(game: Phaser.Game, x: number, y: number, id: string, name: string = 'entity') {
      super(game,  x, y, name);
      this.id = id;
      this.name = name;
      //this.kill();
      this.x = x;
      this.y = y;
      this.label = game.add.text(x,y,name,{ font: "12pt Arial", fill: "#ffffff", align: "center" });
      this.label.anchor.setTo(0.5,0.5);
      this.label.y = -10;
      game.add.existing(this.label);
    }

    update() {
      this.positionName();
      if(this.name != this.label.text) {
        this.label.setText(this.name); 
      }
      super.update();
    }

    positionName() {
      var xx = this.x+14;
      var yy = this.y-10;
      if(this.label.x != xx || this.label.y != yy) {
        this.label.x = xx;
        this.label.y = yy;
      }
    }
  }
}