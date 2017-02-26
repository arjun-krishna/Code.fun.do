
var addcomplaint = function() {
	window.location.replace('http://localhost:8080/addcomplaint.html');
}


var entry = function(id,imgsrc,time,posted_by,title, upvotes, status) {
  var statusstring = ""
	return '<div id = "'+id+'" class="w3-container w3-card-2 w3-white w3-round w3-margin"><br> \
  <div onclick="gotocomplaint(\'' + id +'\')"><span class="w3-right w3-opacity">'+time+'</span> \
  <h4>'+title+'</h4><br> \
  <hr class="w3-clear"> \
  <p> '+posted_by+'</p> </div> \
  <button id="but'+id+'" type="button" class="w3-button w3-theme-d1 w3-margin-bottom" onclick="upvotecomplaint(\'' + id +'\')"><i class="fa fa-thumbs-up"></i>  Upvote</button> \
  <p id="up'+id+'"> '+upvotes+' upvotes</p>  \
  <p> Status : '+status+'\
</div>';
}

var gotocomplaint = function(id){
  window.location.replace('http://localhost:8080/complaint.html?id='+id);
}

var upvotecomplaint = function(id){
  $.ajax({
    'method'    : 'GET',
    'url'       : 'http://127.0.0.1:3000/complaint/'+id+'/upvote/',
    'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        console.log("data")
        console.log(data)
        // store stuff
        var d = $('#up'+id).html()
        var num = d.split(' ')
        console.log('' + (parseInt(num[1])+1) + ' upvotes!!!')
        $('#but'+id).html('Upvoted!')
        $('#up'+id).html('' + (parseInt(num[1])+1) + ' upvotes!!!')
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
  });
}


var init = function(user_name) {

	var innerHTML = "";

	$.ajax({
		'method'    : 'GET',
    'url'       : 'http://127.0.0.1:3000/newsfeed/'+user_name,
   	'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        console.log("data")
        console.log(data)
        // store stuff
        $.each(data, function(index,value) {
        	innerHTML += entry(value._id,'/dummy.png',new Date(value.timestamp).toDateString(), value.filled_by, value.title, value.upvotes, value.status);

        });
        console.log(innerHTML)

        $('#feed').html(innerHTML);
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
	});


}


$(document).ready( function() {

	var user = JSON.parse(localStorage.user);
  setTimeout(console.log('lol'), 100)
	init(user.name);



	$("#addcomplaint_button").click(function() {
		addcomplaint();
	});



});