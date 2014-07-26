var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Rosemary;
    (function (Rosemary) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                _super.call(this, 640, 480, Phaser.AUTO, 'game-div');

                this.state.add('boot', State.Boot);
                this.state.add('preload', State.Preload);
                this.state.add('menu', State.Menu);
                this.state.add('main', State.Main);

                this.state.start('boot');
            }
            return Game;
        })(Phaser.Game);
        Rosemary.Game = Game;
    })(Rosemary || (Rosemary = {}));

    window.onload = function () {
        var game = new Rosemary.Game();
    };
});
//# sourceMappingURL=Game.js.map
