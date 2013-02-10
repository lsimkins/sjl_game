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

		// Add physics and setup physics world
		ige.addComponent(IgeBox2dComponent)
			.box2d.sleep(true)
			.box2d.gravity(0, 0)
			.box2d.createWorld()
			.box2d.start();

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
					// Let's create a character, then set the camera to follow him!
					self.player1 = new Character()
						.addComponent(PlayerComponent)
						.box2dBody({
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
						})
						.id('player1')
						.setType(0)
						.drawBounds(true)
						.drawBoundsData(false)
						.translateTo(0, 0, 0)
						.mount(self.scene1);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }