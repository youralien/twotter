
function onError() {
	debugger;
	console.error('Somthing went wrong!')
}

function loginFormHandler(event) {
	event.preventDefault();

	// Get some values from elements on the page:
	var $form = $( this );
	var name = $form.find( "input[name='username']" ).val();
	var url = $form.attr( "action" );

	$.post(url, {'name': name})
		.success(loginSuccess)
		.error(onError);
}

function loginSuccess(context) {
	makeTwootForm(context);
	makeUserList(context);
	makeLogoutForm(context);
}

function makeTwootForm(context) {
	// Display the twoot form for the logged in user
	var twoot_form = Handlebars.templates['twoot_form'];

	$('.twoot-col').prepend(twoot_form(context))

	// register twoot-form event listener
	$('#twoot-form').submit(twootFormHandler);
}

function makeUserList(context) {
	// update the user list with any new users
	var user_list = Handlebars.templates['user_list'];
	$('.user-col').html(user_list(context));

	// register the user-list event listener
	$('.user-selector').click(userSelectorHandler);
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

	$.post(url, {'name': name})
		.success(logoutSuccess)
		.error(onError);
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
		$('blockquote').click(toggleDeleteButton);
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

function deleteTwootHandler() {
	$deleteButton = $(this);

	// extract information from element
	var _id = $deleteButton.parent().attr('id');

	$.post('/delete', {'_id':_id})
		.success(deleteSuccess)
		.error(onError);
}

function deleteSuccess() {
	$deleteButton.parent().remove();
}

function toggleDeleteButton() {
	sessionUser = $('#logout-form').find('legend').html();
	$deleteButton = $(this).children('img');

	if ($deleteButton.parent().attr('name') === sessionUser) {
		$deleteButton.toggle();	

		// register delete button event listener
		$('img.delete-button').click(deleteTwootHandler);
	}
}

$('#login-form').submit(loginFormHandler);
$('#logout-form').submit(logoutFormHandler);
$('#twoot-form').submit(twootFormHandler);
$('.user-selector').click(userSelectorHandler);
$('img.delete-button').click(deleteTwootHandler);
$('blockquote').click(toggleDeleteButton);