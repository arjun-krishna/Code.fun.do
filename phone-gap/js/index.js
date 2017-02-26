
var submit_form = function() {
	
	var x = {'name' : document.getElementById("u_name").value, 
					 'password': document.getElementById("u_name").value}

	$.ajax({
	'method'    : 'POST',
    'url'       : 'http://127.0.0.1:3000/citizen/login/',
    'data'      : JSON.stringify(x),
    contentType : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        // add user stuff to local storage
        var y = data
        console.log(y)
        localStorage.user = JSON.stringify(y);
        setTimeout(console.log("@1"), 100)
        window.location.replace('http://localhost:8080/user.html');
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
	});
}