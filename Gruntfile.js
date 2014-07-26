module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    typescript: {
      app: {
        src: ['app/scripts/**/*.ts'],
        dest: 'build/main.js',
        options: {
          sourceMap: true,
          module: 'amd'
        }
      }
    },
    copy: {
      app: {
        files: [
          {
            cwd: 'app',
            expand: true,
            src: ['**/*.html', '!vendor/**/*.html', 'assets/**/*'],
            dest: 'build/'
          }
        ]
      },
      bower: {
        files: [
          {
            'build/vendor/phaser.min.js': 'app/vendor/phaser-official/build/phaser.min.js',
            'build/vendor/socket.io.js': 'app/vendor/socket.io.js',
            'build/vendor/socket.io-client.js': 'app/vendor/socket.io-client.js',
            'build/vendor/socket.io-client.d.ts': 'app/vendor/socket.io-client.d.ts'
          }
        ]
      }
    },
    open: {
      app: {
        path: 'http://localhost:1337'
      }
    },
    connect: {
      app: {
        options: {
          port: 1337,
          hostname: '*',
          base: 'build',
          livereload: true
        }
      }
    },
    watch: {
      app: {
        files: 'app/**/*',
        tasks: ['typescript', 'copy'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['typescript', 'copy', 'open', 'connect', 'watch']);
}