const createStore = require('../')
const log = data => console.dir(data, {colors:true})

const defState = {
	count : 0
}
const reduser = (state=defState, action) => {
	log('reduser')
	log(action);
	return state;
}

const middleware = store => next => action => {
	console.log('once Fn middleware')
	if (action.type == 'test:middleware') {
		action.payload = 'for middleware';
		next(action);
	} else {
		next(action);
	}
}

const store = createStore(reduser, middleware)

store.dispatch('test:middleware')

console.log('*****************************************')
const middlewares = [
	// 1
	store => next => action => {
		console.log('first Mdw')
		action.payload.one = true;
		next(action)
	},
	// 2
	store => next => action => {
		console.log('second Mdw')
		action.payload.two = true;
		next(action)
	},
	// 3
	store => next => action => {
		console.log('third Mdw')
		action.payload.three = true;
		next(action)
	}
]


const store2 = createStore(reduser, middlewares)
store2.dispatch({
	type : 'test:middleware',
	payload : {
		one : false,
		two : false,
		three : false
	}
})

/*

'reduser'
{ type: '@@redux/INIT' }

once Fn middleware
'reduser'
{ type: 'test:middleware', payload: 'for middleware' }

*****************************************
'reduser'
{ type: '@@redux/INIT' }

first Mdw
second Mdw
third Mdw

'reduser'
{ type: 'test:middleware',
  payload: { one: true, two: true, three: true } }


 */