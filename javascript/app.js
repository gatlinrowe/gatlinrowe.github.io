 
$(document).ready(function() {
  var email;
  var pass;
  var loggedin = false;
  // what is currently being searched for in the API
	var search;

	//the search button
	$('#addSearch').on('click', function(){
    //will make sure to not make an api call if there is nothing in search box
		if ($("#search").val().trim() === "") {
      console.log("fail");
			return false;
		}
    //makes sure you are logged in before searching
    if (loggedin === false){
      alert("please log in first");
    }
    // will send api call for videos
    else {
      console.log("worked "+ loggedin);
      // sets search variable to whats in search box
			search = ($('#search').val().trim());
      //makes the api call using the search info
			runapi();
      //resets search bar to blank
			$("#search").val("");
			return false;
		}
	});	

  //the login button
  $('#loginbtn').on('click', function(){
    console.log("clicked");
    //will make sure to not make an api call if there is nothing in form box
    if ($("#emailform").val().trim() !== "" && $("#passform").val().trim() !== "") {
      console.log("sent");
      email = ($('#emailform').val().trim());
      pass = ($('#passform').val().trim());
      login(email, pass);
      return false;
    }else {
      console.log("failed")
      return false;
    }
  }); 

  // the api call function
	var runapi = function(){
    //sets up ajax call data into easy to use variable
		var response = $.ajax({
		  url: "https://www.videezy.com/api/v2/resources",
 	    method: "GET",
 	    data: { token : tokenID, search_term : search},
		  dataType: "json"
		});

    //makes call and waits for callback data
  	response.done(function( data ) {
  		console.log(data)
      //sets token
    	tokenID = data.auth.token;
   		console.log(tokenID);
      //clears current vidoes to get ready for new info
   		$('#videos').empty();
      //created video previews and buttons
  		for (var i = 0; i < data.data.length; i++) {
        //links video to player
    		var vidDiv = $('<div>');
        vidDiv.attr('class', "col-xs-4 col-s-3 col-md-3");
        var vidA = $('<a>')
            vidA.attr('class', 'video');
    		var image = $('<video>');
            image.attr('poster', data.data[i].thumbnail);
       	    image.attr('src', data.data[i].mp4);
            image.attr('data-mp4', data.data[i].mp4);
            image.attr('data-name', $.trim(data.data[i].name));
            image.attr('preload', 'none');
            image.attr('onmouseover', "$(this).get(0).play()");
            image.attr('onmouseout', "$(this).get(0).pause()");
        vidA.append(image);
        vidDiv.append(vidA);	        
        // builds SD download button
       	var sdbtn = $('<button>')
       	    .attr('class', 'btn-link glyphicon glyphicon-sd-video')
        		.attr('id', 'sdbtn')
        		.attr('data-mp4', data.data[i].mp4)
        		.attr('onclick', "sddl('"+data.data[i].mp4+"', '"+data.data[i].name+"')");  
        // builds HD download button
        var hdbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-hd-video')
            .attr('id', 'hdbtn')
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "hddl('"+data.data[i].id+"','"+data.data[i].name+"')");  
        // builds Favorite button 
        // builds Favorite button 
        var favbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-heart')
            .attr('id', 'favbtn')
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "addfav('"+data.data[i].id+"')");    
        vidA.append(sdbtn);  
        vidA.append(hdbtn);   
       	vidA.append(favbtn);	
       	$('#videos').append(vidDiv);
    	};
  	});
    //downloadAndImport(data.data[i].mp4, data.data[i].name)
    response.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    });
  };

  var login = function(email, pass){
  	console.log("submit event"); 
    var requesttokenID = $.ajax({
      url: "https://www.videezy.com/api/v2/sessions",
      method: "POST",
      data: { login : email, password : pass },
      dataType: "json"
    });
   
    requesttokenID.done(function(data) {
      console.log(data);
    	tokenID = data.auth.token;
    	tokenIDExpire = data.auth.exipires_at;
      loggedin = true;
      $('#loginmodal').html(email);

    	console.log(tokenID);
    });
   
    requesttokenID.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    });
  };	
    //auto login for dev purposes
   //login(email, pass);
}); //end of doc ready

 // Global functions - able to be calld in onclick functions
  //current auth token
  var tokenID;
  // when Token will expire
  var tokenIDExpire;
  function sddl(id, name){


      window.open(id)
    
}
function hddl(id, name){
   var response = $.ajax({
      url: "https://www.videezy.com/api/v2/resources/"+id+"/generate_download_url",
      method: "GET",
      data: { token : tokenID},
    });
    //makes call and waits for callback data
    response.done(function( data ) {
      console.log(data)
      console.log(data.url);
      console.log(name);
      //sets token

      tokenID = data.auth.token;
      console.log(tokenID);
      window.open(data.url)
    });
}
function loadfav(){
    //sets up ajax call data into easy to use variable
    var response = $.ajax({
      url: "https://www.videezy.com/api/v2/resources/favorites",
      method: "GET",
      data: { token : tokenID},
      dataType: "json"
    });

    //makes call and waits for callback data
    response.done(function( data ) {
      console.log(data)
      console.log(tokenID);
      //sets token
      tokenID = data.auth.token;
      console.log(tokenID);
      //clears currently vidoes to get ready for new info
      $('#favorites').empty();
      //loops once per video recieved
      for (var i = 0; i < data.data.length; i++) {
        //links video to player
        var vidDiv = $('<div>');
        vidDiv.attr('class', "col-xs-4 col-s-3 col-md-3");
        var vidA = $('<a>')
            vidA.attr('class', 'video');
        var image = $('<video>');
            image.attr('poster', data.data[i].thumbnail);
            image.attr('src', data.data[i].mp4);
            image.attr('data-mp4', data.data[i].mp4);
            image.attr('data-name', $.trim(data.data[i].name));
            image.attr('preload', 'none');
            image.attr('onmouseover', "$(this).get(0).play()");
            image.attr('onmouseout', "$(this).get(0).pause()");
        vidA.append(image);
        vidDiv.append(vidA);          
        var dlbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-download')
            .attr('id', 'dlbtn')
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "downloadAndImport('"+data.data[i].mp4+"', '"+data.data[i].name+"')");   
        var favbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-heart')
            .attr('id', 'favbtn')
            .attr('onclick', "unfav('"+data.data[i].id+"')");    
        vidA.append(dlbtn);    
        vidA.append(favbtn);  
        $('#favorites').append(vidDiv);
      };
    });
    //downloadAndImport(data.data[i].mp4, data.data[i].name)
    response.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    });
};
function addfav(fav){
    var response = $.ajax({
      url: "https://www.videezy.com/api/v2/resources/"+fav+"/favorite",
      method: "POST",
      data: { token : tokenID},
    });

    //makes call and waits for callback data
    response.done(function( data ) {
      console.log(data)
      console.log(tokenID);
      //sets token
      tokenID = data.auth.token;
      console.log(tokenID);

    });
};

function unfav(fav){
    var response = $.ajax({
      url: "https://www.videezy.com/api/v2/resources/"+fav+"/unfavorite",
      method: "POST",
      data: { token : tokenID},
    });

    //makes call and waits for callback data
    response.done(function( data ) {
      console.log(data)
      console.log(tokenID);
      //sets token
      tokenID = data.auth.token;
      console.log(tokenID);
    });
};

window.onerror = function (errorMsg, url, lineNumber) {
               alert(errorMsg + lineNumber);
            };    

function isNodeJSEnabled() {        
  if (typeof(require) !== 'undefined') {
    alert("Node.js is enabled");
  } else {
    alert("Node.js is disabled");
  }
}
    
var csInterface = new CSInterface();
function downloadAndImport(url, fileName) {  
       // call the evalScript we made in the jsx file  
       csInterface.evalScript('returnPath()', function(result) {  
            var https = require('https');  
            var fs = require('fs');  
            var mkdirp = require('mkdirp');  
            // create a Downloads directory in the project path if it doesn't exist already  
            var downloadDirectory = result + '/Downloads';  
            mkdirp(downloadDirectory, function(err){  
                 if (err) { alert(err)}  
            });  
            var fullPath = downloadDirectory + "/" + fileName + ".mp4";  
            var file = fs.createWriteStream(fullPath);  
            var request = https.get(url, function(response) {  
                 response.pipe(file);  
                 // ensure file is complete before importing  
                 response.on('end', function() {  
                      csInterface.evalScript("app.project.importFiles(['" + fullPath + "'])");  
                 });  
           });  
       });  
};

