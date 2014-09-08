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
