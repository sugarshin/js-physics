(->
  elem = document.getElementById 'output'

  params =
    width: 960
    height: 640

  two = new Two(params).appendTo(elem)

  circle = two.makeCircle -70, 0, 50
  rect = two.makeRectangle 70, 0, 100, 100

  circle.fill = '#FF8000'
  circle.stroke = 'orangered' # Accepts all valid css color
  circle.linewidth = 5

  rect.fill = 'rgba(0, 200, 255, 0.75)'
  rect.stroke = 'orangered' # Accepts all valid css color
  rect.linewidth = 5

  group = two.makeGroup circle, rect
  group.translation.set two.width / 2, two.height / 2
  group.scale = 1

  group.stroke = '#d90'
  group.linewidth = 4
  group.miter = 3

  # group.rotation = 0.5

  two.update()

  # group.noStroke()

  # Bind a function to scale and rotate the group
  # to the animation loop.

  two.bind('update', (frameCount) ->
    # This code is called everytime two.update() is called.
    # Effectively 60 times per second.

    # console.log frameCount

    if group.scale > 0.9999
      group.scale = group.rotation = 0

    t = (1 - group.scale) * 0.125

    group.scale += t
    group.rotation += t * 4 * Math.PI

    return

  )# Finally, start the animation loop


  animeTggle = (->
    isAnime = false

    ->
      if isAnime is true
        isAnime = false
        two.pause()
      else if isAnime is false
        isAnime = true
        two.play()
      # return
  )()


  btn = document.getElementById 'btn'

  btn.addEventListener 'click', ->
    animeTggle()
    return

  # # Make an instance of two and place it on the page.
  # elem = document.getElementById('output')

  # params =
  #   # Two.Types.canvas
  #   # Two.Types.webgl
  #   # Default Two.Types.svg
  #   type: Two.Types.svg

  #   width: 285
  #   height: 200
  #   # autostart:
  #   # fullscreen:
  #   # ratio:

  # two = new Two(params).appendTo(elem)

  # # two has convenience methods to create shapes.
  # # circle = two.makeCircle(72, 100, 50)
  # # rect = two.makeRectangle(213, 100, 100, 100)

  # # line = two.makeLine(3, 40, 10, 60)



  # # The object returned has many stylable properties:
  # # circle.fill = '#FF8000'
  # # circle.stroke = 'orangered' # Accepts all valid css color
  # # circle.linewidth = 5

  # # rect.fill = 'rgb(0, 200, 255)'
  # # rect.opacity = 0.75
  # # rect.noStroke()

  # # line.fill = 'rgb(0, 200, 255)'

  # # Don't forget to tell two to render everything
  # # to the screen
  # two.update()

  # btn = document.getElementById 'btn'

  # btn.addEventListener 'click', ->
  #   circle = two.makeCircle(72, 100, 50)
  #   circle.fill = '#FF8000'
  #   circle.stroke = 'orangered' # Accepts all valid css color
  #   circle.linewidth = 5
  #   two.update()
  #   return

  return
)()
