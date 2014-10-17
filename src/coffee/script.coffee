(->

  # Aliases
  Engine = Matter.Engine
  Gui = Matter.Gui
  World = Matter.World
  Bodies = Matter.Bodies
  Body = Matter.Body
  Composite = Matter.Composite
  Composites = Matter.Composites
  Common = Matter.Common
  Constraint = Matter.Constraint
  MouseConstraint = Matter.MouseConstraint

  App = {}

  _engine = undefined

  _sceneName = 'tsumiki'
  _sceneWidth = undefined
  _sceneHeight = undefined



  App.init = ->
    container = document.getElementById 'container'
    # demoStart = document.getElementById 'demo-start'

    # demoStart.style.display = 'none'

    _engine = Engine.create(container,
      render:
        options:
          background: '#fff'
          wireframes: false
          showSleeping: false
    )

    # App.fullscreen()

    Engine.run(_engine)
    App.updateScene()
    # setTimeout(->
    #   Engine.run _engine
    #   App.updateScene()
    #   return
    # , 800)

    return

    # demoStart.addEventListener 'click', ->
    #   demoStart.style.display = 'none'
    #   _engine = Engine.create(container,
    #     render:
    #       options:
    #         wireframes: true
    #         showAngleIndicator: true
    #         showDebug: true
    #   )
    #   # App.fullscreen()
    #   setTimeout (->
    #     Engine.run _engine
    #     App.updateScene()
    #     return
    #   ), 800
    #   return

    window.addEventListener 'deviceorientation', App.updateGravity, true
    window.addEventListener 'touchstart', App.fullscreen
    window.addEventListener 'orientationchange', ->
      App.updateGravity()
      App.updateScene()
      App.fullscreen()
      return
    , false

    return
  # App.init  ---------------------------------------------



  App.tsumiki = ->
    _world = _engine.world

    App.reset()

    mouse = _engine.input.mouse

    cconstraint = Constraint.create(
      label: 'Mouse Constraint'
      pointA: mouse.position
      pointB: { x: 0, y: 0 }
      length: 0.01
      stiffness: 0.1
      angularStiffness: 1
      render:
        strokeStyle: 'transparent'
        lineWidth: 1
    )

    World.add(_world, MouseConstraint.create(_engine, {
      type: 'mouseConstraint'
      mouse: mouse
      dragBody: null
      dragPoint: null
      constraint: cconstraint
    }))#,
    #   constraint: cons
    # )

    tsumikiColor = [
      '#23AAA4'
      '#5AB5B0'
      '#78BEB2'
      '#686F89'
      '#DC5D54'
      '#DD6664'
      '#D94142'
      '#E78E21'
      '#E9A21F'
      '#EDB51C'
    ]

    # console.log(_sceneWidth)
    # console.log(_sceneHeight)


    stack = Composites.stack(_sceneWidth / 8, _sceneHeight / 6, 5, 5, 0, 0, (x, y, column, row) ->

      rectangleSize = Common.random(24, 48)
      offset = 8
      # console.log(x)
      # console.log(y)
      # console.log(column)
      # console.log(row)

      switch Math.round(Common.random(0, 2))
        when 0
          return Bodies.rectangle(x + offset, y + offset, rectangleSize, rectangleSize,
            friction: 0
            frictionAir: 0
            restitution: 0.05
            # angularVelocity: 1
            density: 0.1
            # isStatic: true
            render:
              lineWidth: 1
              # setBackground: '#000'
              fillStyle: tsumikiColor[Math.floor Math.random() * 10]
          )

        when 1
          # return Bodies.rectangle(x + offset, y + offset, rectangleSize, rectangleSize,
          #   friction: 1
          #   frictionAir: 0
          #   restitution: 0.05
          #   # angularVelocity: 1
          #   density: 0.1
          #   # isStatic: true
          #   render:
          #     lineWidth: 1
          #     # setBackground: '#000'
          #     fillStyle: tsumikiColor[Math.floor Math.random() * 10]
          # )
          return Bodies.polygon(x + offset, y + offset, 3, Common.random(16, 32),
            friction: 0
            frictionAir: 0
            # motion: 1
            restitution: 0.05
            # isStatic: true
            # angularVelocity: 1
            render:
              lineWidth: 1
              fillStyle: tsumikiColor[Math.floor Math.random() * 10]
          )

        when 2
          # return Bodies.rectangle(x + offset, y + offset, rectangleSize, rectangleSize,
          #   friction: 1
          #   frictionAir: 0
          #   restitution: 0.05
          #   # angularVelocity: 1
          #   density: 0.1
          #   # isStatic: true
          #   render:
          #     lineWidth: 1
          #     # setBackground: '#000'
          #     fillStyle: tsumikiColor[Math.floor Math.random() * 10]
          # )
          return Bodies.circle(x + offset, y + offset, Common.random(20, 30),
            friction: 0
            frictionAir: 0
            restitution: 0.05
            # isStatic: true
            # angularVelocity: 1
            render:
              lineWidth: 1
              fillStyle: tsumikiColor[Math.floor Math.random() * 10]
            Common.random(20, 40)
          )
    )

    World.add _world, stack

    return
  # App.tsumiki  --------------------------------------------



  App.updateScene = ->
    return  unless _engine

    # _sceneWidth = document.documentElement.clientWidth
    # _sceneHeight = document.documentElement.clientHeight
    _sceneWidth = window.innerWidth
    _sceneHeight = window.innerHeight

    boundsMax = _engine.world.bounds.max
    renderOptions = _engine.render.options
    canvas = _engine.render.canvas

    boundsMax.x = _sceneWidth
    boundsMax.y = _sceneHeight

    canvas.width = renderOptions.width = _sceneWidth
    canvas.height = renderOptions.height = _sceneHeight

    App[_sceneName]()

    return
  # App.updateScene ---------------------------------------



  App.updateGravity = ->
    return  unless _engine

    orientation = window.orientation
    gravity = _engine.world.gravity

    if orientation is 0
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90
      gravity.y = Common.clamp(event.beta, -90, 90) / 90
    else if orientation is 180
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90
      gravity.y = Common.clamp(-event.beta, -90, 90) / 90
    else if orientation is 90
      gravity.x = Common.clamp(event.beta, -90, 90) / 90
      gravity.y = Common.clamp(-event.gamma, -90, 90) / 90
    else if orientation is -90
      gravity.x = Common.clamp(-event.beta, -90, 90) / 90
      gravity.y = Common.clamp(event.gamma, -90, 90) / 90

    return
  # App.updateGravity -------------------------------------



  App.fullscreen = ->
    _fullscreenElement = _engine.render.canvas

    if not document.fullscreenElement and not document.mozFullScreenElement and not document.webkitFullscreenElement
      if _fullscreenElement.requestFullscreen
        _fullscreenElement.requestFullscreen()
      else if _fullscreenElement.mozRequestFullScreen
        _fullscreenElement.mozRequestFullScreen()
      else if _fullscreenElement.webkitRequestFullscreen
        _fullscreenElement.webkitRequestFullscreen Element.ALLOW_KEYBOARD_INPUT

    return
  # App.fullscreen ----------------------------------------



  App.reset = ->
    _world = _engine.world
    Common._seed = 2

    World.clear _world
    Engine.clear _engine

    offset = 4

    # bottom
    World.addBody(
      _world
      Bodies.rectangle(
        _sceneWidth * 0.5
        _sceneHeight - offset / 2
        _sceneWidth
        offset
        { isStatic: true }
      )
    )

    # top
    World.addBody(
      _world
      Bodies.rectangle(
        _sceneWidth * 0.5
        0 + offset / 2
        _sceneWidth
        offset
        { isStatic: true }
      )
    )

    # left
    World.addBody(
      _world
      Bodies.rectangle(
        0 + offset / 2
        _sceneHeight * 0.5
        offset
        _sceneHeight + 0.5
        { isStatic: true }
      )
    )

    # right
    World.addBody(
      _world
      Bodies.rectangle(
        _sceneWidth - offset / 2
        _sceneHeight * 0.5
        offset
        _sceneHeight + 0.5
        { isStatic: true }
      )
    )

    return
  # App.reset ---------------------------------------------


  uA = navigator.userAgent.toLowerCase()

  if uA.indexOf('iphone') > -1 or uA.indexOf('ipod') > -1 or uA.indexOf('android') > -1
    window.addEventListener 'load', App.init

  return
)()
