class Utils

  randomInt: (min, max) -> Math.floor(Math.random() * (max - min + 1)) + min

  randomNumber: -> if Math.random() > 0.5 then -Math.random() else Math.random()

  randomColor: ->
    letters = '0123456789ABCDEF'.split('')
    color = '#';
    color+=letters[Math.floor(Math.random()*16)] for i in [0..6]
    color

window.utils = new Utils()

# contains fn addition
_contains = (container, something) -> container.indexOf(something) isnt -1
Array::contains = (element) -> _contains(@, element)
String::contains = (element) -> _contains(@, element)

