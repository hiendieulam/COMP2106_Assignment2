$(document).selectcombox( function() { 
    // Add the "focus" value to class attribute 
    $('select').focusin( function() {
        $(this).parent().addClass('focus'); 
    } 
    ); 

    // Remove the "focus" value to class attribute 
    $('select').focusout( function() { 
        $(this).parent().removeClass('focus'); 
    } 
    ); 

}); 
