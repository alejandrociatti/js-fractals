var Utils, _contains;

Utils = (function() {
  function Utils() {}

  Utils.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  Utils.prototype.randomNumber = function() {
    if (Math.random() > 0.5) {
      return -Math.random();
    } else {
      return Math.random();
    }
  };

  return Utils;

})();

window.utils = new Utils();

_contains = function(container, something) {
  return container.indexOf(something) !== -1;
};

Array.prototype.contains = function(element) {
  return _contains(this, element);
};

String.prototype.contains = function(element) {
  return _contains(this, element);
};

var canvas, canvases, context, height, i, iScale, len, rScale, renderer, width;

width = Math.max(document.body.clientWidth, window.innerWidth || 0);

height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

canvases = [document.getElementById('fractal1'), document.getElementById('fractal2')];

for (i = 0, len = canvases.length; i < len; i++) {
  canvas = canvases[i];
  canvas.style.visibility = 'hidden';
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
}

context = canvas.getContext('2d');

rScale = d3.scale.linear().range([0, width]).domain([-1.7, 1.7]);

iScale = d3.scale.linear().range([0, height]).domain([-1, 1]);

window.julia = new Julia(canvases, width, height);

renderer = function() {
  if (julia.done) {
    return julia.step();
  } else {
    return julia.render();
  }
};

setInterval(renderer, 5);
