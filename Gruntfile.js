'use strict';

module.exports = function(grunt) {
	var yeomanConfig;
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	try {
		yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
	} catch (_error) {}

	// grunt.loadNpmTasks('grunt-heroku-deploy');

	grunt.initConfig({
		yeoman: yeomanConfig,
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'dist/*',
						'!dist/.git*'
					]
				}]
			}
		},

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> */\n/*! <%= pkg.authors %> */\n/*! version: <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
				}
			},
			normal: {
				options: {
					mangle: false,
					beautify: true
				},
				files: {
					'dist/<%= pkg.name %>.js': ['src/<%= pkg.name %>.js']
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'src/**/*.js',
				'Gruntfile.js'
			]
		},
	});

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', [
		'jshint',
		'clean:dist',
		'uglify',
	]);
};