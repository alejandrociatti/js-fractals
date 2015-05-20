# PLASMA
# =======
# creating random initial values for RG&B
#red = utils.randomInt 0, 255
#green = utils.randomInt 0, 255
#blue = utils.randomInt 0, 255
#roughness = 4
#generator = new $plasma()                                     # instantiating plasma library
#generator.init 'plasma', 1080, 720, roughness, 0, red, green, blue  # initiating
#drawer1 = ->
#  roughness += 2
#  generator.draw(roughness, red, green)
#  if roughness>=50
#    red = utils.randomInt 0, 255
#    green = utils.randomInt 0, 255
#    blue = utils.randomInt 0, 255
#    window.setTimeout(drawer2, 5000)
#  else window.setTimeout(drawer1, 5000)
#drawer2 = ->
#  roughness -= 2
#  generator.draw(roughness, red, green)
#  if roughness <= 4
#    red = utils.randomInt 0, 255
#    green = utils.randomInt 0, 255
#    blue = utils.randomInt 0, 255
#    window.setTimeout(drawer1, 5000)
#  else window.setTimeout(drawer2, 5000)
#window.setTimeout drawer1, 5000

# JULIA
# =====
width = Math.max(document.body.clientWidth, window.innerWidth || 0)
height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
canvases = [document.getElementById('fractal1'), document.getElementById('fractal2')]
for canvas in canvases
  canvas.style.visibility = 'hidden'
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
context = canvas.getContext('2d')
rScale = d3.scale.linear().range([0, width]).domain([-1.7,1.7])
iScale = d3.scale.linear().range([0, height]).domain([-1,1])
window.julia = new Julia(canvases, width, height)

renderer = ->
  if julia.done then julia.step() else julia.render()

setInterval renderer, 5