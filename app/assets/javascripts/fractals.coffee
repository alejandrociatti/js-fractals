if document.createElement('canvas').getContext == undefined
  alert 'Sorry, your browser lacks canvas support.'
else
  # PLASMA
  # =======
  # creating random initial values for RG&B
  red = utils.randomInt 0, 255
  green = utils.randomInt 0, 255
  blue = utils.randomInt 0, 255
  roughness = 4
  generator = new $plasma()                                     # instantiating plasma library
  generator.init 'plasma', 1080, 720, roughness, 0, red, green, blue  # initiating
  drawer1 = ->
    roughness += 2
    generator.draw(roughness, red, green)
    if roughness>=50
      red = utils.randomInt 0, 255
      green = utils.randomInt 0, 255
      blue = utils.randomInt 0, 255
      window.setTimeout(drawer2, 5000)
    else window.setTimeout(drawer1, 5000)
  drawer2 = ->
    roughness -= 2
    generator.draw(roughness, red, green)
    if roughness <= 4
      red = utils.randomInt 0, 255
      green = utils.randomInt 0, 255
      blue = utils.randomInt 0, 255
      window.setTimeout(drawer1, 5000)
    else window.setTimeout(drawer2, 5000)
  window.setTimeout drawer1, 5000
  # JULIA
  # =====
  julia = new Julia('fractal', 1080, 720, 1000, 4)
  julia.draw()
  window.setInterval (-> julia.draw(new Complex(utils.randomNumber(), utils.randomNumber()))), 5000