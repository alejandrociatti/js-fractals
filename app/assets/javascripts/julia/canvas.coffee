class Canvas
  constructor: (canvasID, @width, @height) ->
    @canvas = document.getElementById(canvasID)
    @canvas.width = @width
    @canvas.height = @height
    @rScale = d3.scale.linear().range([0, @width]).domain([-1.7, 1.7])
    @iScale = d3.scale.linear().range([0, @height]).domain([-1, 1])
    context = @canvas.getContext('2d')
    @points = []
    for y in [0..@height]
      for x in [0..@width]
        @points.push(new Point(x, y, context))

  getPoint: (x, y) -> @points[x+y*@height]