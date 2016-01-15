(function() {
  var bHeight, bWidth, block, bname, closeBtn, closeContent, content, expand, openContent, updateValues, wHeight, wWidth, xVal, yVal, num, aContent, slideTime, autoPick;

  block = $('.blocks__block');
  bname = $('.blocks__name');
  content = $('.blocks-content__content');
  closeBtn = $('.blocks__content-close');
  wHeight = $(window).outerHeight();
  wWidth = $(window).outerWidth();
  bHeight = block.outerHeight();
  bWidth = block.outerWidth();
  xVal = Math.round(wWidth / bWidth) + 0.03;
  yVal = wHeight / bHeight + 0.03;

  var autoRun = 0;
  var autoNum = 0;


  expand = function()
  {
	var aBlock;

	if(autoRun ==0){num = $(this).index();}
	else if (autoRun ==1){num = autoNum;}

	aBlock = block.eq(num);

	if (!aBlock.hasClass('active'))
	{
	  bname.css('opacity', '0');
	  aBlock.css({
		'transform': 'scale(' + xVal + ',' + yVal + ')',
		'-webkit-transform': 'scale(' + xVal + ',' + yVal + ')'
	  });
	  aBlock.addClass('active');
	  openContent();
	}
	console.log(num);
  };

  openContent = function()
  {
	content.css({
	  'transition': 'all 0.3s 0.4s ease-out',
	  '-webkit-transition': 'all 0.3s 0.4s ease-out'
	});
	aContent = content.eq(num);
	aContent.addClass('active');
	aContent.children(0).addClass('active');

	$(".slideshow.active > div:gt(0)").hide();
	slideTime = setInterval(function() {
	$('.slideshow.active > div:first')
		.fadeOut(1000)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('.slideshow.active');
	},  3000);
  };

  closeContent = function()
  {
	bname.css('opacity', '1');
	content.css({
	  'transition': 'all 0.1s 0 ease-out',
	  '-webkit-transition': 'all 0.1s 0 ease-out'
	});
	block.css({
	  'transform': 'scale(1)',
	  '-webkit-transform': 'scale(1)'
	});
	block.removeClass('active');
	content.removeClass('active');

	if (aContent !=null){
		aContent.children(0).removeClass('active');
	}

	clearInterval(slideTime);
  };

  updateValues = function()
  {
	var yVal;
	var xVal;
	var bWidth;
	var bHeight;
	var wWidth;
	var wHeight;
	var aBlock;
	if (block.hasClass('active')) {
	  aBlock = $('.blocks__block.active');
	  wHeight = $(window).height();
	  wWidth = $(window).width();
	  bHeight = block.height();
	  bWidth = block.width();
	  xVal = Math.round(wWidth / bWidth) + 0.03;
	  yVal = wHeight / bHeight + 0.03;
	  aBlock.css({
		'transform': 'scale(' + xVal + ',' + yVal + ')',
		'-webkit-transform': 'scale(' + xVal + ',' + yVal + ')'
	  });
	}
  };

if(autoRun == 0)
{
  $(window).on('resize', updateValues);
  bname.on('click', expand);
  closeBtn.on('click', closeContent);
}
else if (autoRun ==1)
{

	autoPick = setInterval(function(){
		autoRotate();
	},10000);

	autoRotate = function()
	{
		console.log('AutoPick');
		closeContent();
		setTimeout(function(){expand()}, 2000);
		if (autoNum < 6){
			autoNum++;
		}else{
			closeContent();
			autoNum=0;
		}
	}
}

}).call(this);
