var subjects = [];
var email;
var pass;
var loggedin = false;

function login(){
	email = $('#emailform').val().trim();
	pass = $('#passform').val().trim()
	loggedin = true;
	$('#loginmodal').html(email);
};
function createSubject(){
	item = new Subject($('#titleform').val().trim(), $('#imgform').val().trim(), $('#descform').val().trim(), 0 , email);
	subjects.push(item);
	console.log(subjects);
	populateSubjects();
}
function rate(sub, rating){
 sub.rating = rating;
 console.log(sub.rating);
 populateSubjects();
};

function Subject(title, image, description, rating, owner) {
	this.title = title;
	this.image = image;
	this.description = description;
	this.rating = rating;
	this.owner = owner;
};
function populateSubjects(){
	console.log('populating');
	$('#accordion').empty();
	for (var i = 0; i < subjects.length; i++) {
        //links video to player
        console.log(subjects[i].title);
    		var subDiv = $('<div>')
    			.attr('class', 'panel');
    			var headDiv = $('<div>')
    				.attr('role', 'tab')
    				.attr('id', 'heading'+i);
    				var carouselDiv = $('<div>')
    					.attr('id', 'mycarousel')
    					.attr('class', 'carousel slide collapsed')
    					.attr('data-ride', 'carousel')
    					.attr('id', 'coll')
    					.attr('role', 'button')
    					.attr('data-toggle', 'collapse')
    					.attr('data-parent', '#accordion')
    					.attr('href', '#collapse'+i)
    					.attr('aria-expanded', 'false')
    					.attr('aria-control', 'collapse'+i);
    					var carInner = $('<div>')
    						.attr('class', 'carousel-inner');
    						var activeDiv = $('<div>')
    							.attr('class', 'item active');
    							var subImg = $('<img>')
    								.attr('src', '/../img/rateit_'+subjects[i].rating+'stars.png')
    								.attr('class', 'img-responsive');
    							var titleDiv = $('<div>')
    								.attr('class', 'carousel-caption')
    								.html('<h1>'+subjects[i].title+'</h1>');
    		var collDiv = $('<div>')
    			.attr('id', 'collapse'+i)
    			.attr('class', 'panel-collapse collapse')
    			.attr('role', 'tabpanel')
    			.attr('aria-labelledby', 'heading'+i);
    			var bodyDiv = $('<div>')
    				.attr('class', 'panel-body')
    				.html(subjects[i].description);
    				var ratingDiv = $('<div>')
    					.attr('class', 'rating');
    					var span5 = $('<span>')
    						.attr('id', '5star')
    						.attr('onclick', 'rate(subjects['+i+'], 5)')
    						.html('&#9734;');
    					var span4 = $('<span>')
    						.attr('id', '4star')
    						.attr('onclick', 'rate(subjects['+i+'], 4)')
    						.html('&#9734;');
    					var span3 = $('<span>')
    						.attr('id', '3star')
    						.attr('onclick', 'rate(subjects['+i+'], 3)')
    						.html('&#9734;');
    					var span2 = $('<span>')
    						.attr('id', '2star')
    						.attr('onclick', 'rate(subjects['+i+'], 2)')
    						.html('&#9734;');
    					var span1 = $('<span>')
    						.attr('id', '1star')
    						.attr('onclick', 'rate(subjects['+i+'], 1)')
    						.html('&#9734;');

    		subDiv.append(collDiv);
    		collDiv.append(bodyDiv);
    		bodyDiv.append(ratingDiv);
    		ratingDiv.prepend(span1);
    		ratingDiv.prepend(span2);
    		ratingDiv.prepend(span3);
    		ratingDiv.prepend(span4);
    		ratingDiv.prepend(span5);
    		subDiv.prepend(headDiv);
    		headDiv.append(carouselDiv);
    		carouselDiv.append(carInner);
    		carInner.append(activeDiv);
    		activeDiv.append(subImg);
    		activeDiv.prepend(titleDiv);
    		$('#accordion').append(subDiv);

	};
};
populateSubjects();
