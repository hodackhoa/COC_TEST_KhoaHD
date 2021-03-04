$(document).ready(function(){
	$("#navMenu > li").click(function(){
		$("#navMenu > li").removeClass("active-btn");
		$(this).addClass("active-btn");
		$("#title").text($(this).text());
		switch($(this).text()){
			case "Users":
				break;
			case "Collectibles":
				break;
			case "Categories":
				break;
			case "Configurations":
				$.ajax({url:"https://5f34126b9124200016e18691.mockapi.io/"+ $(this).text() , success:function(result){
					console.log(result)
				}})
				break;
		}
	})
})