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
      .drawBounds(true)
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

    // Occupied tilemap
    var occupiedTiles = self.mergeTileData(wallTexData, objectTexData);

    self.occupiedMap = new IgeTextureMap(32,32)
      .loadMap({data: occupiedTiles});

    ige.box2d.staticsFromMap(self.occupiedMap);

    // Player
    self.player = new Player()
      .mount(self.gameScene)
      .drawBounds(true)
      .translateTo(300,300,0)
      .setType(0)
      .addComponent(PlayerComponent);

    self.nextLevelTrigger = new OverlapTrigger()
      .target(self.player)
      .onTrigger(function() {
        console.log('next level');
        self.player.unMount();
      })
      .width(64)
      .height(64)
      .layer(5)
      .translateTo(464,300,0)
      .drawBounds(true);

    self.unlockTrigger = new KeyTrigger()
      .onTrigger(function() {
        self.nextLevelTrigger.mount(self.gameScene);
      })
      .target(self.player)
      .width(80)
      .height(64)
      .layer(5)
      .translateTo(450,190,0)
      .mount(self.gameScene)
      .drawBounds(true);
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
  },

  mergeTileData: function(tiles1, tiles2) {
    var maxHeight = Math.max(tiles1.length, tiles2.length);
    var maxWidth = Math.max(tiles1[0].length, tiles2[0].length);

    var newTileData = [];
    for (var i=0; i<maxHeight; i++) {
      newTileData[i] = [];
      for (var j=0; j<maxWidth; j++) {
        newTileData[i][j] = tiles1[i][j] || tiles2[i][j] || null;
      }
    }

    return newTileData;
  }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Main; }