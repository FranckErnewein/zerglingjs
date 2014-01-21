
module.exports = function( grunt ){

	var lessConfig = {
		options: {
			paths: ['src/css'],
			cleancss: true,
			compress: true
		},
		files: {
			'build/css/styles.css': 'src/css/styles.less'
		}
	};


	grunt.initConfig({
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src/js/',
					insertRequire: ['main'],
					mainConfigFile: 'src/js/main.js',
					out: 'build/js/main.js',
					name: 'main'
				}
			}
		},
		less: {
			production: lessConfig,
			development: lessConfig
		},
		copy: {
			main: {
				files: [
					//requirejs 
					{
						src: 'src/js/vendor/requirejs/require.js',
						dest: 'build/js/vendor/requirejs/require.js'
					},
					/*
					//html files
					{
						src: 'src/index.html',
						dest: 'build/index.html',
						filter: 'isFile'
					},
					*/
					//img
					{expand: true, cwd: 'src/img/', src: ['**'], dest: 'build/img/'},
					//css img
					{expand: true, cwd: 'src/css/img/', src: ['**'], dest: 'build/css/img/'},
				]
			}
		},
		html:{
			build: false
		},
		clean: ['build']	
	});


	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy'); //copy requirejs src and js file
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('js', ['requirejs', 'copy']); //build javascript
	grunt.registerTask('css', ['less']); //build css
	grunt.registerTask('html', 'comile html files', function(){
		var build = this.data;
		var base = './src/';
		var files = require('fs').readdirSync( base );
		var compile = require('./compile_template');
		var ext = '.html';
		files.forEach( function( filename ){
			if( filename.indexOf( ext ) == filename.length - ext.length  ){
				grunt.file.write( 'build/' + filename, compile( 'src/' + filename ) );
			}
		});
	}); 

	grunt.registerTask('default', ['clean', 'js', 'css', 'html']); //do all

};
