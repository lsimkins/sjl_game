var KeyTrigger = IgeEntity.extend({
  classId: 'KeyTrigger',

  init: function () {
    IgeEntity.prototype.init.call(this);

    this._target = null;
    this._action = null;

    var self = this;
    ige.input.on('keyUp', function (event, keyCode) { 
      if (keyCode == ige.input.key.space && self._action) {
        if (self.aabb().rectIntersect(self._target.aabb())) {
          self._action();
        }
      }
    });
  },

  onTrigger: function(action) {
    if (action !== undefined) {
      this._action = action;
      return this;
    }

    return this._action;
  },

  target: function(entity) {
    if (entity !== undefined) {
      this._target = entity;
      return this;
    }

    return this._target;
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = KeyTrigger; }