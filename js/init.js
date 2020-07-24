var tokenPresent = false;

$(window).on('load', function () {
	
	showModal('login');
	handleLeftMenuClicks();
})

function hideScreen(){
    
}

function handleLeftMenuClicks(){
	
	$('#sidebar-left .liBuy').click(function(){		
		showHideSidebar();
		
		showCreateDealPage();
	})
	
}