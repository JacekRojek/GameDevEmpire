module.exports = function(grunt) {
require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        //pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                manage: false
            },
            my_targets: {
                files: [{
                    'build/app.min.js': ['build/playerClass.js','build/functions.js','build/main.js']
                }]

            }
        },
        babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: {
                'build/functions.js': ['js/functions.js'],
                'build/playerClass.js': ['js/playerClass.js'],
                'build/main.js': ['js/main.js']
            }
        }
    }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ["uglify"]);
};
