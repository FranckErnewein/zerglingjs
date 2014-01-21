var fs = require('fs');
var _ = require('underscore');

var ext = '.html';


module.exports = function( filename, data ){ 

	if( filename.indexOf( ext ) == filename.length - ext.length  ){

		//preprocess template include 
		var str = fs.readFileSync( filename, 'utf8' );
		var postprocess = str.replace( /<%\s*include\s*(.*?)\s*%>/g, function(match, includefilename ){
			return fs.readFileSync( './src/' + includefilename, 'utf8' ).toString();
		});
		var render = _.template( postprocess );

		return render( data || {build: true} );
	}

};
