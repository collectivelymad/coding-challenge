//gruntfile.js
module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        nodemon: {
            all: {
                script: __dirname + '/src/app.js',
                options: {
                    watchesExtensions: ['js']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('test', ['nodemon']);
    grunt.registerTask('default', ['test']);


};
