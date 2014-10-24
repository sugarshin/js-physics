Engine = Matter.Engine
World = Matter.World
Body = Matter.Body
Bodies = Matter.Bodies
Common = Matter.Common
Constraint = Matter.Constraint
Composites = Matter.Composites
Composite = Matter.Composite
Events = Matter.Events
MouseConstraint = Matter.MouseConstraint

engine = Engine.create(document.body,
  render:
    strokeStyle: 'transparent'
    options:
      # showAngleIndicator: true
      # wireframes: true
      background: '#fff'
      wireframes: false
      showSleeping: false
)

mouse = engine.input.mouse

cconstraint = Constraint.create(
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


mouseConstraint = MouseConstraint.create(engine,
  type: 'mouseConstraint'
  mouse: mouse
  dragBody: null
  dragPoint: null
  constraint: cconstraint
)

World.add engine.world, mouseConstraint

updateScene = ->
  return unless engine

  # _sceneWidth = document.documentElement.clientWidth
  # _sceneHeight = document.documentElement.clientHeight
  _sceneWidth = window.innerWidth
  _sceneHeight = window.innerHeight

  boundsMax = engine.world.bounds.max
  renderOptions = engine.render.options
  canvas = engine.render.canvas

  boundsMax.x = _sceneWidth
  boundsMax.y = _sceneHeight

  canvas.width = renderOptions.width = _sceneWidth
  canvas.height = renderOptions.height = _sceneHeight

  # App[_sceneName]()

  return
# updateScene ---------------------------------------
updateScene()
# fullscreen = ->
#   _fullscreenElement = engine.render.canvas

#   if not document.fullscreenElement and not document.mozFullScreenElement and not document.webkitFullscreenElement
#     if _fullscreenElement.requestFullscreen
#       _fullscreenElement.requestFullscreen()
#     else if _fullscreenElement.mozRequestFullScreen
#       _fullscreenElement.mozRequestFullScreen()
#     else if _fullscreenElement.webkitRequestFullscreen
#       _fullscreenElement.webkitRequestFullscreen Element.ALLOW_KEYBOARD_INPUT

#   return

# fullscreen()


explosion = (engine) ->
  bodies = Composite.allBodies engine.world
  i = 0

  while i < bodies.length
    body = bodies[i]
    if not body.isStatic and body.position.y >= 500
      forceMagnitude = 0.05 * body.mass
      Body.applyForce body,
        x: 0
        y: 0
      ,
        x: (forceMagnitude + Math.random() * forceMagnitude) * Common.choose([
          1
          -1
        ])
        y: -forceMagnitude + Math.random() * -forceMagnitude

    i++
  return

timeScaleTarget = 1
counter = 20
Events.on engine, 'tick', (event) ->

  engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05
  counter += 1

  # every 2 sec
  if counter >= 60 * 3

    # flip the timescale
    if timeScaleTarget < 1
      timeScaleTarget = 1
    else
      timeScaleTarget = 0.05

    # create some random forces
    explosion engine

    # reset counter
    counter = 0
  return


tsumikiColor = [
  '#23c2bd'
  '#64CCC7'
  '#80D1C5'
  '#919BC2'
  '#ff4c4f'
  '#ff695e'
  '#f76d6d'
  '#ff9c19'
  '#ffb617'
  '#ffc30f'
]













# bodyOptions =
#   frictionAir: 0
#   friction: 0.0001
#   restitution: 0.8
#   render:
#     lineWidth: 1
#     # setBackground: '#000'
#     fillStyle: tsumikiColor[Math.floor Math.random() * 10]



# World.add engine.world, Composites.stack(20, 100, 15, 3, 20, 40, (x, y, column, row) ->
#   Bodies.circle x, y, Common.random(10, 20), bodyOptions
# )

# add some larger random bouncy objects
rectangleSize = Common.random(24, 48)
World.add engine.world, Composites.stack(50, 50, 30, 3, 0, 0, (x, y, column, row) ->
  switch Math.round(Common.random(0, 2))
    when 0
      return Bodies.rectangle(x, y, rectangleSize, rectangleSize,
        frictionAir: 0
        friction: 0.0001
        restitution: 0.8
        render:
          lineWidth: 1
          fillStyle: tsumikiColor[Math.floor Math.random() * 10]
      )
    when 1
      return Bodies.polygon(x, y, 3, Common.random(16, 32),
        frictionAir: 0
        friction: 0.0001
        restitution: 0.8
        render:
          lineWidth: 1
          fillStyle: tsumikiColor[Math.floor Math.random() * 10]
      )
    when 2
      return  Bodies.circle(x, y, Common.random(20, 30),
        frictionAir: 0
        friction: 0.0001
        restitution: 0.8
        render:
          lineWidth: 1
          fillStyle: tsumikiColor[Math.floor Math.random() * 10]
      , Common.random(20, 40)
      )
)

# add some some walls to the world
offset = 5
sceneWidth = window.innerWidth
sceneHeight = window.innerHeight

World.add engine.world, [
  Bodies.rectangle(sceneWidth / 2, -offset, sceneWidth + 2 * offset, 8,
    isStatic: true
  )
  Bodies.rectangle(sceneWidth / 2, sceneHeight + offset, sceneWidth + 2 * offset, 8,
    isStatic: true
  )
  Bodies.rectangle(sceneWidth + offset, sceneHeight / 2, 8, sceneHeight + 2 * offset,
    isStatic: true
  )
  Bodies.rectangle(-offset, sceneHeight / 2, 8, sceneHeight + 2 * offset,
    isStatic: true
  )
]

# run the engine
Engine.run engine