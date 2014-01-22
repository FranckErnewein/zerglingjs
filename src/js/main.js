requirejs.config({

	urlArgs: 'bust=' + (new Date()).getTime(),

	paths: {
		//create alias to plugins 
		'async': 'vendor/requirejs-plugins/src/async',
		'font': 'vendor/requirejs-plugins/src/font',
		'goog': 'vendor/requirejs-plugins/src/goog',
		'image': 'vendor/requirejs-plugins/src/image',
		'json': 'vendor/requirejs-plugins/src/json',
		'noext': 'vendor/requirejs-plugins/src/noext',
		'mdown': 'vendor/requirejs-plugins/src/mdown',
		'text': 'vendor/requirejs-plugins/lib/text',
		'propertyParser' : 'lib/requirejs-plugins/src/propertyParser',


		'jquery': 'vendor/jquery/jquery',
		//'jquery': 'lib/jquery-1.10.2',
		//'underscore': 'vendor/underscore/underscore',
		'underscore': 'vendor/lodash/dist/lodash.underscore',
		'backbone': 'vendor/backbone/backbone',
	},

	shim: {
		'underscore': { exports: '_', },
		'jquery': { exports: '$' },
		'backbone': {
			deps: [ 'underscore' , 'jquery'],
			exports: 'Backbone'
		},
		'io':{
			exports: 'io'
		},
	}
});

require([ 
	'jquery', 
	'backbone', 
	'router/App' 
], function( $, Backbone, App ){


	$(document).ready( function(){
		if( window.chrome ) $('html').addClass('chrome');
		if( navigator.appVersion.indexOf("Win")!=-1 ) $('html').addClass('pc');
		//if( ie ) $('html').addClass('ie'+ie);

		//start app
		window.app = new App();	
		Backbone.history.start();	
	});


});
