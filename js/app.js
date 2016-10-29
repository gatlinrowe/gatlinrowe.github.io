var subjects = [];
var email;
var pass;
var loggedin = false;

subject1 = new Subject("Parachute Pants", "http://themiamianblog.com/wp-content/uploads/2015/08/parachute-pants-1.png",  "they suck blah blah", 2, "Gatlin");
subjects.push(subject1);
subjects[1] = new Subject("Bananas", "https://upload.wikimedia.org/wikipedia/commons/4/4c/Bananas.jpg",  "A delicious Piece of fruit, commonly eaten around the world", 2, "Gatlin");
subjects[2] = new Subject("Note 7", "http://blogs-images.forbes.com/jaymcgregor/files/2016/08/galaxy-note-7-1200x801.jpg",  "The new flagship Samsung phone. Dude, I got the note 7 but it exploded. I went to get a replacement and that one exploded too.", 2, "Gatlin");
subjects[3] = new Subject("Netflix's new logo", "https://lh5.googleusercontent.com/-9El0rLwfX5E/AAAAAAAAAAI/AAAAAAAAIl8/S4IbyT2gTMo/s0-c-k-no-ns/photo.jpg",  "Stream TV shows and Movies. Netflix and chill", 2, "Gatlin");

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
         console.log(subjects);
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
    								.attr('src', 'img/rateit_'+subjects[i].rating+'stars.png')
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
                    var parDiv = $('<p>')
           				.html(subjects[i].description);
    				var picDiv = $('<img>')
                        .attr('src', subjects[i].image)
                        .attr('id', 'pic');
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
            bodyDiv.append(picDiv);           
    		bodyDiv.append(ratingDiv);
            bodyDiv.append(parDiv);
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
$( document ).ready(function() {
populateSubjects();
});