(function() {
  var App, Bodies, Body, Common, Composite, Composites, Constraint, Engine, Gui, MouseConstraint, World, _engine, _sceneHeight, _sceneName, _sceneWidth;
  Engine = Matter.Engine;
  Gui = Matter.Gui;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Composite = Matter.Composite;
  Composites = Matter.Composites;
  Common = Matter.Common;
  Constraint = Matter.Constraint;
  MouseConstraint = Matter.MouseConstraint;
  App = {};
  _engine = void 0;
  _sceneName = 'tsumiki';
  _sceneWidth = void 0;
  _sceneHeight = void 0;
  App.init = function() {
    var container;
    container = document.getElementById('container');
    _engine = Engine.create(container, {
      render: {
        options: {
          background: '#fff',
          wireframes: false,
          showSleeping: false
        }
      }
    });
    Engine.run(_engine);
    App.updateScene();
    return;
    window.addEventListener('deviceorientation', App.updateGravity, true);
    window.addEventListener('touchstart', App.fullscreen);
    window.addEventListener('orientationchange', function() {
      App.updateGravity();
      App.updateScene();
      App.fullscreen();
    }, false);
  };
  App.tsumiki = function() {
    var cconstraint, mouse, stack, tsumikiColor, _world;
    _world = _engine.world;
    App.reset();
    mouse = _engine.input.mouse;
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
    World.add(_world, MouseConstraint.create(_engine, {
      type: 'mouseConstraint',
      mouse: mouse,
      dragBody: null,
      dragPoint: null,
      constraint: cconstraint
    }));
    tsumikiColor = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];
    stack = Composites.stack(_sceneWidth / 8, _sceneHeight / 6, 5, 5, 0, 0, function(x, y, column, row) {
      var offset, rectangleSize;
      rectangleSize = Common.random(24, 48);
      offset = 8;
      switch (Math.round(Common.random(0, 2))) {
        case 0:
          return Bodies.rectangle(x + offset, y + offset, rectangleSize, rectangleSize, {
            friction: 0,
            frictionAir: 0,
            restitution: 0.05,
            density: 0.1,
            render: {
              lineWidth: 1,
              fillStyle: tsumikiColor[Math.floor(Math.random() * 10)]
            }
          });
        case 1:
          return Bodies.polygon(x + offset, y + offset, 3, Common.random(16, 32), {
            friction: 0,
            frictionAir: 0,
            restitution: 0.05,
            render: {
              lineWidth: 1,
              fillStyle: tsumikiColor[Math.floor(Math.random() * 10)]
            }
          });
        case 2:
          return Bodies.circle(x + offset, y + offset, Common.random(20, 30), {
            friction: 0,
            frictionAir: 0,
            restitution: 0.05,
            render: {
              lineWidth: 1,
              fillStyle: tsumikiColor[Math.floor(Math.random() * 10)]
            }
          }, Common.random(20, 40));
      }
    });
    World.add(_world, stack);
  };
  App.updateScene = function() {
    var boundsMax, canvas, renderOptions;
    if (!_engine) {
      return;
    }
    _sceneWidth = window.innerWidth;
    _sceneHeight = window.innerHeight;
    boundsMax = _engine.world.bounds.max;
    renderOptions = _engine.render.options;
    canvas = _engine.render.canvas;
    boundsMax.x = _sceneWidth;
    boundsMax.y = _sceneHeight;
    canvas.width = renderOptions.width = _sceneWidth;
    canvas.height = renderOptions.height = _sceneHeight;
    App[_sceneName]();
  };
  App.updateGravity = function() {
    var gravity, orientation;
    if (!_engine) {
      return;
    }
    orientation = window.orientation;
    gravity = _engine.world.gravity;
    if (orientation === 0) {
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(event.beta, -90, 90) / 90;
    } else if (orientation === 180) {
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
    } else if (orientation === 90) {
      gravity.x = Common.clamp(event.beta, -90, 90) / 90;
      gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
    } else if (orientation === -90) {
      gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
      gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
    }
  };
  App.fullscreen = function() {
    var _fullscreenElement;
    _fullscreenElement = _engine.render.canvas;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (_fullscreenElement.requestFullscreen) {
        _fullscreenElement.requestFullscreen();
      } else if (_fullscreenElement.mozRequestFullScreen) {
        _fullscreenElement.mozRequestFullScreen();
      } else if (_fullscreenElement.webkitRequestFullscreen) {
        _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
  };
  App.reset = function() {
    var offset, _world;
    _world = _engine.world;
    Common._seed = 2;
    World.clear(_world);
    Engine.clear(_engine);
    offset = 4;
    World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, _sceneHeight - offset / 2, _sceneWidth, offset, {
      isStatic: true
    }));
    World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, 0 + offset / 2, _sceneWidth, offset, {
      isStatic: true
    }));
    World.addBody(_world, Bodies.rectangle(0 + offset / 2, _sceneHeight * 0.5, offset, _sceneHeight + 0.5, {
      isStatic: true
    }));
    World.addBody(_world, Bodies.rectangle(_sceneWidth - offset / 2, _sceneHeight * 0.5, offset, _sceneHeight + 0.5, {
      isStatic: true
    }));
  };
  window.addEventListener('load', App.init);
})();
