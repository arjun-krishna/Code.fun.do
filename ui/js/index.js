
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
        x = data
        localStorage.user = x['name'];
        localStorage.ward = x['ward'];
        localStorage.area = x['area'];
        localStorage.city = x['city'];
        localStorage.state = x['state'];
        window.location.replace('http://localhost:8080/user.html');
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
	});
}