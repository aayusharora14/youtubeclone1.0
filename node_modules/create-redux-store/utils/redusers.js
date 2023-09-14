var redux = require('redux');
var combineReducers = redux.combineReducers;
var isObject = require('lodash/isPlainObject');
var isFunction = require('lodash/isFunction');
var isArray = require('lodash/isArray');

var errorMsg = 'Reduser must be a Function';
var reduserWrapper = function(reduser) {

	return function(state, action) {
		if (action.type == '@@ARRAY' && isArray(action.payload)) {
			if (action.payload.length == 0) return state;
			for (var i = 0; i < action.payload.length; i++) {
				state = reduser(state, action.payload[i])
			}
			return state;
		} else {
			return reduser(state, action);
		}
	}
}


module.exports = function(redusers) {
	if (isFunction(redusers)) {
		return reduserWrapper(redusers);
	} else if (isObject(redusers)) {
		var res = {}
		for (var i in redusers) {
			if (!isFunction(redusers[i])) {
				throw new Error(errorMsg)
			}

			res[i] = reduserWrapper(redusers[i])
		}
		return combineReducers(res)
	} else {
		throw new Error(errorMsg)
	}
}