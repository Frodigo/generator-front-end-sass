// Generated  using Front-End-Sass Generator https://github.com/Frodigo/front-end-generator

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'development',
    dist: 'dist'
  };

  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // browser sync task
    browserSync: {
      bsFiles: {
        src: ['development/**/*.{html,css,jpg,png,svg,js}']
      },
      options: {
        watchTask: true,
        server: './development'
      }
    },

    // sass task

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'development/css/styles.css': 'development/sass/styles.scss'
        }
      }
    },


    // post css task

    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'development/css/*.css'
      }
    },

    // sass lint


    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['development/sass/**/*.scss']
    },

    // sass doc

    sassdoc: {
      default: {
        src: 'development/sass',
        options: {
          dest: 'development/docs/sass'
        }
      }
    },

    // js doc

    jsdoc: {
      dist: {
        src: ['development/js/*.js', 'development/test/*.js'],
        options: {
          destination: 'development/docs/js'
        }
      }
    },


    // jshint task
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true
      },
      default: {
        files: [{
          src: ['development/js/**/*.js']
        }]
      }
    },

    // html lint task

    validation: {
      all: {
        src: ['development/**/*.html', '!development/vendor/**/*.html', '!development/docs/**/*.html']
      }

    },

    // clean task

    clean: {
      default: {
        files: [
          {
            dot: true,
            src: [
              'dist/**/*'
            ]
          }
        ]
      }
    },

    // copy task

    copyto: {
      options: {
        ignore: [
          '.gitkeep',
          '**/.git',
          '**/.git/**',
          '**/*.{scss,sass}',
          'development/sass',
          'development/sass/**',
          'development/docs',
          'development/docs/**'
        ]
      },
      default: {
        files: [
          {cwd: 'development/', src: ['**/*'], dest: 'dist/', expand: true}
        ]
      }
    },

    // imagemin tasks

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 5,
          svgoPlugins: [{removeViewBox: false}]
        },

        files: [{
          expand: true,
          cwd: 'development/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'development/'
        }]
      }
    },


    // sprites generation tasks

    sprite: {
      all: {
        src: 'development/images/sprites/*.png',
        dest: 'development/images/sprites.png',
        destCss: 'development/sass/specifics/_sprites.scss'
      }
    },


    // watch task

    watch: {
      styles: {
        files: ['development/**/*.{scss,sass}'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false
        }
      },

      sprites: {
        files: ['development/images/sprites/*.png'],
        tasks: ['sprite'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.registerTask('serve', [
    'browserSync',
    'sass',
    'watch'
  ]);


  grunt.registerTask('test', [
    'validation',
    'sasslint',
    'jshint'
  ]);

  grunt.registerTask('docs', [
    'sassdoc',
    'jsdoc'
  ]);

  grunt.registerTask('default', [
    'clean',
    'sass',
    'postcss',
    'imagemin',
    'sprite',
    'copyto',
    'test',
    'docs'
  ]);

};
