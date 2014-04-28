module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-lint-inline');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			uses_defaults: ['*.js'],
		},
	});
	grunt.registerTask('default', ['jshint']);
};
