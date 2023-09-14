var redux = require('redux');
var applyMiddleware = redux.applyMiddleware;
var first = require('./first_mdw');
var last = require('./last_mdw');
var parse = require('./parse_mdw');

module.exports = function(arrMdw, options) {
	var res = parse(arrMdw);

	res.unshift(first);
	res.push(last)

	return applyMiddleware.apply(this,res)
}