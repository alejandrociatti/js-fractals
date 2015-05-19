class Complex
  constructor: (@real, @imaginary) ->

  add: (complexN) ->
    real = @real + complexN.real
    imaginary = @imaginary + complexN.imaginary
    new Complex(real, imaginary)

  subtract: (complexN) ->
    real = @real = complexN.real
    imaginary = @imaginary = complexN.imaginary
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
