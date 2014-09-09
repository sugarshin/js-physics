(function() {
  var animeToggle, btn, elem, group1, group2, group3, group4, group5, groupAll, params, polygon1, polygon10, polygon2, polygon3, polygon4, polygon5, polygon6, polygon7, polygon8, polygon9, size, tsumikiColor, two;
  elem = document.getElementById('output');
  params = {
    width: 960,
    height: 640
  };
  two = new Two(params).appendTo(elem);
  tsumikiColor = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];
  size = 64;
  polygon1 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon2 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon1.rotation = Math.PI;
  polygon2.translation.set(size, size * 0.75);
  group1 = two.makeGroup(polygon1, polygon2);
  group1.translation.set(size, size / 2);
  group1.fill = tsumikiColor[0];
  group1.noStroke();
  polygon3 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon4 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon3.rotation = Math.PI;
  polygon4.translation.set(size, size * 0.75);
  group2 = two.makeGroup(polygon3, polygon4);
  group2.translation.set(size * 2, size);
  group2.fill = tsumikiColor[1];
  group2.noStroke();
  polygon5 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon6 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon5.rotation = Math.PI;
  polygon6.translation.set(size, size * 0.75);
  group3 = two.makeGroup(polygon5, polygon6);
  group3.translation.set(0, size);
  group3.fill = tsumikiColor[2];
  group3.noStroke();
  polygon7 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon8 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon7.rotation = Math.PI;
  polygon8.translation.set(size, size * 0.75);
  group4 = two.makeGroup(polygon7, polygon8);
  group4.translation.set(size, size * 1.5);
  group4.fill = tsumikiColor[3];
  group4.noStroke();
  polygon9 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon10 = two.makePolygon(size, size / 2, size * 2, 0, 0, 0, false);
  polygon9.rotation = Math.PI;
  polygon10.translation.set(size, size * 0.75);
  group5 = two.makeGroup(polygon9, polygon10);
  group5.translation.set(size * 2, size * 2);
  group5.fill = tsumikiColor[4];
  group5.noStroke();
  groupAll = two.makeGroup(group1, group2, group3, group4, group5);
  groupAll.translation.set(300, 300);
  two.bind('update', function(frameCount) {
    var t;
    if (groupAll.scale > 0.9999) {
      groupAll.scale = groupAll.rotation = 0;
    }
    t = (1 - groupAll.scale) * 0.125;
    groupAll.scale += t;
    groupAll.rotation += t * 4 * Math.PI;
  }).play();
  animeToggle = (function() {
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
    animeToggle();
  });
})();
