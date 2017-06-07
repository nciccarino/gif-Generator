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
			$(".sports").append("<div>Rated: " + response.data[i].rating + "</div>").attr("id", "newDiv" + i); 
			$("#newDiv" + i).append("<img src=\'" + response.data[i].images.fixed_height_still.url + "\' data-still=\'" + response.data[i].images.fixed_height_still.url + "\' data-animate=\'" + response.data[i].images.fixed_height.url + "\' data-state=\'still\' class=\'gif\'>");

			console.log(response.data[i].rating); //works
			console.log(response.data[i].images.original_still.url); //works
			console.log("-------------------------");
		}
	}); //needs work

		$(document).on("click", ".gif", function(){
			 var state = $(this).attr("data-state");
			 if (state === "still") {
			    $(this).attr("src", $(this).attr("data-animate"));
			    $(this).attr("data-state", "animate");
			  }
			  else {
			    $(this).attr("src", $(this).attr("data-still"));
			    $(this).attr("data-state", "still");
			  }
			});

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