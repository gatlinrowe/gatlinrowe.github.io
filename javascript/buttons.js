

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
            .attr('data-mp4', data.data[i].mp4)
            .attr('onclick', "downloadAndImport('"+data.data[i].mp4+"', '"+data.data[i].name+"')");    
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