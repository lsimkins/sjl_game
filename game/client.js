var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);

		// Load our textures
		var self = this,
			gameTexture = [];

		this.obj = [];

		ige.input.debug(true);

		// Load the fairy texture and store it in the gameTexture array
		gameTexture[0] = new IgeCellSheet('assets/tile.png', 20, 20);

		// Load a smart texture
		//gameTexture[1] = new IgeTexture('../ige/examples/assets/textures/smartTextures/simpleBox.js');

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			// Create the HTML canvas
			ige.createFrontBuffer(true);

			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					// Create the scene
					self.scene1 = new IgeScene2d()
						.id('scene1');

					// Create the main viewport and set the scene
					// it will "look" at as the new scene1 we just
					// created above
					self.vp1 = new IgeViewport()
						.id('vp1')
						.autoSize(true)
						.scene(self.scene1)
						.drawBounds(true)
						.mount(ige);

					self.textureMap = new IgeTextureMap(10,10)
						.tileWidth(32)
						.tileHeight(32)
						.drawGrid(10);

					self.textureMap.addTexture(gameTexture[0]);

					self.tileMap = {
						data:
							[
								[[0,1], [0,1]],
								[[0,1], [0,1]]
							]
					};

					/*self.textureMap.paintTile(1,1,0,1);
					self.textureMap.paintTile(1,2,0,1);
					self.textureMap.paintTile(1,3,0,1);
					self.textureMap.paintTile(1,4,0,1);*/
					self.textureMap.loadMap(self.tileMap).mount(self.scene1);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }