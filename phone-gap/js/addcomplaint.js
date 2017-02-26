$(document).ready( function() {
    var z = JSON.parse(localStorage.user)
    setTimeout(console.log("%1"), 100)
	var user_name = z.name;

	$("#u_name")[0].value = user_name;

	$("#submit_button").click(function() {
		submit_form();
	})
})



var submit_form = function() {
    var z = JSON.parse(localStorage.user)
    setTimeout(console.log("%1"), 100)
	var x = {
    'title'     : document.getElementById('u_title').value,
	'filled_by' : document.getElementById("u_name").value, 
    'description': document.getElementById("u_description").value,
    'department' : document.getElementById("u_dept").value,
    'ward' : z.ward,
    'area' : z.area,
    'city' : z.city,
    'state' : z.state
 	}
    console.log(x)

	$.ajax({
		'method'    : 'POST',
    'url'       : 'http://127.0.0.1:3000/complaint/new/',
    'data'      : 
    JSON.stringify(x),
   	'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(data);
        console.log(xhr.status);
        console.log(textStatus);
        // store stuff
        alert('Successfully submitted!');
        window.location.replace('http://localhost:8080/user.html');
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
	});
}