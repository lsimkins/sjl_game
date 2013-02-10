var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/ClientNetworkEvents.js',
		'./gameClasses/Rotator.js',
		'./gameClasses/Player.js',
		'./gameClasses/PlayerControlComponent.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js',
		'./mapData.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }