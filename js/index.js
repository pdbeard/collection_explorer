(function() {
  var bHeight, bWidth, block, bname, closeBtn, closeContent, content, expand, openContent, updateValues, wHeight, wWidth, xVal, yVal, num, aContent, slideTime, autoPick,autoNum, totalNum,autoRun, whichSlide;

  autoNum = 0;
  whichSlide = 0;
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
		console.log('----------');
		console.log('You picked category '+num);
	}
	else if (autoRun ==1){
		num = autoNum;
		console.log('----------');
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
	whichSlide =0;

	aContent.addClass('active');


	console.log('Playing: '+aContent.children(0).prop('id'));
	console.log('Which includes '+slides.length+' images');
	console.log('----------');



	slideTime = setInterval(function()
	{
		$("#"+slideShow).attr("src",slides[whichSlide].address);
		console.log(slides[whichSlide].address);

		if(whichSlide < slides.length - 1){
			whichSlide++;
		}
		else{
			whichSlide=0;
			console.log('Restart Loop');
		}
	},  5000);


  };

  nextSlide = function()
  {
	var slideShow = aContent.children(0).prop('id');
	var slides = slideList[0]["slideshows"][slideShow];



	if(whichSlide < slides.length - 1){

		$("#"+slideShow).attr("src",slides[whichSlide].address);
		console.log(slides[whichSlide].address);
		whichSlide++;
	}
	else{

		whichSlide=0;
		$("#"+slideShow).attr("src",slides[whichSlide].address);
		console.log(slides[whichSlide].address);
		console.log('Restart Loop');
	}

	if (slideTime != null){
		clearInterval(slideTime);
	}
  }

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
	  //content.on('click', nextSlide);
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
