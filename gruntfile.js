module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    //paths: ["../client/public/less"]
                },
                files: {
                    "style/css/main.css" : "style/less/styles.less",
                }
            }

        },
        watch: {
            less: {
                files: "style/less/*.less",
                tasks: ["less"],
                options: {
                    interrupt: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ["style/css/styles.css"]
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'js/build/app.js': [
                        'js/*.js'
                    ]
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('compile', ['uglify']);
    
};
