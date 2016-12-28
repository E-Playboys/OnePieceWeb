/// <binding />
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["wwwroot/css"]
                },
                files: {
                    "wwwroot/css/app.css": "wwwroot/less/app.less",
                },
                cleancss: true
            }
        },
        csssplit: {
            your_target: {
                src: ['wwwroot/css/app.css'],
                dest: 'wwwroot/css/app.min.css',
                options: {
                    maxSelectors: 4095,
                    suffix: '.'
                }
            },
        },
        ngtemplates: {
            OnePiece: {
                src: ['wwwroot/app/template/**.html', 'wwwroot/app/template/**/**.html'],
                dest: 'wwwroot/app/templates.js',
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },
        watch: {
            styles: {
                files: ['wwwroot/less/**/*.less'], // which files to watch
                tasks: ['less', 'csssplit'],
                options: {
                    nospawn: true
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'wwwroot/publish/min-safe/js/controllers.js': ['wwwroot/app/pages/*/controllers/*.js', 'wwwroot/app/pages/*/controllers/*/*.js', 'wwwroot/app/pages/management/*/controllers/*.js'],
                    'wwwroot/publish/min-safe/js/modules.js': ['wwwroot/app/modules/*.js'],
                    'wwwroot/publish/min-safe/app.js': ['wwwroot/app/app.js'],
                    'wwwroot/publish/min-safe/js/config.js': ['wwwroot/app/config.js'],
                    'wwwroot/publish/min-safe/js/factories.js': ['wwwroot/app/factories.js'],
                    'wwwroot/publish/min-safe/js/filters.js': ['wwwroot/app/filters.js'],
                    'wwwroot/publish/min-safe/js/services.js': ['wwwroot/app/services.js'],
                    'wwwroot/publish/min-safe/js/templates.js': ['wwwroot/app/templates.js']
                }
            }
        },
        concat: {
            js: { 
                src: ['wwwroot/publish/min-safe/app.js', 'wwwroot/publish/min-safe/js/*.js'],
                dest: 'wwwroot/publish/min/app.js'
            }
        },
        uglify: {
            js: { 
                src: ['wwwroot/publish/min/app.js'],
                dest: 'wwwroot/publish/min/app.js'
            },
            angular: {
                src: ['wwwroot/vendors/bower_components/angular/angular.js'],
                dest: 'wwwroot/vendors/bower_components/angular/angular.min.js'
            },
            gifplayer: {
                src: ['wwwroot/vendors/bower_components/jquery.gifplayer/jquery.gifplayer.js'],
                dest: 'wwwroot/vendors/bower_components/jquery.gifplayer/jquery.gifplayer.min.js'
            },
            scrolling: {
                src: ['wwwroot/vendors/bower_components/jquery_scrollIntoView/jquery.scrolling.js'],
                dest: 'wwwroot/vendors/bower_components/jquery_scrollIntoView/jquery.scrolling.min.js'
            },
            tagsinput: {
                src: ['wwwroot/vendors/bower_components/ng-tags-input/ng-tags-input.js'],
                dest: 'wwwroot/vendors/bower_components/ng-tags-input/ng-tags-input.min.js'
            }
        }

    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Default task(s).
    grunt.registerTask('default', ['less', 'csssplit', 'ngtemplates', 'ngAnnotate', 'concat', 'uglify']);
    grunt.registerTask('css', ['less', 'csssplit']);
    grunt.registerTask('js', ['ngtemplates', 'ngAnnotate', 'concat', 'uglify']);
};
