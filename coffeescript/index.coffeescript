block = $('.blocks__block')
bname = $('.blocks__name')
content = $('.blocks-content__content')
closeBtn = $('.blocks__content-close')
wHeight = $(window).outerHeight()
wWidth = $(window).outerWidth()
bHeight = block.outerHeight()
bWidth = block.outerWidth()
xVal = Math.round(wWidth / bWidth) + 0.03
yVal = wHeight / bHeight + 0.03

expand = ->
  num = $(this).index()
  aBlock = block.eq(num)
  if !aBlock.hasClass('active')
    bname.css 'opacity', '0'
    aBlock.css
      'transform': 'scale(' + xVal + ',' + yVal + ')'
      '-webkit-transform': 'scale(' + xVal + ',' + yVal + ')'
    aBlock.addClass 'active'
    openContent num
  return

openContent = (num) ->
  content.css
    'transition': 'all 0.3s 0.4s ease-out'
    '-webkit-transition': 'all 0.3s 0.4s ease-out'
  aContent = content.eq(num)
  aContent.addClass 'active'
  return

closeContent = ->
  bname.css 'opacity', '1'
  content.css
    'transition': 'all 0.1s 0 ease-out'
    '-webkit-transition': 'all 0.1s 0 ease-out'
  block.css
    'transform': 'scale(1)'
    '-webkit-transform': 'scale(1)'
  block.removeClass 'active'
  content.removeClass 'active'
  return

updateValues = ->
  `var yVal`
  `var xVal`
  `var bWidth`
  `var bHeight`
  `var wWidth`
  `var wHeight`
  if block.hasClass('active')
    aBlock = $('.blocks__block.active')
    wHeight = $(window).height()
    wWidth = $(window).width()
    bHeight = block.height()
    bWidth = block.width()
    xVal = Math.round(wWidth / bWidth) + 0.03
    yVal = wHeight / bHeight + 0.03
    aBlock.css
      'transform': 'scale(' + xVal + ',' + yVal + ')'
      '-webkit-transform': 'scale(' + xVal + ',' + yVal + ')'
  return

$(window).on 'resize', updateValues
bname.on 'click', expand
closeBtn.on 'click', closeContent