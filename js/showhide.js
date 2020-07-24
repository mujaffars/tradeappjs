var tokenPresent = false;

$(window).on('load', function () {

	$('#header #icon_menu, #sidebar-left #icon_menu_close').click(function(){
		showHideSidebar();
	})
})

function hideScreen(){
    
}

function showLogin(){
	
}

function showHideSidebar(){
	if($('#sidebar-left').css('display') !== 'block'){
		$('#sidebar-left').show("slide", { direction: "left" }, 100);
	}else{
		$('#sidebar-left').hide("slide", { direction: "left" }, 100);
	}
}

function showCreateDealPage(){
	
	var pageHtml = $('.pagesHtml .divCreateDeal').html();
	$('#main').html(pageHtml);
	
	$.ajax({
			url: 'file:///H:/mujaffar/tjs/pages/createdeal.html',
			type: 'GET',
			dataType: 'html',
			async: true,
			error: function () {
			},
			success: function (resp) {
				$("#main").html(resp);				
			}
	});
}