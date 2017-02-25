
var addcomplaint = function() {
	window.location.replace('http://localhost:8080/addcomplaint.html');
}


var entry = function(id,imgsrc,time,posted_by,title) {
	return '<div id = "'+id+'"class="w3-container w3-card-2 w3-white w3-round w3-margin"><br> \
  <img src="'+imgsrc+'" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px"> \
  <span class="w3-right w3-opacity">'+time+'</span> \
  <h4>'+posted_by+'</h4><br> \
  <hr class="w3-clear"> \
  <p> '+title+'</p> \
  </div> \
  <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button> \
  <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button> \
</div>';
}



var init = function(user_name) {

	var innerHTML = "";

	$.ajax({
		'method'    : 'GET',
    'url'       : 'http://127.0.0.1:3000/newsfeed/'+user_name,
   	'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);

        // store stuff
        $.each(data, function(index,value) {
        	innerHTML += entry(value._id,'/dummy.png',value.timestamp, value.filled_by, 'title');

        });

        $('feed').html(innerHTML);
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
	});


}


$(document).ready( function() {

	var user_name = localStorage.user;

	init(user_name);



	$("#addcomplaint_button").click(function() {
		addcomplaint();
	});



});