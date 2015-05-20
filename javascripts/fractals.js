var c, canvas, canvases, context, height, i, iScale, len, rScale, renderer, width;

width = Math.max(document.body.clientWidth, window.innerWidth || 0);

height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

canvases = [document.getElementById('fractal1'), document.getElementById('fractal2')];

for (i = 0, len = canvases.length; i < len; i++) {
  canvas = canvases[i];
  canvas.setAttribute('width', width / 4);
  canvas.setAttribute('height', height / 4);
  canvas.style.visibility = 'hidden';
  canvas.style.width = width;
  canvas.style.height = height;
}

context = canvas.getContext('2d');

rScale = d3.scale.linear().range([0, width / 4]).domain([-1.7, 1.7]);

iScale = d3.scale.linear().range([0, height / 4]).domain([-1, 1]);

c = Math.random() > 0.9 ? new Complex(utils.randomNumber(), utils.randomNumber()) : void 0;

window.julia = new Julia(canvases, width / 4, height / 4, c);

renderer = function() {
  if (julia.done) {
    return julia.step();
  } else {
    return julia.render();
  }
};

setInterval(renderer, 5);
