
function onError() {
	debugger;
	console.error('Somthing went wrong!')
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

$('#twoot-form').submit(twootFormHandler);
$('.user-selector').click(userSelectorHandler);
$('img.delete-button').click(deleteTwootHandler);
$('blockquote').click(toggleDeleteButton);