/**
 * CasinoRPG (http://casinorpg.com)
 * Copyright (c) 2012, GoldFire Studios, Inc.
 * http://goldfirestudios.com
 */

/**
 * Main game class that contains all classes and logic to run game.
 * and utilize map data.
 * @type {Main}
 */
var Main = IgeEntity.extend({
  classId: 'Main',

  /**
   * Initializes this class.
   */
  init: function () {},

  setupGame: function() {
    var self = this;

    self.mainScene = new IgeScene2d()
      .drawBounds(true)
      .id('mainScene');

    self.backScene = new IgeScene2d()
      .layer(1)
      .id('backScene')
      .mount(self.mainScene);

    self.gameScene = new IgeScene2d()
      .layer(2)
      .id('gameScene')
      .mount(self.mainScene);

    // Create the main viewport and set the scene
    // it will "look" at as the new scene1 we just
    // created above
    self.vp1 = new IgeViewport()
      .id('vp1')
      .autoSize(true)
      .scene(self.mainScene)
      .mount(ige);

    // Floor Texture
    var floorTexData = self.convertTiledLayerToIge(MapData.level1.layers.floor);

    self.floorMap = new IgeTextureMap(32, 32)
      .layer(1)
      .loadMap({data: floorTexData})
      .mount(self.backScene);

    self.floorMap.addTexture(ige.textures.tex1);

    // Wall Texture
    var wallTexData = self.convertTiledLayerToIge(MapData.level1.layers.walls);

    self.wallMap = new IgeTextureMap(32, 32)
      .layer(2)
      .loadMap({data: wallTexData})
      .mount(self.backScene);

    self.wallMap.addTexture(ige.textures.tex1);

    // Object Texture
    var objectTexData = self.convertTiledLayerToIge(MapData.level1.layers.objects);

    self.objectMap = new IgeTextureMap(32, 32)
      .layer(3)
      .loadMap({data: objectTexData})
      .mount(self.backScene);

    self.objectMap.addTexture(ige.textures.tex1);

    self.vp1.camera.panTo(new IgePoint(500,200,0));

    // Player
    self.player = new Player()
      .mount(self.gameScene)
      .drawBounds(true)
      .translateTo(100,100,0)
      .setType(0)
      .addComponent(PlayerComponent);
  },

  convertTiledLayerToIge: function(layer) {
    var convertedLayer = [];
    var tile;
    for (var i=0; i<layer.height; i++) {
      convertedLayer[i] = [];
      for (var j=0; j<layer.width; j++) {
        tile = layer.data[i * layer.width + j];
        if (tile === 0) {
          convertedLayer[i][j] = null;
        } else {
          convertedLayer[i][j] = [0, tile];
        }
      }
    }

    return convertedLayer;
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Main; }