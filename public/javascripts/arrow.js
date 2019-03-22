
$(function() {
	/* Script to add class to nav when header is scrolled off screen */
	var navTop = $('#floatingbar').offset().top;
	$(window).scroll(function() { 
		console.log('Scrolling!');
		if ($(window).scrollTop() > navTop){ 
			//console.log('Turn on Persistent Nav');
			$('#floatingbar').addClass('floater');
			/* Sticky footer button appear */
			$('footer p a.top').fadeIn(200);
		} else { 
			/* Sticky footer button dissappear */
			$('footer p a.top').fadeOut(200);
			$('#floatingbar').removeClass('floater');
		}
	})
	/* Click handler to animate scroll to top */
	$('footer p a.top').click(function(event) { 
		/* Stop default anchor behavior */
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, 300);
	})
	
// end DOM ready
})