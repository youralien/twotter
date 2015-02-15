(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class='navbar navbar-default'>\n	<div class='navbar-header'>\n		<img class='navbar-left' src='/images/owl.png' height=128 width=128></img>\n		<form action='/login' id='login' class='navbar-form navbar-right'>\n			<input type='text' name='username' placeholder='username' class='form-control' required='true'>\n			<button type='submit' class='btn btn-submit form-control'>*   Sign In   *</button>\n		</form>\n	</div>\n</div>";
},"useData":true});
templates['twoot_form'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class='panel panel-default'>\n<div class='panel-body'>\n<form id='twoot' action='/' class='form-horizontal'>\n	<legend>Twoot! #YouOnlyTwootOnce</legend>\n	<textarea placeholder='Your Twoot Here' class='form-control' required='true'></textarea>\n	<div class='panel-footer author-signature' name='author'>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n	<button type='submit' class='btn btn-success btn-raised form-control'>Submit</button>\n</form>\n</div>\n</div>";
},"useData":true});
templates['twoot_list'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "	<blockquote class=\"pull-left list-group-item col-xs-12\" name='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "'>\n	    <p>"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</p>\n	    <small>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "</small>\n	</blockquote>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class='list-group'>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.twoots : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['user_list'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "	<a name='"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "' class='list-group-item user-selector'>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h4>Users</h4>\n<div class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.users : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();
