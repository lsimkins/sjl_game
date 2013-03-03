// Define player class
var Player = Character.extend({
  classId: 'Player',

  init: function () {
    var self = this;
    Character.prototype.init.call(this);

    self.box2dBody({
      type: 'dynamic',
      linearDamping: 0.0,
      angularDamping: 0.1,
      allowSleep: true,
      bullet: true,
      gravitic: true,
      fixedRotation: true,
      fixtures: [{
        density: 1.0,
        friction: 0.5,
        restitution: 0.2,
        shape: {
          type: 'rectangle',
          data: {
            width: 10,
            height: 10
          }
        }
      }]
    });
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Player; }


