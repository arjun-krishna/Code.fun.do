

var submit_form = function() {

	var x = {'name' : document.getElementById("u_name").value, 
     'password': document.getElementById("u_name").value,
      'ward' : document.getElementById("u_ward").value,
      'area' : document.getElementById("u_area").value,
      'city' : document.getElementById("u_city").value,
      'state' : document.getElementById("u_state").value
   	}

	$.ajax({
		'method'    : 'POST',
    'url'       : 'http://127.0.0.1:3000/citizen/signup/',
    'data'      : 
    JSON.stringify(x),
   	'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(data);
        console.log(xhr.status);
        console.log(textStatus);
        // store stuff
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