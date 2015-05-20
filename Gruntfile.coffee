module.exports = (grunt) ->
  config =
    pkg: grunt.file.readJSON('package.json')
    coffee:
      compile:
        options:
          bare: true
        files: {
          'javascripts/fractals.js': ['app/assets/javascripts/utils.coffee','app/assets/javascripts/fractals.coffee']
          'javascripts/julia.js': ['app/assets/javascripts/julia/complex.coffee','app/assets/javascripts/julia/julia.coffee']
        }
    less:
      production:
        files:{'stylesheets/style.css':'app/assets/stylesheets/style.less'}
    watch:
      coffee:
        files: ['app/assets/javascripts/*.coffee', 'app/assets/javascripts/julia/*.coffee']
        tasks: 'coffee'
      less:
        files: ['app/assets/stylesheets/*.less']
        tasks: 'less'

  grunt.initConfig(config)
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')

