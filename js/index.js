(function() {
  var bHeight, bWidth, block, bname, closeBtn, closeContent, content, expand, openContent, updateValues, wHeight, wWidth, xVal, yVal, num, aContent, slideTime, autoPick,autoNum, totalNum,autoRun;

  autoNum = 0;
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

  totalNum = 6; // Number of Categories

  autoRun = 0;  // 1 for autorun
				// 0 for interation


  expand = function()
  {
	var aBlock;

	if(autoRun ==0){
		num = $(this).index();
		console.log('You picked category '+num);
	}
	else if (autoRun ==1){
		num = autoNum;

		console.log('Auto picked category '+num);
	}

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
  };

  openContent = function()
  {
	content.css({
	  'transition': 'all 0.3s 0.4s ease-out',
	  '-webkit-transition': 'all 0.3s 0.4s ease-out'
	});

	aContent = content.eq(num);
	var slideShow = aContent.children(0).prop('id');
	var slides = slideList[0]["slideshows"][slideShow];
	var i =0;

	aContent.addClass('active');

	console.log('----------');
	console.log('Playing: '+aContent.children(0).prop('id'));
	console.log('Which includes '+slides.length+' images');
	console.log('----------');

	slideTime = setInterval(function()
	{
		$("#"+slideShow).attr("src",slides[i].address);
		console.log(slides[i].address);

		if(i < slides.length - 1){
			i++;
		}
		else{
			i=0;
			console.log('Restart Loop');
		}
	},  5000);
  };

  closeContent = function()
  {
	if (aContent !=null){
		$("#"+aContent.children(0).prop('id')).attr("src","");
	}

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
		},2000);

		autoRotate = function()
		{

			closeContent();
			//setTimeout(function(){expand()}, 2000);
			expand();
			if (autoNum < totalNum-1){
				autoNum++;
			}else{
				closeContent();
				autoNum=0;
			}
		}
	}

}).call(this);
