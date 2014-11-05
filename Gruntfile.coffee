module.exports = (grunt) ->
  grunt.file.defaultEncoding = 'utf8'
  pkg = grunt.file.readJSON 'package.json'

  grunt.initConfig
    coffee:
      options:
        sourceMap: false
        bare: true
      compile:
        expand: true
        cwd: 'src/coffee/'
        src: [
          '*.coffee'
        ]
        dest: 'dest/js/'
        ext: '.js'

    coffeelint:
      options:
        configFile: 'coffeelint.json'
      lint:
        src: [
          'src/coffee/*.coffee'
        ]

    uglify:
      options:
        banner: '/*! ' + pkg.name + ' ' + pkg.version + ' License ' + pkg.license + ' */'
      min:
        expand: true
        cwd: 'dest/js/'
        src: [
          '*.js'
        ]
        dest: 'public/js/'
        ext: '.min.js'

    notify_hooks:
      options:
        enabled: true
        # max_jshint_notifications: 8
        title: 'js-physics'

    browserSync:
      dev:
        files:
          src: [
            'src/coffee/*.coffee'
          ]
        options:
          ghostMode:
            scroll: true
            links: true
          watchTask: true
          server:
             baseDir: './'
             # index: 'src/root/index.html'

    watch:
      options:
        livereload: true
        spawn: false
      live:
        files: [
          'src/coffee/*.coffee'
        ]
        tasks: [
          'newer:coffeelint:lint'
          'newer:coffee:compile'
        ]

  require('load-grunt-tasks')(grunt)



  grunt.registerTask 'default', ->
    grunt.task.run 'browserSync:dev'
    grunt.task.run 'watch:live'
    grunt.task.run 'notify_hooks'


  grunt.registerTask 'b', (type) ->
    grunt.task.run 'coffeelint'
    grunt.task.run 'coffee'
    grunt.task.run 'uglify'
