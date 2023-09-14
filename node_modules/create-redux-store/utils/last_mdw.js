var cache = [];
var isIn = false;

module.exports = function(store) {
	return function(next) {
		return function(action) {

			if (isIn) {
				cache.push(action);
			} else if (!isIn && action.__isArray) {
				cache.push(action);
				isIn = true;
				setTimeout(function(){
					next({
						type : '@@ARRAY',
						payload : cache
					});
					cache = [];
					isIn = false;
				},0);
			} else {
				next(action);
			}

		}
	}
}