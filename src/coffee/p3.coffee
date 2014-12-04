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
Demo = {}
_engine = null
_sceneName = "mixed"
_sceneWidth = null
_sceneHeight = null

Demo.init = ->
  canvasContainer = document.getElementById('canvas-container')
  _engine = Engine.create(canvasContainer,
    render:
      strokeStyle: 'transparent'
      options:
        background: '#fff'
        wireframes: false
        showSleeping: false
        # wireframes: true
        # showAngleIndicator: true
        # showDebug: true
  )
  Demo.fullscreen()
  Engine.run _engine
  Demo.updateScene()

  window.addEventListener 'deviceorientation', Demo.updateGravity, true
  # window.addEventListener 'touchstart', Demo.fullscreen
  window.addEventListener 'orientationchange', (->
    Demo.updateGravity()
    Demo.updateScene()
    # Demo.fullscreen()
    return
  ), false
  return

window.addEventListener 'load', Demo.init


Demo.mixed = ->
  _world = _engine.world
  Demo.reset()

  # mouse = _engine.input.mouse

  # cconstraint = Constraint.create(
  #   label: 'Mouse Constraint'
  #   pointA: mouse.position
  #   pointB:
  #     x: 0
  #     y: 0
  #   length: 0.01
  #   stiffness: 0.1
  #   angularStiffness: 1
  #   render:
  #     strokeStyle: 'transparent'
  #     lineWidth: 1
  # )

  mouse = _engine.input.mouse

  World.add _world, MouseConstraint.create _engine,
    # type: 'mouseConstraint'
    # mouse: mouse
    # dragBody: null
    # dragPoint: null
    constraint: Constraint.create(
      label: 'Mouse Constraint'
      pointA: mouse.position
      pointB:
        x: 0
        y: 0
      length: 0.01
      stiffness: 0.1
      angularStiffness: 1
      render:
        strokeStyle: 'transparent'
        lineWidth: 1
    )

  rectangleSize = Common.random(32, 48)
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
  # tsumikiColor = [
  #   '#23c2bd'
  #   '#64CCC7'
  #   '#80D1C5'
  #   '#919BC2'
  #   '#ff4c4f'
  #   '#ff695e'
  #   '#f76d6d'
  #   '#ff9c19'
  #   '#ffb617'
  #   '#ffc30f'
  # ]

  stack = Composites.stack(20, 20, 8, 2, 0, 0, (x, y, column, row) ->
    switch Math.round(Common.random(0, 1))
      when 0
        if Math.random() < 0.8

          return Bodies.rectangle(x, y, rectangleSize, rectangleSize,
            frictionAir: 0
            friction: 0.0001
            restitution: 0.8
            density: 0.05
            render:
              lineWidth: 1
              fillStyle: tsumikiColor[Math.floor Math.random() * 10]
              strokeStyle: 'rgba(0,0,0,0)'
          )

          # return Bodies.rectangle(x, y, Common.random(20, 40), Common.random(20, 40),
          #   friction: 0.01
          #   restitution: 0.4
          # )
        else

          return Bodies.polygon(x, y, 3, Common.random(24, 32),
            frictionAir: 0
            friction: 0.0001
            restitution: 0.8
            density: 0.05
            render:
              lineWidth: 1
              fillStyle: tsumikiColor[Math.floor Math.random() * 10]
              strokeStyle: 'rgba(0,0,0,0)'
          )

          # return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30),
          #   friction: 0.01
          #   restitution: 0.4
          # )
      when 1
        Bodies.circle(x, y, Common.random(26, 30),
          frictionAir: 0
          friction: 0.0001
          restitution: 0.8
          density: 0.05
          render:
            lineWidth: 1
            fillStyle: tsumikiColor[Math.floor Math.random() * 10]
            strokeStyle: 'rgba(0,0,0,0)'
        , Common.random(20, 40)
        )
        # Bodies.polygon x, y, Math.round(Common.random(4, 6)), Common.random(20, 40),
        #   friction: 0.01
        #   restitution: 0.4

  )
  World.add _world, stack
  return

Demo.updateScene = ->
  unless _engine then return
  _sceneWidth = window.innerWidth
  _sceneHeight = window.innerHeight
  boundsMax = _engine.world.bounds.max
  renderOptions = _engine.render.options
  canvas = _engine.render.canvas
  boundsMax.x = _sceneWidth
  boundsMax.y = _sceneHeight
  canvas.width = renderOptions.width = _sceneWidth
  canvas.height = renderOptions.height = _sceneHeight
  Demo[_sceneName]()
  return

Demo.updateGravity = ->
  unless _engine then return
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

Demo.fullscreen = ->
  _fullscreenElement = _engine.render.canvas
  if not document.fullscreenElement and not document.mozFullScreenElement and not document.webkitFullscreenElement
    if _fullscreenElement.requestFullscreen
      _fullscreenElement.requestFullscreen()
    else if _fullscreenElement.mozRequestFullScreen
      _fullscreenElement.mozRequestFullScreen()
    else _fullscreenElement.webkitRequestFullscreen Element.ALLOW_KEYBOARD_INPUT  if _fullscreenElement.webkitRequestFullscreen
  return

Demo.reset = ->
  _world = _engine.world
  World.clear _world
  Engine.clear _engine
  offset = 25
  World.addBody _world, Bodies.rectangle(_sceneWidth * 0.5, -offset, _sceneWidth + 0.5, 50.5,
    isStatic: true
  )
  World.addBody _world, Bodies.rectangle(_sceneWidth * 0.5, _sceneHeight + offset, _sceneWidth + 0.5, 50.5,
    isStatic: true
  )
  World.addBody _world, Bodies.rectangle(_sceneWidth + offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 0.5,
    isStatic: true
  )
  World.addBody _world, Bodies.rectangle(-offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 0.5,
    isStatic: true
  )
  return
