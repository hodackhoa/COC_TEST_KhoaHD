function createTabble(data){
	//create table head
	var thead = data.arrHead.map((item)=>{
		return(`<th>${item}</th>`);
	})
	$("table > thead").html(`<tr>${thead}</tr>`);
	// create table body
	var tbody = data.arrData.map((item)=>{
		return(`<tr>
					${(item.key!=undefined)? `<td>${item.key}</td>` : null}
					${`<td>${item.name}</td>`}
					${(item.value!=undefined)? `<td>${item.value}</td>` : null}					
					${(item.status!=undefined)? ((item.status)?`<td><img src="images/check@1X.png"></td>` : `<td><img src="images/close@1X.png"></td>`) : null}
					${(item.order!=undefined)? `<td>${item.order}</td>` : null}
					${`<td><img src="images/edit@1X.png" alt="edit"></td>`}
					${($("#title").text()=="Categories")? `<td><img src="images/delete@1X.png" alt="delIco"></td>` : null}
					${($("#title").text()=="Categories")? `<td><input type="checkbox"></td>` : null}
				</tr>`)
	})
	$("table > tbody").html(tbody);
}
$(document).ready(function(){
	// handle nav menu
	$("#navMenu > li").on("click", function(){
		$("#navMenu > li").removeClass("active-btn");
		$(this).addClass("active-btn");
		$("#title").text($(this).text());
		switch($(this).text()){
			case "Users":
				break;
			case "Collectibles":
				break;
			case "Categories":
				$.ajax({url:"https://5f34126b9124200016e18691.mockapi.io/"+ $(this).text() , success:function(result){
					let data={
						arrHead:["Key", "Display name", "Show/Hide","Order","Edit","Delete", "Bulk Delete"],
						arrData: result
					}
					createTabble(data)
				}})
				break;
			case "Configurations":
				$.ajax({url:"https://5f34126b9124200016e18691.mockapi.io/"+ $(this).text() , success:function(result){
					let data={
						arrHead:["Constant name", "Value", "Edit"],
						arrData: result
					}
					createTabble(data)
				}})
				break;
		}
	})
	$($("#navMenu > li")[3]).trigger("click");
	//handle add Button
	$("#titleGr > button").click(function(){
		$("#popup").show();
	});
	//handle close popup
	$("#closePopup").on("click", function(){
		$("#popup").hide();
	});
	$("#popup").click(function(e){
		$("#closePopup").triggerHandler("click");
	})
	$("#contentPopup").click(function(e){
		e.stopPropagation();
	})
	//handle onchange
	$(".grInp > input").change(function(){
		console.log($(this).val())
	})
})