//This creates the function "addColumns" and passes the cityPop array as an argument 
function addColumns(cityPop){
    //This uses the .each function to create a city size column and then go through each item in the cityPop array and classify it as being either small, medium or large (and adds that value to the new column)  
    $('tr').each(function(i){

    	if (i == 0){

    		$(this).append('<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			console.log(citySize)
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
//This creates the addEvents function that contains other sub-functions to add effects to the created table 
function addEvents(){
	//This uses the .mouseover function to add an effect to the table that changes the text to a random color when the user hovers the cursor over any text of the table 
	$('table').mouseover(function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
			}
		};

		$(this).css('color', color);
	});
	//This creates the clickme function that produces an alert saying "Hey, you clicked me!" when the user clicks on any of the text in the table 
	function clickme(){

		alert('Hey, you clicked me!');
	};
	//This uses the jQuery function .on to call the function clickme whenever the user clicks on the table text 
	$('table').on('click', clickme);
};
//This creates the initialize funtion that creates an array of city values for the table, 
//then calls the cities, addColumns and addEvents functions that creates the table structure, adds the city size column and creates the effects attached to the table
function initialize(){
    var cityPop = [
		{ 
            city: 'Seattle',
            population: 724745
        },
        {
            city: 'San Francisco',
            population: 884363
        },
        {
            city: 'Boston',
            population: 685094
        },
        {
            city: 'Atlanta',
            population: 486290
        },
		{
			city: 'Madison',
			population: 255214
		}
	];
	cities(cityPop);
	addColumns(cityPop);
	addEvents();
};

//function to create a table with cities and their populations
function cities(cityPop){
    //define two arrays for cities and population
    

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
	$("#mydiv").append("</table>");
};

function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax to access the data
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;
			
			//data can be accessed here
			console.log(mydata)
        }
    });

    //data cannot be accessed here 
    console.log(mydata);
};

//created a callback function to display the data once it is retrieved
function debugCallback(response){
	
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};

//create the mydata variable to hold the data
var mydata;

//create function to retrieve the geojson data 
function debugAjax(){
	
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			mydata = response
			debugCallback(mydata);			
		}
	});
};

//call the initialize function when the document has loaded
$(document).ready(initialize);


//call the jQueryAjax function when the document has loaded
$(document).ready(jQueryAjax);


//call the debugAjax function when the document has loaded
$(document).ready(debugAjax);