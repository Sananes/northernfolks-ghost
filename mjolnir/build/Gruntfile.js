module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    archive_name: grunt.option('name') || 'mjolnir',
    
    sass: {
      options: {
        includePaths: ['assets/vendor/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/main.css': 'assets/scss/main.scss'
        }
      }
    },
    copy: {
      main: {
          files: [
              {expand: false, src: ['assets/css/**'], dest: 'build/'},
              {expand: false, src: ['assets/vendor/**'], dest: 'build/'},
              {expand: false, src: ['assets/fonts/**'], dest: 'build/'},
              {expand: false, src: ['assets/images/**'], dest: 'build/'},
              {expand: false, src: ['!assets/js/**'], dest: 'build/'},
              {expand: false, src: ['partials/**'], dest: 'build/'},
              {expand: false, src: ['assets/scss/**'], dest: 'build/'},
              {expand: false, src: ['*', '!.gitignore','!node_modules', '!.DS_Store'], dest: 'build/'},
          ]
      },
      archive: {
          files: [
              {expand: true, src: ['<%= archive_name %>.zip'], dest: 'dist/'}
          ]
      }
    },
    compress: {
        main: {
            options: {
                archive: '<%= archive_name %>.zip'
            },
            expand: true,
            cwd: 'build/',
            src: ['**/*'],
            dest: ''
        }
    },
    clean: {
        pre: ['dist/', 'build/']
    },
    uglify: {
      min: {
        files: [{
            expand: false,
            src: ['assets/js/*.js'],
            dest: 'build/assets/js/main.js'
        }]
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },
      options: { livereload: true }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('bundle', ['clean', 'copy:main', 'uglify', 'compress', 'copy:archive']);
}