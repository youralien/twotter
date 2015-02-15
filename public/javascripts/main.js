
function onError() {
	console.error('Somthing went wrong!')
}

function loginFormHandler(event) {
	event.preventDefault();

	// Get some values from elements on the page:
	var $form = $( this );
	var name = $form.find( "input[name='username']" ).val();
    var url = $form.attr( "action" );

	login = $.post(url, {'name': name});
		
	login.done(function(context) {
		var twoot_form = Handlebars.templates['twoot_form'];
		$('.twoot-col').prepend(twoot_form(context))
	});

	login.error(onError);
}

function twootFormHandler(event) {
	event.preventDefault();

	// Get some values from elements on the page:
	var $form = $( this );
	var text = $form.find( "textarea" ).val();
    var url = $form.attr( "action" );

    var twoot = {
    	'text': text
    };

    $.post(url,	twoot, function(twoot) {
    	alert('Twoot posted');
    	debugger;
    })
    	.error(onError);
}

function userSelectorHandler() {
	$userSelector = $( this );

	// extract information from element
	var name = $userSelector.attr('name');

	// (de)/highlight all the things
	$(".list-group-item[name='"+name+"']").toggleClass('list-group-item-danger');
}

$('form#login').submit(loginFormHandler);
$('form#twoot').submit(twootFormHandler);
$('.user-selector').click(userSelectorHandler);
