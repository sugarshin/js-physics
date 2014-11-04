(function() {
  var Bodies, Body, Common, Composite, Composites, Constraint, Engine, Events, MouseConstraint, World, cconstraint, counter, engine, explosion, mouse, mouseConstraint, offset, rectangleSize, sceneHeight, sceneWidth, timeScaleTarget, tsumikiColor, updateScene;

  Engine = Matter.Engine;

  World = Matter.World;

  Body = Matter.Body;

  Bodies = Matter.Bodies;

  Common = Matter.Common;

  Constraint = Matter.Constraint;

  Composites = Matter.Composites;

  Composite = Matter.Composite;

  Events = Matter.Events;

  MouseConstraint = Matter.MouseConstraint;

  engine = Engine.create(document.body, {
    render: {
      strokeStyle: 'transparent',
      options: {
        background: '#fff',
        wireframes: false,
        showSleeping: false
      }
    }
  });

  mouse = engine.input.mouse;

  cconstraint = Constraint.create({
    label: 'Mouse Constraint',
    pointA: mouse.position,
    pointB: {
      x: 0,
      y: 0
    },
    length: 0.01,
    stiffness: 0.1,
    angularStiffness: 1,
    render: {
      strokeStyle: 'transparent',
      lineWidth: 1
    }
  });

  mouseConstraint = MouseConstraint.create(engine, {
    type: 'mouseConstraint',
    mouse: mouse,
    dragBody: null,
    dragPoint: null,
    constraint: cconstraint
  });

  World.add(engine.world, mouseConstraint);

  updateScene = function() {
    var boundsMax, canvas, renderOptions, _sceneHeight, _sceneWidth;
    if (!engine) {
      return;
    }
    _sceneWidth = window.innerWidth;
    _sceneHeight = window.innerHeight;
    boundsMax = engine.world.bounds.max;
    renderOptions = engine.render.options;
    canvas = engine.render.canvas;
    boundsMax.x = _sceneWidth;
    boundsMax.y = _sceneHeight;
    canvas.width = renderOptions.width = _sceneWidth;
    canvas.height = renderOptions.height = _sceneHeight;
  };

  updateScene();

  explosion = function(engine) {
    var bodies, body, forceMagnitude, i;
    bodies = Composite.allBodies(engine.world);
    i = 0;
    while (i < bodies.length) {
      body = bodies[i];
      if (!body.isStatic) {
        forceMagnitude = 0.025 * body.mass;
        Body.applyForce(body, {
          x: 0,
          y: 0
        }, {
          x: (forceMagnitude + Math.random() * forceMagnitude) * Common.choose([1, -1]),
          y: -forceMagnitude + Math.random() * -forceMagnitude
        });
      }
      i++;
    }
  };

  timeScaleTarget = 1;

  counter = 20;

  Events.on(engine, 'tick', function(event) {
    engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;
    counter += 1;
    if (counter >= 60 * 2.5) {
      if (timeScaleTarget < 1) {
        timeScaleTarget = 1;
      } else {
        timeScaleTarget = 0.05;
      }
      explosion(engine);
      counter = 0;
    }
  });

  tsumikiColor = ['#23c2bd', '#64CCC7', '#80D1C5', '#919BC2', '#ff4c4f', '#ff695e', '#f76d6d', '#ff9c19', '#ffb617', '#ffc30f'];

  rectangleSize = Common.random(24, 48);

  World.add(engine.world, Composites.stack(50, 50, 30, 3, 0, 0, function(x, y, column, row) {
    switch (Math.round(Common.random(0, 2))) {
      case 0:
        return Bodies.rectangle(x, y, rectangleSize, rectangleSize, {
          frictionAir: 0,
          friction: 0.0001,
          restitution: 0.8,
          density: 0.05,
          render: {
            lineWidth: 1,
            fillStyle: tsumikiColor[Math.floor(Math.random() * 10)],
            strokeStyle: 'rgba(0,0,0,0)'
          }
        });
      case 1:
        return Bodies.polygon(x, y, 3, Common.random(16, 32), {
          frictionAir: 0,
          friction: 0.0001,
          restitution: 0.8,
          density: 0.05,
          render: {
            lineWidth: 1,
            fillStyle: tsumikiColor[Math.floor(Math.random() * 10)],
            strokeStyle: 'rgba(0,0,0,0)'
          }
        });
      case 2:
        return Bodies.circle(x, y, Common.random(20, 30), {
          frictionAir: 0,
          friction: 0.0001,
          restitution: 0.8,
          density: 0.05,
          render: {
            lineWidth: 1,
            fillStyle: tsumikiColor[Math.floor(Math.random() * 10)],
            strokeStyle: 'rgba(0,0,0,0)'
          }
        }, Common.random(20, 40));
    }
  }));

  offset = 5;

  sceneWidth = window.innerWidth;

  sceneHeight = window.innerHeight;

  World.add(engine.world, [
    Bodies.rectangle(sceneWidth / 2, -offset, sceneWidth + 2 * offset, 8, {
      isStatic: true
    }), Bodies.rectangle(sceneWidth / 2, sceneHeight + offset, sceneWidth + 2 * offset, 8, {
      isStatic: true
    }), Bodies.rectangle(sceneWidth + offset, sceneHeight / 2, 8, sceneHeight + 2 * offset, {
      isStatic: true
    }), Bodies.rectangle(-offset, sceneHeight / 2, 8, sceneHeight + 2 * offset, {
      isStatic: true
    })
  ]);

  Engine.run(engine);

}).call(this);
