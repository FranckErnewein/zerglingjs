var fs = require('fs');
var express = require('express');
var compile = require('./template');

var app = express();

['js', 'img', 'css', 'video'].forEach( function( file ){
	app.use( '/'+file, express.static(  __dirname + '/src/' + file) );
});


app.use( '/build', express.static(  __dirname + '/build/' ) );


var files = fs.readdirSync( './src/' );
var ext = '.html';
app.get( '/*.html' , function( req, res ){
	res.send( compile( './src/' + req.route.params[0] + '.html', {build: false} ) );
});

app.get( '/' , function( req, res ){
	res.send( compile( './src/index.html', {build: false} ) );
});

app.listen( 8000 );
