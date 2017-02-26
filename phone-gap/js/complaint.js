

var commententry = function(name, comment, date, first){
    var string = "<a href=\"javascript:void(0)\" class=\"w3-border-bottom test w3-hover-light-grey\" onclick=\"w3_close();\"" + first + "> \
    <div class=\"w3-container\"> \
      <img class=\"w3-round w3-margin-right\" src=\"/w3images/avatar3.png\" style=\"width:15%;\"><span class=\"w3-opacity w3-large\">"+name+"</span> \
      <h6>Time: "+date+"</h6> \
      <p>"+comment+"</p> \
    </div> \
  </a>";
  return string;
}

var complaintentry = function(title, name, time, description, id, status) {

var string = "<div class=\"w3-container person\"> \
  <br> \
  <img class=\"w3-round  w3-animate-top\" src=\"/w3images/avatar3.png\" style=\"width:20%;\"> \
  <h5 class=\"w3-opacity\">Title:" + title + "</h5> \
  <h4><i class=\"fa fa-clock-o\"></i> From "+name+", "+time + ".</h4> \
  <hr> \
  <p>" + description + "</p>";
    if(status == 'Open'){
        string += "<a class=\"w3-button w3-right\" onclick=\"closecomplaint('"+id+"');\">Close<i class=\"fa fa-paper-plane\"></i></a>"
    }
    else {
        string += "<a class=\"w3-button w3-right\" onclick=\"opencomplaint('"+id+"');\">Open<i class=\"fa fa-paper-plane\"></i></a>"
    }
    string+="</div>"
  return string;
}

var opencomplaint = function(id){
  $.ajax({
    'method'    : 'POST',
    'url'       : 'http://127.0.0.1:3000/complaint/'+id+'/open/',
    'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        console.log("data")
        console.log(data)
        // store stuff
        init(id)
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
  });
}

var closecomplaint = function(id){
  $.ajax({
    'method'    : 'POST',
    'url'       : 'http://127.0.0.1:3000/complaint/'+id+'/close/',
    'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        console.log("data")
        console.log(data)
        // store stuff
        init(id)
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    } 
  });
}

var sendcomment = function(){
    var id = localStorage.id
    setTimeout(console.log("1ii"), 50)
    var z = JSON.parse(localStorage.user)

    setTimeout(console.log("1ii"), 50)
    var y = {
        'comment' : document.getElementById('newcomment').value,
        'name'    : z.name
    }
    $.ajax({
    'method'    : 'POST',
    'url'       : 'http://127.0.0.1:3000/complaint/'+id +'/newcomment/',
    'contentType' : 'application/json',
    'data'  : JSON.stringify(y),
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        console.log("data")
        console.log(data)
        document.getElementById('newcomment').value = ""
        init(id)
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    }
    });
}

function init(id){
    var innerHTML = "";

    $.ajax({
    'method'    : 'GET',
    'url'       : 'http://127.0.0.1:3000/complaint/'+id,
    'contentType' : 'application/json',
    'success'   : function(data, textStatus, xhr) {
        console.log(xhr.status);
        console.log("data")
        console.log(data)
        var complaintentrydata = complaintentry(data.title, data.filled_by, new Date(data.timestamp).toDateString(), data.description, data._id, data.status);
        console.log(complaintentrydata)
        $('#complaintdata').html(complaintentrydata)
        // store stuff
        $.each(data.comments, function(index,value) {
            var string = ""
            if(index == 0)  string = " id=\"firstTab\""
            innerHTML += commententry(value.name,value.comment,new Date(value.timestamp).toDateString(), string);
        });
        console.log(innerHTML)

        $('#Demo1').html(innerHTML);
    },
    error: function(xhr, textStatus) {
        console.log(xhr.status);
    }
    });
}



$(document).ready( function() {
    var z = JSON.parse(localStorage.user);
    setTimeout(console.log("$!"), 100)
    var user_name = z.name;
    var url = new String(window.location.href)
    var id = url.split('=')[1]
    localStorage.id = id
    init(id);
    
});

