class Julia
  constructor: (canvasID, @width, @height) ->
    @min = new Complex(-1.7, -1)
    @max = new Complex(1.7, 1)
    @c = new Complex(-0.8, 0.156)
    @maxIterations = 2000
    @boundary = 4
    @resolution = 21
    canvas = new Canvas(canvasID, width, height)
    @stepsize = 3/height
    @start = new Complex(-2, 2)

  draw: (c) ->
    @c = c if c isnt undefined
    for point in @canvas.points
      point.complex = new Complex((@start.real + point.x*@stepsize), (@start.imaginary - point.y*@stepsize))
      point.checkEscape(@c, @iterations, @boundary)
      point.draw()

  boxes = ->
    return false if @resolution <= 3
    span = @max.subtract(@min)
    for x in [0..@width] by @resolution
      for y in [0..@height] by @resolution
        fx = (x + resolution/2) / @width
        fy = (y + resolution/2) / @height
        n = new Complex(fx*span.real+@min.real, fy*span.imaginary+@min.imaginary)
        iterate(n)


  getColor: ->
    coloringFn = -> d3.scale.sqrt().domain([0, @maxIterations]).range(['white','black']).interpolate(d3.interpolateLab)
    _memoize coloringFn


window.Complex = Complex
window.Julia = Julia