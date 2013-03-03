var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/Character.js',
		'./gameClasses/Player.js',
		'./gameClasses/PlayerControlComponent.js',

		'./main.js',

		/* Triggers */
		'./gameClasses/triggers/OverlapTrigger.js',
		'./gameClasses/triggers/KeyTrigger.js',

		/* Standard game scripts */
		'./client.js',
		'./index.js',
		'./mapData.js'

	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }