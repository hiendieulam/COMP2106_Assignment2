$(function(){
	
	/*************** Control to slideshow ***************/
	
		/** Number of images want to display**/
		var display_image_number = 2;
		
		/** When slide clicked, slide will be rotate through each images **/
		var circle_method = 2;
		
		/** Image shift speed (unit: milisecond) **/
		var anispeed = 200;
		
		/** Selection is using slide scroll auto mode **/
		/** 1 = Activations, 0 = Not activated **/
		var auto_scroll = 1;
		
		/** If auto_scroll value = 1, can be adjust the following values to change the time of time **/
		var timeinterval = 1200;

		
	/*************** Specify the slideshow basic information ***************/

	/** Specify a number of the slide, width of each images to find stage  **/
	var image_count = $('.slide-image').length;
	var image_width = $('.slide-image').width();

	/** Width of the image can edit with css **/
	var stage_width = image_width * image_count;

	/** Specify the slide display of width **/
	var display_width = display_image_number * image_width;
	
	/** Adjust the slide stage length with the number of images to display through display_width **/
	$('.slide-holder').css("width", display_width + "px");

	/** Edit the length of the volume cover the slide-image (slide-stage) for medium with the total blocks **/
	$('.slide-stage').css("width", stage_width + "px");
	

	/*************** Access next and prev button ***************/
	function left_slide_circle(){
		$('.slide-image:last-child').addClass('swapthis'); // Specify the position at the last position
		$('.swapthis').insertBefore('.slide-image:first'); // Move up end before first
		$('.slide-stage').css("left",-image_width + "px"); // Moving the position of stage is 1 slide-image
		$('.slide-stage').stop().animate({left:0},anispeed); // Execute animation
		$('.swapthis').removeClass('swapthis'); // Reset class for slide-image moved
	}
	function right_slide_circle(){
		$('.slide-image:first').addClass('swapthis'); // Images specify the position at the last position
		$('.swapthis').insertAfter('.slide-image:last-child'); // Move up end before first
		$('.slide-stage').css("left",-(stage_width - image_width - display_width) + "px"); // Moving the position of stage is 1 slide-image
		$('.slide-stage').stop().animate({left:display_width - stage_width},anispeed); // Execute animation
		$('.swapthis').removeClass('swapthis'); // Reset class for slide-image moved
	}
	function left_slide_scroll(){

		var stage_left = $('.slide-stage').position().left;

		if(stage_left < 0 && !$('.slide-stage').is(':animated')){ // Activations when stage is not moved
			$('.slide-stage').stop().animate({left:"+=" + image_width},anispeed);
		}
		else 
		{	
			switch(circle_method){ 
				case 1:
					$('.slide-stage').stop().animate({left:display_width - stage_width},anispeed);
					break;
				case 2:
					left_slide_circle();
					break;
			}
			
		}
	}
	function right_slide_scroll(){
		var stage_left = Math.abs($('.slide-stage').position().left);
		var right_remain = stage_width - (display_width + stage_left);
		if(right_remain > 0 && !$('.slide-stage').is(':animated')){ //Activations when stage is not moved
			$('.slide-stage').stop().animate({left:"-=" + image_width},anispeed);
		}
		else 
		{
			switch(circle_method){ 
				case 1:
					$('.slide-stage').stop().animate({left:0},anispeed);
					break;
				case 2:
					right_slide_circle();
					break;
			}
		}
	}
	
	$('.slide-control-prev').click(function(){left_slide_scroll();});
	$('.slide-control-next').click(function(){right_slide_scroll();});
	
	/*************** Access auto scroll ***************/
	
	function start_slide_auto_scroll(){
		play = setInterval(right_slide_scroll,timeinterval);
	}
	/**  If auto scroll mode is selected, it will activate  **/
	if(auto_scroll == 1){
		start_slide_auto_scroll(); 
	}
	/** Put the mouse on the slide and the buttons will pause auto scroll **/
	$(".slide-container,.slide-control-prev,.slide-control-next").hover(function() {
		clearInterval(play);
	}, function(){
		start_slide_auto_scroll();
	});
})