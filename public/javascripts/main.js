
function onError() {
	console.error('Somthing went wrong!')
}

$loginForm = $('form#login')
$loginForm.submit( function(e) {
	e.preventDefault();

	// Get some values from elements on the page:
	var $form = $( this )
	var name = $form.find( "input[name='username']" ).val()
    var url = $form.attr( "action" );

	login = $.post('/login', {'name': name})
		
	login.done(function(data) {
		alert('Welcome ' + data.name)
	});

	login.error(onError)

});