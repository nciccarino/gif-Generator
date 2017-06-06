var sports = ["NFL", "NBA", "MLB", "NHL", "NCAA"];

function displaySport() {
	var sport = $(this).attr("data-name"); 
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&limit=10&api_key=dc6zaTOxFJmzC"; 
	//console.log(queryURL); //working

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		$(".sports").empty();

		for (var i = 0; i < 10; i++) {
			$(".sports").html("<div>" + response.data[i].rating + "</div>").attr("id", "newDiv" + i); //fix
			//$(".sports").append("newDiv" + i); 
			$("#newDiv" + i).append("<img src=" + response.data[i].images.original_still.url + ">" + "</img>"); //fix
			console.log(response.data[i].rating); //works
			console.log(response.data[i].images.original_still.url); //works
			console.log("-------------------------");
		}
	}); //needs work-- why doesnt more then one picture appear? 
}

function renderButtons() {

	$("#sportsButtons").empty();
	for (var i = 0; i < sports.length; i++) {
		var a = $("<button>");
		a.addClass("sport");
		a.attr("data-name", sports[i]); 
		a.text(sports[i]);
		$("#sportsButtons").append(a); 
	}

} //working 

$("#addSport").on("click", function(){
	event.preventDefault();
	var sport = $("#sportsInput").val().trim(); 
	sports.push(sport);
	renderButtons();
	$("#sportsInput").val(""); 

}) //working

$(document).on("click", ".sport", displaySport);

renderButtons(); 