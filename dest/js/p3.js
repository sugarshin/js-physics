(function() {
  var Bodies, Body, Common, Composite, Composites, Constraint, Demo, Engine, Gui, MouseConstraint, World, _engine, _sceneHeight, _sceneName, _sceneWidth;

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

  Demo = {};

  _engine = null;

  _sceneName = "mixed";

  _sceneWidth = null;

  _sceneHeight = null;

  Demo.init = function() {
    var canvasContainer;
    canvasContainer = document.getElementById('canvas-container');
    _engine = Engine.create(canvasContainer, {
      render: {
        strokeStyle: 'transparent',
        options: {
          background: '#fff',
          wireframes: false,
          showSleeping: false
        }
      }
    });
    Demo.fullscreen();
    Engine.run(_engine);
    Demo.updateScene();
    window.addEventListener('deviceorientation', Demo.updateGravity, true);
    window.addEventListener('orientationchange', (function() {
      Demo.updateGravity();
      Demo.updateScene();
    }), false);
  };

  window.addEventListener('load', Demo.init);

  Demo.mixed = function() {
    var rectangleSize, stack, tsumikiColor, _world;
    _world = _engine.world;
    Demo.reset();
    World.add(_world, MouseConstraint.create(_engine));
    rectangleSize = Common.random(24, 48);
    tsumikiColor = ['#23c2bd', '#64CCC7', '#80D1C5', '#919BC2', '#ff4c4f', '#ff695e', '#f76d6d', '#ff9c19', '#ffb617', '#ffc30f'];
    stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y, column, row) {
      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Math.random() < 0.8) {
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
          } else {
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
          }
          break;
        case 1:
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
    });
    World.add(_world, stack);
  };

  Demo.updateScene = function() {
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
    Demo[_sceneName]();
  };

  Demo.updateGravity = function() {
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

  Demo.fullscreen = function() {
    var _fullscreenElement;
    _fullscreenElement = _engine.render.canvas;
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (_fullscreenElement.requestFullscreen) {
        _fullscreenElement.requestFullscreen();
      } else if (_fullscreenElement.mozRequestFullScreen) {
        _fullscreenElement.mozRequestFullScreen();
      } else {
        if (_fullscreenElement.webkitRequestFullscreen) {
          _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
  };

  Demo.reset = function() {
    var offset, _world;
    _world = _engine.world;
    World.clear(_world);
    Engine.clear(_engine);
    offset = 25;
    World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, -offset, _sceneWidth + 0.5, 50.5, {
      isStatic: true
    }));
    World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, _sceneHeight + offset, _sceneWidth + 0.5, 50.5, {
      isStatic: true
    }));
    World.addBody(_world, Bodies.rectangle(_sceneWidth + offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 0.5, {
      isStatic: true
    }));
    World.addBody(_world, Bodies.rectangle(-offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 0.5, {
      isStatic: true
    }));
  };

}).call(this);
