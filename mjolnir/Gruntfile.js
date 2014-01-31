module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
        pre: ['dist/', 'build/'],
        post: ['<%= archive_name %>.zip']
    },
    sass: {
      options: {
        includePaths: ['assets/bower_components/foundation/scss']
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
                {expand: true, src: ['assets/css/**'], dest: 'build/'},
                {expand: true, src: ['assets/bower_components/**'], dest: 'build/'},
                {expand: true, src: ['assets/fonts/**'], dest: 'build/'},
                {expand: true, src: ['assets/images/**'], dest: 'build/'},
                {expand: true, src: ['assets/js/**'], dest: 'build/'},
                {expand: true, src: ['partials/**'], dest: 'build/'},
                {expand: true, src: ['assets/scss/**'], dest: 'build/'},
                {expand: true, src: ['*', '!.gitignore', '!.DS_Store', '!build/'], dest: 'build/'},
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
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },
      options: { livereload: true }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('bundle', ['copy:main', 'compress', 'copy:archive', 'clean:post']);
}