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
