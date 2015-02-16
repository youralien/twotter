(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.logout_form,depth0,{"name":"logout_form","data":data,"indent":"\t\t","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.login_form,depth0,{"name":"login_form","data":data,"indent":"\t\t","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class='navbar navbar-default'>\n	<div class='navbar-header'>\n		<img class='navbar-left' src='/images/owl.png' height=128 width=128></img>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.loggedin : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"usePartial":true,"useData":true});
templates['login_form'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<form action='/login' id='login-form' class='navbar-form navbar-right'>\n	<input type='text' name='username' placeholder='username' class='form-control' required='true'>\n	<button type='submit' class='btn btn-submit form-control'>*   Sign In   *</button>\n</form>\n";
},"useData":true});
templates['logout_form'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<form action='/logout' id='logout-form' class='navbar-form navbar-right'>\n	<legend>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</legend>\n	<button type='submit' class='btn btn-submit form-control'>*   Sign Out   *</button>\n</form>\n";
},"useData":true});
templates['twoot_blockquote'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "<blockquote class=\"pull-left list-group-item col-xs-12\" name='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "' id=\""
    + alias2(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n    <p class='blockquote-body'>\n    	"
    + alias2(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper)))
    + "	\n    </p>\n    <small class='author-signature'>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1), depth0))
    + "</small>\n    <img alt='Delete' class='delete-button' src='/images/editing-delete-icon.png' hidden></img>\n</blockquote>";
},"useData":true});
templates['twoot_form'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<form id='twoot-form' action='/create' class='form-horizontal'>\n	<legend>Twoot! #YouOnlyTwootOnce</legend>\n	<textarea placeholder='Your Twoot Here' class='form-control' required='true'></textarea>\n	<div class='panel-footer author-signature' name='author'>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n	<button type='submit' class='btn btn-success btn-raised form-control'>Submit</button>\n</form>";
},"useData":true});
templates['twoot_list'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['with'].call(depth0,depth0,{"name":"with","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.twoot_blockquote,depth0,{"name":"twoot_blockquote","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class='twoot-list list-group'>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.twoots : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
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
