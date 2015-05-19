class Complex
  constructor: (@real, @imaginary) ->

  add: (complexN) ->
    real = @real + complexN.real
    imaginary = @imaginary + complexN.imaginary
    new Complex(real, imaginary)

  multiply: (complexN) ->
    real = (@real * complexN.real) - (@imaginary * complexN.imaginary)
    imaginary = (@real * complexN.imaginary) + (@imaginary * complexN.real)
    new Complex(real, imaginary)

  square: -> @.multiply(@)

  modulus: -> Math.sqrt((@real*@real)+(@imaginary*@imaginary))

  toString: ->
    sign = if @imaginary >= 0 then '+' else '-'
    @real+sign+'i'+@imaginary

class Point
  constructor: (@x, @y, @context) ->

  getColor: ->
    if @iterations < 0
      '#000000'
    else if @iterations < 2
      '#0A1FFF'
    else if @iterations < 3
      '#3B0AFF'
    else if @iterations < 4
      '#680AFF'
    else if @iterations < 5
      '#9D0AFF'
    else if @iterations < 6
      '#CE0AFF'
    else if @iterations < 7
      '#FF0AEF'
    else if @iterations < 8
      '#FF0A6C'
    else if @iterations < 9
      '#FF0A2B'
    else if @iterations < 10
      '#FF0000'
    else if @iterations < 12
      '#FF2200'
    else if @iterations < 13
      '#FF5500'
    else if @iterations < 14
      '#FFA200'
    else if @iterations < 15
      '#FFE100'
    else if @iterations < 16
      '#DDFF00'
    else if @iterations < 17
      '#AAFF00'
    else if @iterations < 18
      '#7BFF00'
    else if @iterations < 19
      '#26FF00'
    else if @iterations < 20
      '#00FF26'
    else if @iterations < 25
      '#00FF77'
    else if @iterations < 30
      '#00FFC8'
    else '00FFFF'

  draw: ->
    @context.fillStyle = @getColor()
    @context.fillRect(@x, @y, 1, 1)

  checkEscape: (c, iterationsMax, boundary) ->
    iterations = 0
    @iterations = -1
    escaped = false
    while (not escaped) and (iterations < iterationsMax)
      if(@complex.modulus() > boundary)
        escaped = true
        @iterations = iterations
      @complex = c.add(@complex.square())
      iterations++
    return @iterations

  toString: -> "x:#{@x},y:#{@y}"

class Canvas
  constructor: (canvasID, @width, @height) ->
    @canvas = document.getElementById(canvasID)
    @canvas.width = @width
    @canvas.height = @height
    context = @canvas.getContext('2d')
    @points = []
    for y in [0..@height]
      for x in [0..@width]
        @points.push(new Point(x, y, context))

  getPoint: (x, y) -> @points[x+y*@height]

class Julia
  constructor: (canvasID, width, height, @iterations, @boundary) ->
    @canvas = new Canvas(canvasID, width, height)
    @stepsize = 2/350
    @start = new Complex(-2, 2)
    @c = new Complex(utils.randomNumber(), utils.randomNumber() )

  draw: (c) ->
    @c = c if c isnt undefined
    for point in @canvas.points
      point.complex = new Complex((@start.real + point.x*@stepsize), (@start.imaginary - point.y*@stepsize))
      point.checkEscape(@c, @iterations, @boundary)
      point.draw()

window.Complex = Complex
window.Julia = Julia