class Utils
  randomInt: (min, max) -> Math.floor(Math.random() * (max - min + 1)) + min
  randomNumber: -> if Math.random() > 0.5 then -Math.random() else Math.random()

window.utils = new Utils()


