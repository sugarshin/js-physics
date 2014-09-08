// Array.indexOf Polyfill
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    if (len === 0) {
      return -1;
    }

    var n = 0;

    if (arguments.length > 0) {
      n = Number(arguments[1]);

      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n != 0 && n != Infinity && n != -Infinity) {
         n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    if (n >= len) {
      return -1;
    }

    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  }
}

// Array.filter Polyfill
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp */) {
    "use strict";

    if (this == null) throw new TypeError();

    var t = Object(this),
        len = t.length >>> 0;

    if (typeof fun != "function") throw new TypeError();

    var res = [],
        thisp = arguments[1];

    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisp, val, i, t)) res.push(val);
      }
    }

    return res;
  };
}

(function() {
  var animeTggle, btn, circle, elem, group, params, rect, two;
  elem = document.getElementById('output');
  params = {
    width: 960,
    height: 640
  };
  two = new Two(params).appendTo(elem);
  circle = two.makeCircle(-70, 0, 50);
  rect = two.makeRectangle(70, 0, 100, 100);
  circle.fill = '#FF8000';
  circle.stroke = 'orangered';
  circle.linewidth = 5;
  rect.fill = 'rgba(0, 200, 255, 0.75)';
  rect.stroke = 'orangered';
  rect.linewidth = 5;
  group = two.makeGroup(circle, rect);
  group.translation.set(two.width / 2, two.height / 2);
  group.scale = 1;
  group.stroke = '#d90';
  group.linewidth = 4;
  group.miter = 3;
  two.update();
  two.bind('update', function(frameCount) {
    var t;
    if (group.scale > 0.9999) {
      group.scale = group.rotation = 0;
    }
    t = (1 - group.scale) * 0.125;
    group.scale += t;
    group.rotation += t * 4 * Math.PI;
  });
  animeTggle = (function() {
    var isAnime;
    isAnime = false;
    return function() {
      if (isAnime === true) {
        isAnime = false;
        return two.pause();
      } else if (isAnime === false) {
        isAnime = true;
        return two.play();
      }
    };
  })();
  btn = document.getElementById('btn');
  btn.addEventListener('click', function() {
    animeTggle();
  });
})();
