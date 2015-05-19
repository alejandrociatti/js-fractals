class Point
  constructor: (@x, @y, iterations) ->
    @maxIterations = iterations

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