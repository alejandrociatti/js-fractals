var Complex;

Complex = (function() {
  function Complex(real1, imaginary1) {
    this.real = real1;
    this.imaginary = imaginary1;
  }

  Complex.prototype.add = function(complexN) {
    var imaginary, real;
    real = this.real + complexN.real;
    imaginary = this.imaginary + complexN.imaginary;
    return new Complex(real, imaginary);
  };

  Complex.prototype.subtract = function(complexN) {
    var imaginary, real;
    real = this.real - complexN.real;
    imaginary = this.imaginary - complexN.imaginary;
    return new Complex(real, imaginary);
  };

  Complex.prototype.multiply = function(complexN) {
    var imaginary, real;
    real = (this.real * complexN.real) - (this.imaginary * complexN.imaginary);
    imaginary = (this.real * complexN.imaginary) + (this.imaginary * complexN.real);
    return new Complex(real, imaginary);
  };

  Complex.prototype.square = function() {
    return this.multiply(this);
  };

  Complex.prototype.iterate = function(c) {
    var imaginary, real;
    real = this.real * this.real - this.imaginary * this.imaginary + c.real;
    imaginary = 2 * this.imaginary * this.real + c.imaginary;
    return new Complex(real, imaginary);
  };

  Complex.prototype.modulus = function() {
    return Math.sqrt((this.real * this.real) + (this.imaginary * this.imaginary));
  };

  Complex.prototype.toString = function() {
    var sign;
    sign = this.imaginary >= 0 ? '+' : '-';
    return this.real + sign + 'i' + this.imaginary;
  };

  return Complex;

})();

var Julia;

Julia = (function() {
  function Julia(canvases, width, height, c) {
    this.canvases = canvases;
    this.width = width;
    this.height = height;
    this.c = c;
    this.canvas = this.canvases[0];
    this.context = this.canvas.getContext('2d');
    if (this.c === void 0) {
      this.c = new Complex(-0.8, 0.156);
    }
    this.min = new Complex(-1.7, -1);
    this.max = new Complex(1.7, 1);
    this.maxIterations = 2000;
    this.minResolution = 40;
    this.resolution = this.minResolution;
    this.boundary = 4;
    this.x = 0;
    this.y = 0;
    this.getColor = _.memoize(this.coloringFn);
  }

  Julia.prototype.coloringFn = d3.scale.linear().domain([0, 12, 30, 50, 100, 180, 260, 380, 600, 800, 1200, 1600, 3200]).range(randomColor({
    count: 13,
    luminosity: 'random',
    hue: 'random'
  })).interpolate(d3.interpolateHcl);

  Julia.prototype.iterate = function(nextN) {
    var iterations;
    iterations = 0;
    while (true) {
      iterations++;
      if (iterations > this.maxIterations) {
        return 0;
      }
      nextN = nextN.iterate(this.c);
      if (nextN.real > 4 || nextN.imaginary > 4) {
        return iterations;
      }
    }
    return iterations;
  };

  Julia.prototype.render = function() {
    var fx, fy, ll, n, span;
    if (this.done) {
      return;
    }
    span = this.max.subtract(this.min);
    ll = this.x + 6;
    while (this.x < ll) {
      this.x++;
      this.y = 0;
      while (this.y < this.height) {
        this.y++;
        fx = this.x / this.width;
        fy = this.y / this.height;
        n = new Complex(fx * span.real + this.min.real, fy * span.imaginary + this.min.imaginary);
        this.context.fillStyle = this.getColor(this.iterate(n));
        this.context.fillRect(this.x, this.y, 1, 1);
      }
    }
    if (this.x >= this.width) {
      this.done = true;
      return this.flipCanvas();
    }
  };

  Julia.prototype.reset = function() {
    this.x = 0;
    this.y = 0;
    this.resolution = this.minResolution;
    return this.done = false;
  };

  Julia.prototype.step = function() {
    var step;
    this.done = true;
    step = new Complex(0.0002 * this.width, 0.0002 * this.height);
    this.min = this.min.add(step);
    this.max = this.max.subtract(step);
    if (this.min.real > 1.7) {
      this.min = new Complex(-1.7, -1);
      this.max = new Complex(1.7, 1);
      this.c = new Complex(utils.randomNumber(), utils.randomNumber());
    }
    return this.reset();
  };

  Julia.prototype.flipCanvas = function() {
    var index;
    index = this.canvases.indexOf(this.canvas) === 0 ? 1 : 0;
    this.canvas.style.visibility = 'visible';
    this.canvas = this.canvases[index];
    this.context = this.canvas.getContext('2d');
    return this.canvas.style.visibility = 'hidden';
  };

  Julia.prototype.zoom = function(min, max) {
    this.done = true;
    this.min = min;
    this.max = max;
    return this.reset();
  };

  return Julia;

})();
