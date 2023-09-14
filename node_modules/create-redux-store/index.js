var rdss = require('./utils/redusers');
var mdws = require('./utils/middlewares.js');
var redux = require('redux');
var createStore = redux.createStore;


const {composeWithDevTools} = require('redux-devtools-extension');

module.exports = function(rd,md) {
	var reduser = rdss(rd);
	var middlewares = mdws(md);

	if (process.env.NODE_ENV == 'development') {
		middlewares = require('redux-devtools-extension').composeWithDevTools(middlewares)
	}

	return createStore(reduser, middlewares)

}