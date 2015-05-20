class Complex
  constructor: (@real, @imaginary) ->

  add: (complexN) ->
    real = @real + complexN.real
    imaginary = @imaginary + complexN.imaginary
    new Complex(real, imaginary)

  subtract: (complexN) ->
    real = @real - complexN.real
    imaginary = @imaginary - complexN.imaginary
    new Complex(real, imaginary)

  multiply: (complexN) ->
    real = (@real * complexN.real) - (@imaginary * complexN.imaginary)
    imaginary = (@real * complexN.imaginary) + (@imaginary * complexN.real)
    new Complex(real, imaginary)

  square: -> @.multiply(@)

  iterate: (c) ->
    real = @real * @real - @imaginary * @imaginary + c.real
    imaginary = 2 * @imaginary  * @real + c.imaginary
    new Complex(real, imaginary)

  modulus: -> Math.sqrt((@real*@real)+(@imaginary*@imaginary))

  toString: ->
    sign = if @imaginary >= 0 then '+' else '-'
    @real+sign+'i'+@imaginary