
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
		
	login.done(loginSuccess);
	
	login.error(onError);
}

function loginSuccess(context) {
	makeTwootForm(context);
	makeLogoutForm(context);
}

function makeTwootForm(context) {
	// Display the twoot form for the logged in user
	var twoot_form = Handlebars.templates['twoot_form'];

	$('.twoot-col').prepend(twoot_form(context))

	// register twoot-form event listener
	$('#twoot-form').submit(twootFormHandler);
}

function makeLogoutForm(context) {
	// replace login form with logout form
	logout_form = Handlebars.templates['logout_form'];
	$('#login-form').replaceWith(logout_form(context));

	// register logout-form event listener
	$('#logout-form').submit(logoutFormHandler);
}

function logoutFormHandler(event) {
	event.preventDefault();
	
	// Get some values from elements on the page:
	var $form = $( this );
  var url = $form.attr( "action" );

	logout = $.post(url, {'name': name});
		
	logout.done(logoutSuccess);
	
	login.error(onError);	
}

function logoutSuccess(context) {
	// remove twoot form
	$('#twoot-form').remove();
	
	// replace logout form with login form
	makeLoginForm(context);
}

function makeLoginForm(context) {
	// replace logout form with login form
	login_form = Handlebars.templates['login_form'];
	$('#logout-form').replaceWith( login_form(context));

	// register logout-form event listener
	$('#login-form').submit(loginFormHandler);
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
    	twoot_blockquote = Handlebars.templates['twoot_blockquote'];
    	$('.twoot-list').prepend(twoot_blockquote(twoot));
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

$('#login-form').submit(loginFormHandler);
$('#logout-form').submit(logoutFormHandler);
$('#twoot-form').submit(twootFormHandler);
$('.user-selector').click(userSelectorHandler);
