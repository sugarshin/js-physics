module.exports = (grunt) ->
  grunt.file.defaultEncoding = 'utf8'
  pkg = grunt.file.readJSON 'package.json'

  grunt.initConfig
    copy:
      dest:
        expand: true
        cwd: 'dest/'
        src: [
          'js/lib/**'
          '!.DS_Store'
          '!*.js.map'
        ]
        dest: 'pubilc/'

    stylus:
      options:
        compress: false
        import: ['nib/*']

      compile:
        expand: true
        cwd: 'src/stylus/'
        src: [
          '*.styl'
          '!import/*.styl'
        ]
        dest: 'dest/css/'
        ext: '.css'

      build:
        options:
          compress: true

        expand: true
        cwd: 'src/stylus/'
        src: [
          '*.styl'
          '!import/*.styl'
        ]
        dest: 'dest/css/'
        ext: '.css'

    coffee:
      options:
        sourceMap: false
        # bare: true
      compile:
        expand: true
        cwd: 'src/coffee/'
        src: [
          '*.coffee'
        ]
        dest: 'src/js/'
        ext: '.js'

    coffeelint:
      options:
        configFile: 'coffeelint.json'
      lint:
        src: [
          'src/coffee/*.coffee'
        ]

    concat:
      dest:
        src: [
          'src/js/polyfill.js'
          'src/js/script.js'
        ]
        dest: 'dest/js/all.js'

    cssmin:
      min:
        files: [{
          expand: true
          cwd: 'dest/css/'
          src: [
            '*.css'
          ]
          dest: 'pubilc/css/'
        }]

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

    watch:
      options:
        livereload: true
        spawn: false
      live:
        files: [
          'src/coffee/*.coffee'
          'src/stylus/*.styl'
        ]
        tasks: [
          'newer:coffeelint:lint'
          'newer:coffee:compile'
          'newer:concat:dest'
          'newer:stylus:compile'
          # 'copy:demo'
        ]

    connect:
      options:
        port: 9001
      live:
        options:
          base: './dest/'

    bumpup:
      files: [
        'package.json'
        'bower.json'
      ]

  for t of pkg.devDependencies
    if t.substring(0, 6) is 'grunt-'
      grunt.loadNpmTasks t



  grunt.registerTask 'l', ->
    grunt.task.run 'connect:live'
    grunt.task.run 'watch:live'
    grunt.task.run 'notify_hooks'
    return

  grunt.registerTask 'u', (type) ->
    # type >> major minor patch
    grunt.task.run 'bumpup:' + type
    return

  grunt.registerTask 'b', (type) ->
    # type >> major minor patch
    grunt.task.run 'bumpup:' + type
    grunt.task.run 'copy'
    grunt.task.run 'coffeelint'
    grunt.task.run 'coffee'
    grunt.task.run 'uglify'
    return

  return
