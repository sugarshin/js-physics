(function() {
  var bigCircle, discs, height, p1, rect, s, smallCircle, width;

  width = window.innerWidth;

  height = window.innerHeight;

  s = Snap(width, height);

  bigCircle = s.circle(100, 100, 100);

  bigCircle.attr({
    fill: '#bada55',
    stroke: '#000',
    strokeWidth: 5
  });

  smallCircle = s.circle(100, 150, 10);

  discs = s.group(smallCircle, s.circle(20, 150, 70));

  discs.attr({
    fill: '#fff',
    stroke: 'red'
  });

  bigCircle.attr({
    mask: discs
  });

  rect = s.rect(0, 0, 40, 40);

  rect.animate({
    width: 320,
    height: 320
  }, 600, null, function(a) {
    this.animate({
      width: 20,
      height: 20,
      fill: 'red'
    }, 1000);
    return console.log(this);
  });

  p1 = s.polyline([10, 10, 100, 100]);

  p1.attr({
    fill: '#bada55',
    stroke: '#000',
    strokeWidth: 5
  });

}).call(this);
