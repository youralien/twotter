# twotter
twotter, a distant descendant of twitter.  For OlinJS homework 6.
## lessons learned
### precompiling handlebar templates to be used in the client
I used this when wanting to display my `twoot_form` partial upon logging in. I thought to include a little write up on how I did it, for use by anyone who would benefit in the future.

here's are the steps:

1. Download handlebars globally using `npm install handlebars -g`.

2. Create a `templates` folder in `public/javascripts`.  We will put all client-side Handlebar template files in `public/javascripts/templates`.

3. Download [handlebars.runtime.js](http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v3.0.0.js). Move the handlebars runtime file into `public/javascripts/templates`. For most Ubuntu Linux Distros, I used the command `mv ~/Downloads/handlebars.runtime-v3.0.0.js /public/javascripts/templates/handlebars.runtime.js`.

4. I wanted to make all my partials usable in the front end, as I've organized my partials as code blocks that can be organized wherever in the DOM.  From the home directory of my express app, we can convert the `.handlebars` files into precompiled javascript accessible by the client: `handlebars views/partials/> public/javascripts/templates/templates.js`

5. Include the required handlebars scripts in the main html page.  In the case of this express app, that file is `main.handlebars`.  Do so like this:

  ````javascript
<script src='javascripts/templates/handlebars.runtime.js'></script>
<script src='javascripts/templates/templates.js'></scripts>
  ````

6. Our templates now live in an object on the client.  You can test in your debugger, `Handlebars.templates`. This is an object with all the templates we precompiled.  In this tutorial, I mentioned to compile all your partials. So if we had a partial like `twoot_form.handlebars`, we could access this template by typing in our client-console `Handlebars.templates['twoot_form'].`For example, in /public/javascripts/main.js, in a post request handler, we can do

  ````javascript
$.post(url, data, function(context) {
    var twoot_form = Handlebars.templates['twoot_form'];
    $('.twoot-col').prepend(twoot_form(context));
});
  ````

####References:
1. http://berzniz.com/post/24743062344/handling-handlebars-js-like-a-pro
2. http://handlebarsjs.com/precompilation.html
