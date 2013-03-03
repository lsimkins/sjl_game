var OverlapTrigger = IgeEntity.extend({
  classId: 'OverlapTrigger',

  init: function () {
    IgeEntity.prototype.init.call(this);

    this._target = null;
    this._action = null;
  },

  target: function(entity) {
    if (entity !== undefined) {
      this._target = entity;
      return this;
    }

    return this._target;
  },

  onTrigger: function(action) {
    if (action !== undefined) {
      this._action = action;
      return this;
    }

    return this._action;
  },

  update: function(ctx) {
    IgeEntity.prototype.update.call(this, ctx);

    if (this.aabb().rectIntersect(this._target.aabb())) {
      this._action();
    }
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = OverlapTrigger; }