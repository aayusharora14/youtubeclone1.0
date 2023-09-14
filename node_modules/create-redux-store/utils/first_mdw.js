var isPromise = require('ispromise');
var isArray = require('lodash/isArray')
var isError = require('lodash/isError')
var isString = require('lodash/isString')

var parse = function(action) {
	if (isPromise(action) || isArray(action)) {
		return false;
	} else if (isString(action)) {
		return { type : action };
	} else if (isError(action)) {
		return {
			type : '@@ERROR',
			error : action
		};
	} else {
		return action;
	}
}

module.exports = function(store) {
	var prDisp = function(action) {
		store.dispatch(action);
	}

	return function(next) {
		return function(action) {
			var pa = parse(action);
			if (pa) {
				return next(pa)
			}

			if (isPromise(action)) {
				return action.then(prDisp).catch(prDisp)
			} else if (isArray(action)) {

				for (var i = 0; i < action.length; i++) {
					var ac = parse(action[i])
					if (ac) {
						ac.__isArray = true;
						next(ac)
					} else if (ac == false) {
						store.dispatch(action[i])
					}
				}

			} else {
				next(action)
			}

		}
	}
}