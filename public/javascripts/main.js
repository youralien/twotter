$loginForm = $('form#login')
$loginForm.submit( function(e) {
	e.preventDefault();
	name = $(this).children('input').val()
	$.post('/login', {'name': name}, function(data) {
		alert('Welcome ' + data.name);
	});
});