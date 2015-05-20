class Julia

  constructor: (@canvases, @width, @height) ->
    @canvas = @canvases[0]
    @context = @canvas.getContext('2d')
    @min = new Complex(-1.7, -1)
    @max = new Complex(1.7, 1)
    @c = new Complex(-0.8, 0.156)
    @maxIterations = 2000
    @minResolution = 40
    @resolution = @minResolution
    @boundary = 4
    @x = 0
    @y = 0
    @getColor = _.memoize(@coloringFn)

  coloringFn: d3.scale.linear().domain(
    [0, 12, 30, 50, 100, 180, 260, 380, 600, 800, 1200, 1600,3200]
  ).range(
    ["moccasin", "#999", "steelblue", "yellow", "brown", "#222", "pink",
     "purple", "#027", "#260", "orange", "yellow", "blue"]
  ).interpolate(d3.interpolateHcl)

  boxes: ->
    return false if @resolution <= 3
    span = @max.subtract(@min)
    while @x < @width
      @x += @resolution
      while @y < @height
        @y += @resolution
        fx = (@x + @resolution/2) / @width
        fy = (@y + @resolution/2) / @height
        n = new Complex(fx*span.real+@min.real, fy*span.imaginary+@min.imaginary)
        @context.fillStyle = @getColor @iterate n # iterate N, get color for its iterations, assign color to fillStyle
        @context.fillRect(@x, @y, @resolution, @resolution)
    @resolution -= 3
    @x = 0
    @y = 0
    return true

  iterate: (nextN) ->
    iterations = 0
    loop
      iterations++
      return 0 if iterations > @maxIterations
      nextN = nextN.iterate(@c)
      return iterations if nextN.real > 4 || nextN.imaginary > 4
    return iterations

  render: ->
    return if @done || @boxes()
    span = @max.subtract(@min)
    ll = @x + 6
    while @x < ll
      @x++
      @y = 0
      while @y < @height
        @y++
        fx = @x / @width
        fy = @y / @height
        n = new Complex(fx * span.real + @min.real, fy * span.imaginary + @min.imaginary)
        @context.fillStyle =  @getColor @iterate n
        @context.fillRect(@x, @y, 1, 1)
    if @x >= @width
      @done = true
      @flipCanvas()

  reset: ->
    @x = 0
    @y = 0
    @resolution = @minResolution
    @done = false

  step: ->
    @done = true
    step = new Complex(0.1, 0.1)
    @min = @min.add(step)
    @max = @max.subtract(step)
    @reset()

  flipCanvas: ->
    index = if @canvases.indexOf(@canvas) == 0 then 1 else 0
    @canvas.style.visibility = 'visible'
    @canvas = @canvases[index]
    @context = @canvas.getContext('2d')
    @canvas.style.visibility = 'hidden'

  zoom: (min, max) ->
    @done = true
    @min = min
    @max = max
    @reset()