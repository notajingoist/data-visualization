/**
 * @name Application
 * @desc The brain of the application
 */

 /*

 ,
	'account/node.account',
	'articles/node.articles',
	'chrome/node.chrome'

	function(Backbone, Account, Articles, Chrome)

*/

define([
	'backbone'
], function(Backbone) {

	var Application = Backbone.View.extend({

		el: document.body,

		initialize: function() {
			// this.account = new Account();
			// this.articles = new Articles();
			// this.chrome = new Chrome({
			// 	model: this.account.user
			// });
		}

	});

	return new Application();
});
