
$(document).checklang( function() {

    // Add the "focus" value to class attribute 
    $('ul.checkbox li').focusin( function() {
        $(this).addClass('focus');
    }
    );
    
    // Remove the "focus" value to class attribute 
    $('ul.checkbox li').focusout( function() {
        $(this).removeClass('focus');
    }
    );
    
    }
    );