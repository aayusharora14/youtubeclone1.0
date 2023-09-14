const createStore = require('../')
const log = data => console.dir(data, {colors:true})

const defState = {
	count : 0
}
const reduser = (state=defState, action) => {
	console.log('reduser')
	log(action);
	console.log('*******************************************')
	return state;
}

const fnMiddleware = store => next => action => {
	console.log('Fn middleware')
	console.log(`ACTION: ${action.type}`)
	next(action)
}

const objMiddleware = {
	'test:first' : (store, next, payload, action) => {
		console.log('middleware for action \'test:first\'')
		next({
			type : 'test',
			payload : 'first'
		})
	},

	'test:last' : (store, next, payload, action) => {
		console.log('middleware for action \'test:last\'')
		next({
			type : 'test',
			payload : 'last'
		})
	}
}


const middlewares = [fnMiddleware, objMiddleware]

const store = createStore(reduser, middlewares)

store.dispatch('test:zero')
store.dispatch('test:first')
store.dispatch('test:last')

/*

reduser
{ type: '@@redux/INIT' }

*******************************************

Fn middleware
ACTION: test:zero

reduser
{ type: 'test:zero' }

*******************************************

Fn middleware
ACTION: test:first

middleware for action 'test:first'

reduser
{ type: 'test', payload: 'first' }

*******************************************

Fn middleware
ACTION: test:last

middleware for action 'test:last'

reduser
{ type: 'test', payload: 'last' }

*******************************************


 */
