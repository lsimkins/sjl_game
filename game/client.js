var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);

		// Load our textures
		var self = this,
			gameTexture = [];

		this.obj = [];

		//ige.input.debug(true);

		// Namespace textures so they can be accessed globally.
		ige.textures = {};

		// Load the fairy texture and store it in the gameTexture array
		ige.textures.tex1 = new IgeCellSheet('assets/laboratory.png', 16, 16);
		ige.textures.char1 = new IgeCellSheet('assets/maskman.png', 9, 4);

		ige.addComponent(IgeBox2dComponent)
			.box2d.sleep(true)
			.box2d.gravity(0, 0)
			.box2d.createWorld()
			.box2d.start();

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {

			// Create the HTML canvas
			ige.createFrontBuffer(true);

			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					sjl.setupGame();
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }