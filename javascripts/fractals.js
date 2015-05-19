(function() {
  var Utils;

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

}).call(this);

(function() {
  var Canvas, Complex, Julia, Point;

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

    Complex.prototype.multiply = function(complexN) {
      var imaginary, real;
      real = (this.real * complexN.real) - (this.imaginary * complexN.imaginary);
      imaginary = (this.real * complexN.imaginary) + (this.imaginary * complexN.real);
      return new Complex(real, imaginary);
    };

    Complex.prototype.square = function() {
      return this.multiply(this);
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

  Point = (function() {
    function Point(x1, y1, context1) {
      this.x = x1;
      this.y = y1;
      this.context = context1;
    }

    Point.prototype.getColor = function() {
      if (this.iterations < 0) {
        return '#000000';
      } else if (this.iterations < 2) {
        return '#0A1FFF';
      } else if (this.iterations < 3) {
        return '#3B0AFF';
      } else if (this.iterations < 4) {
        return '#680AFF';
      } else if (this.iterations < 5) {
        return '#9D0AFF';
      } else if (this.iterations < 6) {
        return '#CE0AFF';
      } else if (this.iterations < 7) {
        return '#FF0AEF';
      } else if (this.iterations < 8) {
        return '#FF0A6C';
      } else if (this.iterations < 9) {
        return '#FF0A2B';
      } else if (this.iterations < 10) {
        return '#FF0000';
      } else if (this.iterations < 12) {
        return '#FF2200';
      } else if (this.iterations < 13) {
        return '#FF5500';
      } else if (this.iterations < 14) {
        return '#FFA200';
      } else if (this.iterations < 15) {
        return '#FFE100';
      } else if (this.iterations < 16) {
        return '#DDFF00';
      } else if (this.iterations < 17) {
        return '#AAFF00';
      } else if (this.iterations < 18) {
        return '#7BFF00';
      } else if (this.iterations < 19) {
        return '#26FF00';
      } else if (this.iterations < 20) {
        return '#00FF26';
      } else if (this.iterations < 25) {
        return '#00FF77';
      } else if (this.iterations < 30) {
        return '#00FFC8';
      } else {
        return '00FFFF';
      }
    };

    Point.prototype.draw = function() {
      this.context.fillStyle = this.getColor();
      return this.context.fillRect(this.x, this.y, 1, 1);
    };

    Point.prototype.checkEscape = function(c, iterationsMax, boundary) {
      var escaped, iterations;
      iterations = 0;
      this.iterations = -1;
      escaped = false;
      while ((!escaped) && (iterations < iterationsMax)) {
        if (this.complex.modulus() > boundary) {
          escaped = true;
          this.iterations = iterations;
        }
        this.complex = c.add(this.complex.square());
        iterations++;
      }
      return this.iterations;
    };

    Point.prototype.toString = function() {
      return "x:" + this.x + ",y:" + this.y;
    };

    return Point;

  })();

  Canvas = (function() {
    function Canvas(canvasID, width1, height1) {
      var context, i, j, ref, ref1, x, y;
      this.width = width1;
      this.height = height1;
      this.canvas = document.getElementById(canvasID);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      context = this.canvas.getContext('2d');
      this.points = [];
      for (y = i = 0, ref = this.height; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {
        for (x = j = 0, ref1 = this.width; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
          this.points.push(new Point(x, y, context));
        }
      }
    }

    Canvas.prototype.getPoint = function(x, y) {
      return this.points[x + y * this.height];
    };

    return Canvas;

  })();

  Julia = (function() {
    function Julia(canvasID, width, height, iterations1, boundary1) {
      this.iterations = iterations1;
      this.boundary = boundary1;
      this.canvas = new Canvas(canvasID, width, height);
      this.stepsize = 2 / 350;
      this.start = new Complex(-2, 2);
      this.c = new Complex(utils.randomNumber(), utils.randomNumber());
    }

    Julia.prototype.draw = function(c) {
      var i, len, point, ref, results;
      if (c !== void 0) {
        this.c = c;
      }
      ref = this.canvas.points;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        point = ref[i];
        point.complex = new Complex(this.start.real + point.x * this.stepsize, this.start.imaginary - point.y * this.stepsize);
        point.checkEscape(this.c, this.iterations, this.boundary);
        results.push(point.draw());
      }
      return results;
    };

    return Julia;

  })();

  window.Complex = Complex;

  window.Julia = Julia;

}).call(this);

(function() {
  var blue, drawer1, drawer2, generator, green, julia, red, roughness;

  if (document.createElement('canvas').getContext === void 0) {
    alert('Sorry, your browser lacks canvas support.');
  } else {
    red = utils.randomInt(0, 255);
    green = utils.randomInt(0, 255);
    blue = utils.randomInt(0, 255);
    roughness = 4;
    generator = new $plasma();
    generator.init('plasma', 1080, 720, roughness, 0, red, green, blue);
    drawer1 = function() {
      roughness += 2;
      generator.draw(roughness, red, green);
      if (roughness >= 50) {
        red = utils.randomInt(0, 255);
        green = utils.randomInt(0, 255);
        blue = utils.randomInt(0, 255);
        return window.setTimeout(drawer2, 5000);
      } else {
        return window.setTimeout(drawer1, 5000);
      }
    };
    drawer2 = function() {
      roughness -= 2;
      generator.draw(roughness, red, green);
      if (roughness <= 4) {
        red = utils.randomInt(0, 255);
        green = utils.randomInt(0, 255);
        blue = utils.randomInt(0, 255);
        return window.setTimeout(drawer1, 5000);
      } else {
        return window.setTimeout(drawer2, 5000);
      }
    };
    window.setTimeout(drawer1, 5000);
    julia = new Julia('fractal', 1080, 720, 1000, 4);
    julia.draw();
    window.setInterval((function() {
      return julia.draw(new Complex(utils.randomNumber(), utils.randomNumber()));
    }), 5000);
  }

}).call(this);
