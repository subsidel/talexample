module.exports = function (grunt) {
  'use strict'

  grunt.initConfig({
    watch: {
      options: {
        nospawn: true
      },
      script: {
        options: {
          livereload: true
        },
        files: 'sampleapp/**/*.js',
        tasks: ['newer:babel']
      },
      styles: {
        options: {
          livereload: true
        },
        files: 'public/css/**/*.css'
      }
    },
    babel: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'sampleapp/',
            src: ['**/*.js'],
            dest: 'public/js/sampleapp'
          },
          {
            expand: true,
            cwd: 'node_modules/tal/static/script',
            src: ['**/*.js'],
            dest: 'public/js/tal'
          }
        ]
      },
      options: {
        sourceMap: true,
        presets: ['react']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-newer')
}
