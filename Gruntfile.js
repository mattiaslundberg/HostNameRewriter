module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            uses_defaults: ['*.js'],
        },
    });
    grunt.registerTask('default', ['jshint']);
};
