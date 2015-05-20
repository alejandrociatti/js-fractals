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

  Utils.prototype.randomColor = function() {
    var color, i, j, letters;
    letters = '0123456789ABCDEF'.split('');
    color = '#';
    for (i = j = 0; j <= 6; i = ++j) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
