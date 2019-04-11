// Tab Panels
$(document).ready(function(){
	// grab all container panel DIVs
	var tabContainers = $('div.tabs > div');
	// hide them all, then show the first one
	tabContainers.hide().filter(':first').show();
	// set the first tab to class="selected"
	$('div.tabs ul.tabNavigation a:first').addClass('selected');
	// add onclick handlers to all tabs
	$('div.tabs ul.tabNavigation a').click(function(){
		// hide all tabContainers
		tabContainers.hide();
		// show only the tabContainer with the ID that matches the href for the A that was clicked
		//alert(this.hash);
		tabContainers.filter(this.hash).show();
		// remove class="selected" from all tabs
		$('div.tabs ul.tabNavigation a').removeClass('selected');
		// set class="selected" on the tab that was just clicked
		$(this).addClass('selected');
		// stop following links
		return false;
	});
});