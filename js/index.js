
(function () {
  
  //Globals
  var bHeight, bWidth, block, bname, closeBtn, closeContent, content, expand, openContent, updateValues, wHeight, wWidth, xVal, yVal, num, aContent, slideTime, autoPick, autoNum, totalNum, autoRun, switchSlide, whichSlide, nextBtn, prevBtn, slides, slideShow, nextSlide, prevSlide, autoRotate, autoStart, buttonPress, hamOn, mc;

  block    = $('.blocks__block');
  bname    = $('.blocks__name');
  content  = $('.blocks-content__content');
  nextBtn  = $('.blocks__content-next');
  prevBtn  = $('.blocks__content-previous');
  closeBtn = $('.blocks__content-close');

  wHeight  = $(window).outerHeight();
  wWidth   = $(window).outerWidth();
  bHeight  = block.outerHeight();
  bWidth   = block.outerWidth();
  xVal = Math.round(wWidth / bWidth) + 0.03;
  yVal = wHeight / bHeight + 0.03;
  autoNum  = -1; 
    
  //Add Swipe gesture for touch    
  hamOn = document.getElementById('app');
  mc = new Hammer(hamOn);
  
  //Kinect Sensor
 var isSensorConnected = false;

    var configuration = {

        "interaction" : {
            "enabled": false,
        },
     
        "userviewer" : {
            "enabled": false,
            //"resolution": "640x480", //320x240, 160x120, 128x96, 80x60
            //"userColors": { "engaged": 0x7fffffff, "tracked": 0x7fffffff },
            //"defaultUserColor": 0x70000000, //RGBA 2147483647
        },
     
        "backgroundRemoval" : {
            "enabled": false,
            //"resolution": "640x480", //1280x960
        },
     
        "skeleton" : {
            "enabled": true,
        },
     
        "sensorStatus" : {
            "enabled": true,
        }
     
    };

    // Create sensor and UI adapter layers
    var sensor = Kinect.sensor(Kinect.DEFAULT_SENSOR_NAME, function (sensorToConfig, isConnected) {
        isSensorConnected = isConnected;
        sensorToConfig.postConfig(configuration);
        console.log('isSensorConnected',isSensorConnected);
    });

    sensor.addEventHandler(function (event) {
                
        switch (event.category) {
            case Kinect.SENSORSTATUS_EVENT_CATEGORY:
                switch (event.eventType) {
                    case Kinect.SENSORSTATUSCHANGED_EVENT_TYPE:
                    var connected = event.connected;
                    isSensorConnected = event.connected;
                    console.log('isSensorConnected',isSensorConnected);
                        break;
                }
                break;
        }
    });
    
    KinectGestures.init(sensor,{
        debug:true,
        registerPlayer:true,
        numPlayersToRegister:1,
        canvasElementID:'test',
        log:true,
        logElementID:'test',
    });
    
    KinectGestures.on(KinectGestures.GestureType.Swipe, function(event){
    console.log(event.data);
    // event.data.direction = KinectGestures.Direction.Left | KinectGestures.Direction.Right
});
    
  //Settings
  totalNum = 6;   // Number of Categories
  autoRun  = false; // Autorun toggle

  //Chooses and animates category expansion
  expand = function()
  {
	var aBlock;
	console.log('----------');

	if(!autoRun){
		num = $(this).index();
		console.log('You picked category '+num);
	}
	else if (autoRun){
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

  //Opens and finds content for expanded block
  openContent = function()
  {
	content.css({
	  'transition': 'all 0.3s 0.4s ease-out',
	  '-webkit-transition': 'all 0.3s 0.4s ease-out'
	});

	//Determines content, grabs images from JSON file.
	aContent = content.eq(num);
	slideShow = aContent.children(0).prop('id');
	slides = slideList[0]["slideshows"][slideShow];
	whichSlide =-1;

	aContent.addClass('active');
	console.log('Playing: '+aContent.children(0).prop('id'));
	console.log('Which includes '+slides.length+' images');
	console.log('----------');

	switchSlide();

	mc.on("swiperight",nextSlide);
	mc.on("swipeleft",prevSlide);
  };

  //Timer for Slideshow
  switchSlide = function(){
	slideTime = setInterval(function()
	{
		if(whichSlide < slides.length - 1){
			whichSlide++;
		}
		else{
			whichSlide=0;
			console.log('Restart Loop');
		}
		$("#"+slideShow).attr("src",slides[whichSlide].address);
		console.log(slides[whichSlide].address);
	},  10000);
  }

  nextSlide = function()
  {
	autoRun=false;
	if(whichSlide < slides.length-1)
	{
		whichSlide++;
	}
	else
	{
		whichSlide=0;
		console.log('Restart Loop');
	}
	$("#"+slideShow).attr("src",slides[whichSlide].address);
	console.log(slides[whichSlide].address);
	if (slideTime != null){
		clearInterval(slideTime);
	}
	if (autoPick != null){
		clearInterval(autoPick);
	}
  }

  prevSlide = function()
  {
	if(whichSlide > 0)
	{
		whichSlide--;
	}
	else
	{
		whichSlide=slides.length-1;
	}
	$("#"+slideShow).attr("src",slides[whichSlide].address);
	console.log(slides[whichSlide].address);
	if (slideTime != null){
		clearInterval(slideTime);
	}
	if (autoPick != null){
		clearInterval(autoPick);
	}
  }

  //Closes content blocks
  closeContent = function()
  {
	if (aContent !=null){  //Removes image instantly
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

  //Loops through category blocks
  autoRotate = function()
  {
	closeContent();
	if (autoNum < totalNum-1){
		autoNum++;
	}else{
		closeContent();
		autoNum=0;
	}
	expand();
  }

  //Starts Autorun Timer
  autoStart = function(){
	autoPick = setInterval(function(){
		autoRotate();
	},120000);
  }


  function buttonPress(pressed)
  {
	  console.log('yeha '+pressed);
	  pressed();
  }

  $(window).on('resize', updateValues);
  bname.on('click', expand);
  closeBtn.on('click', closeContent);
  nextBtn.on('click', nextSlide);
  prevBtn.on('click', prevSlide);

  if (autoRun){autoStart();}

}).call(this);
