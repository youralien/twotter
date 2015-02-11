
function onError() {
	console.error('Somthing went wrong!')
}

$('form#login').submit( function(e) {
	e.preventDefault();

	// Get some values from elements on the page:
	var $form = $( this )
	var name = $form.find( "input[name='username']" ).val()
    var url = $form.attr( "action" );

    if (name) {

		login = $.post(url, {'name': name})
			
		login.done(function(data) {
			alert('Welcome ' + data.name)
		});

		login.error(onError)
    
    } else {

    	alert('User')
    }


});

$('form#twoot').submit( function(e) {
	e.preventDefault();

	// Get some values from elements on the page:
	var $form = $( this )
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
    	
});
