 
$(document).ready(function() {
  var email;
  var pass;
  var loggedin = false;
  // what is currently being searched for in the API
	var search;
  var online = navigator.onLine;
  var pagenum = 1;



// Online Checker
  if (online == false) {
    alert("There is no Internet access");
  };
// Search Button
  $("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#addSearch").click();
    }
  });
	$('#addSearch').on('click', function(){
    //will make sure to not make an api call if there is nothing in search box
		if ($("#search").val().trim() === "") {
      console.log("fail");
			return false;
		}
    //makes sure you are logged in before searching
    if (loggedin === false){
        $('#myModal').modal('show');
        $('#error').html("You must first Log in to do that.")
    }
    // will send api call for videos
    else {
      console.log("worked "+ loggedin);
      // sets search variable to whats in search box
			search = ($('#search').val().trim());
      //makes the api call using the search info
      pagenum = 1;
			runapi();
      //resets search bar to blank
			$("#search").val("");
			return false;
		}
	});	
// Register Button -CEP ONLY-
  $('#registerbtn').on('click', function(){
    console.log("register popout");
    window.cep.util.openURLInDefaultBrowser('https://www.videezy.com/signup')
  }); 
// Next Button
  $(document.body).on('click', '#nxtbtn' ,function(){
    console.log('next');
    pagenum++;
    runapi();
  }); 
// Prev Button
  $(document.body).on('click', '#prevbtn' ,function(){
    pagenum--;
    runapi();
  }); 
// runapi() -  API Call Function
	var runapi = function(){
    //sets up ajax call data into easy to use variable
		var response = $.ajax({
		  url: "https://www.videezy.com/api/v2/resources",
 	    method: "GET",
 	    data: { token : tokenID, search_term : search, page : pagenum},
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

        var spinner =$('<div>')
          .attr('id', 'spin'+data.data[i].id) 
        // builds SD download button
       	var sdbtn = $('<button>')
       	    .attr('class', 'btn-link glyphicon glyphicon-sd-video')
        		.attr('id', 'sdbtn'+data.data[i].id)
        		.attr('data-mp4', data.data[i].mp4)
        		.attr('onclick', "downloadAndImport('"+data.data[i].mp4+"', '"+data.data[i].name+"','"+data.data[i].id+"'); pushToList('"+data.data[i].id+"', '"+data.data[i].mp4+"', '"+data.data[i].name+"', '"+data.data[i].thumbnail+"')"); 
        // builds SD download button
        var hdbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-hd-video')
            .attr('id', 'hdbtn'+data.data[i].id)
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "hddl('"+data.data[i].id+"','"+data.data[i].name+"'); pushToList('"+data.data[i].id+"', '"+data.data[i].mp4+"', '"+data.data[i].name+"', '"+data.data[i].thumbnail+"')"); 
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
        vidDiv.prepend(spinner);
       	$('#videos').append(vidDiv);
    	};
      // Pages at bottom
        $("#pages").empty();
        console.log(data.meta_data.total_pages)
        console.log(data.meta_data.current_page)
        if(pagenum > 1){
          var prevbtn = $('<button>')
            .attr('id', 'prevbtn')
            .attr('class', 'btn-link')
            .html('<- prev');
          $('#pages').append(prevbtn);
        }
        if(pagenum < data.meta_data.total_pages){
           var nxtbtn = $('<button>')
            .attr('id', 'nxtbtn')
            .html('next ->')
            .attr('class', 'btn-link')
          $('#pages').append(nxtbtn);
        }

  	});

    response.fail(function( jqXHR, textStatus ) {
      if (jqXHR.status == 401){
        $('#myModal').modal('show');
        $('#error').html("You must first Log in to do that.")
      }else {
      alert(JSON.stringify(jqXHR.responseJSON));
      console.log(jqXHR.status);
      }
    });
  };
// Login Checker
  if (loggedin == false) {
    $(window).load(function(){
        $('#myModal').modal('show');
    });
  }
// Login Button
  //on enter trigger button click
    $("#emailform, #passform").keyup(function(event){
      if(event.keyCode == 13){
          $("#loginbtn").click();
      }
    });
  //on click, if form is filled out, send login event
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
// Login API call. gets token.
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
      $('#myModal').modal('hide');
      $('#loginmodal').attr('data-target', "#logoutModal")
    	console.log(tokenID);
    })
   
    requesttokenID.fail(function( jqXHR, textStatus ) {
      if (jqXHR.status == 403){
        $('#error').html("Incorrect username or password.")
      }else {
      alert(JSON.stringify(jqXHR.responseJSON));
      console.log(jqXHR.status);
      }
    });
  };
// Logout Button
    $('#logoutbtn').on('click', function(){
      console.log('logout');
      email = "";
      pass = "";
      loggedin = false;
      tokenID = "";
      tokenIDExpire = "";
      $("#loginmodal").html('Login');
      $("#favorites").empty();
      $("#videos").empty();
      $('#loginmodal').attr('data-target', "#myModal");
    })
// Favorites Button
  $('#loadfav').on('click', function(){
    loadfav();
  }); 
// Download Manager Button
  $('#downloadManager').on('click', function(){
    loadDM();
    console.log("clicked");
  }); 
//login("gatlinrowe@gmail.com","Lolbball22");   
}); //end of doc ready

// Global functions - able to be calld in onclick functions
  //current auth token
  var tokenID;
  // when Token will expire
  var tokenIDExpire;
  var downloadList = [];
// Download Manager
    function pushToList(id, mp4, name, thumbnail){
      var video = {id: id, mp4: mp4, name: name, thumbnail: thumbnail};
      downloadList.push(video);
      console.log(downloadList);
    };
// Download HD video API  
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
      downloadAndImport(data.url, name, id)
    });
  }
// Load Favorites Page API
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

        var spinner =$('<div>')
          .attr('id', 'spin'+data.data[i].id) 
        // builds SD download button
        var sdbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-sd-video')
            .attr('id', 'sdbtn'+data.data[i].id)
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "downloadAndImport('"+data.data[i].mp4+"', '"+data.data[i].name+"','"+data.data[i].id+"'); pushToList('"+data.data[i].id+"', '"+data.data[i].mp4+"', '"+data.data[i].name+"', '"+data.data[i].thumbnail+"')"); 
        // builds SD download button
        var hdbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-hd-video')
            .attr('id', 'hdbtn'+data.data[i].id)
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "hddl('"+data.data[i].id+"','"+data.data[i].name+"'); pushToList('"+data.data[i].id+"', '"+data.data[i].mp4+"', '"+data.data[i].name+"', '"+data.data[i].thumbnail+"')"); 
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
        vidDiv.prepend(spinner);
        $('#favorites').append(vidDiv);
      };
    });
    //downloadAndImport(data.data[i].mp4, data.data[i].name)
    response.fail(function( jqXHR, textStatus ) {
      if (jqXHR.status == 401){
        $('#myModal').modal('show');
        $('#error').html("You must first Log in to do that.")
      }else {
      alert(JSON.stringify(jqXHR.responseJSON));
      console.log(jqXHR.status);
      }
    });
  };
// Load Download Manager Page
    function loadDM(){
      console.log("loadDM");
      $('#downloaded').empty();
      //created video previews and buttons
      for (var i = 0; i < downloadList.length; i++) {
        //links video to player
        var vidDiv = $('<div>');
        vidDiv.attr('class', "col-xs-4 col-s-3 col-md-3");
        var vidA = $('<a>')
            vidA.attr('class', 'video');
        var image = $('<video>');
            image.attr('poster', downloadList[i].thumbnail);
            image.attr('src', downloadList[i].mp4);
            image.attr('data-mp4', downloadList[i].mp4);
            image.attr('data-name', $.trim(downloadList[i].name));
            image.attr('preload', 'none');
            image.attr('onmouseover', "$(this).get(0).play()");
            image.attr('onmouseout', "$(this).get(0).pause()");
        vidA.append(image);
        vidDiv.append(vidA);        

        var spinner =$('<div>')
          .attr('id', 'spin'+downloadList[i].id) 
        // builds SD download button
        var sdbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-sd-video')
            .attr('id', 'sdbtn'+downloadList[i].id)
            .attr('data-mp4', downloadList[i].mp4)
            .attr('onclick', "downloadAndImport('"+downloadList[i].mp4+"', '"+downloadList[i].name+"','"+downloadList[i].id+"'); pushToList('"+downloadList[i].id+"', '"+downloadList[i].mp4+"', '"+downloadList[i].name+"', '"+downloadList[i].thumbnail+"')"); 
        // builds SD download button
        var hdbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-hd-video')
            .attr('id', 'hdbtn'+downloadList[i].id)
            .attr('data-mp4', downloadList[i].mp4)
            .attr('onclick', "hddl('"+downloadList[i].id+"','"+downloadList[i].name+"'); pushToList('"+downloadList[i].id+"', '"+downloadList[i].mp4+"', '"+downloadList[i].name+"', '"+downloadList[i].thumbnail+"')"); 
        // builds Favorite button 
        // builds Favorite button 
        var favbtn = $('<button>')
            .attr('class', 'btn-link glyphicon glyphicon-heart')
            .attr('id', 'favbtn')
            .attr('data-mp4', downloadList[i].mp4)
            .attr('onclick', "addfav('"+downloadList[i].id+"')");    
        vidA.append(sdbtn);  
        vidA.append(hdbtn);   
        vidA.append(favbtn);  
        vidDiv.prepend(spinner); 
        $('#downloaded').append(vidDiv);
      };
    }
// Add to Favorites
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
// Remove from Favorites
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
// Error Reporter
  window.onerror = function (errorMsg, url, lineNumber) {
    alert(errorMsg + lineNumber);
  };    
// Download video.   
  var csInterface = new CSInterface();
  function downloadAndImport(url, fileName, id) {  
      // call the evalScript we made in the jsx file  
      console.log('dling');
        $('#spin'+id).attr('class', 'loader')
        console.log()
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
            var len = parseInt(response.headers['content-length'], 10);
            var body = "";
            var cur = 0;
            var obj = document.getElementById('js-progress');
            var total = len / 1048576; //1048576 - bytes in  1Megabyte

            response.on("data", function(chunk) {
                body += chunk;
                cur += chunk.length;
                obj.innerHTML = "Downloading " + (100.0 * cur / len).toFixed(2) + "% " + (cur / 1048576).toFixed(2) + " mb\r" + ".<br/> Total size: " + total.toFixed(2) + " mb";
            });
                 response.on('end', function() {  
                      $('#spin'+id).removeClass('loader')
                      csInterface.evalScript("app.project.importFiles(['" + fullPath + "'])");  
                 });  
           });  
       });               
  };


