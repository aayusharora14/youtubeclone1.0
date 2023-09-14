var isFunction = require('lodash/isFunction');
var isArray = require('lodash/isArray');
var isObject = require('lodash/isPlainObject');

var getFn = function(mdws) {
	return function(store) {
		return function(next) {
			return function(action) {
				if (mdws[action.type]) {

					mdws[action.type](store, next, action.payload, action)

				} else {
					next(action)
				}
			}
		}
	}
}


module.exports = function(arr) {
	var res = [];

	if (isFunction(arr)) {
		arr = [arr];
	} else if (!arr || !isArray(arr)) {
		arr = [];
	}

	for (var i = 0; i < arr.length; i++) {
		if (isFunction(arr[i])) {
			res.push(arr[i])
		} else if (isObject(arr[i])) {
			res.push(getFn(arr[i]))
		}
	}
	
	return res;
}