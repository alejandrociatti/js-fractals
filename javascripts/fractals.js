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
    julia = new Julia('fractal', 1080, 720);
    julia.draw();
    window.setInterval((function() {
      return julia.draw(new Complex(utils.randomNumber(), utils.randomNumber()));
    }), 5000);
  }

}).call(this);
