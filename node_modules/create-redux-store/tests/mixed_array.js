const createStore = require('../')
const log = data => console.dir(data, {colors:true})

const defState = {
	count : 0
}
const reduser = (state=defState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count : state.count + 1
			}
		break;
		case 'DECREMENT':
			return {
				count : state.count - 1
			}
		break;
		default:
			return state;
		break;
	}
}

const store = createStore(reduser,)

store.subscribe(() => {
	console.log('SUBSCRIBE...')
	log(store.getState())
})

store.dispatch([
	// Strin value
	'INCREMENT',
	'INCREMENT',
	'INCREMENT',
	'INCREMENT',
	// Object value
	{
		type : 'INCREMENT'
	},
	// Promise String INCREMENT
	new Promise((resolve, reject) => {
		setTimeout(() => resolve('INCREMENT'), 100)
	}),
	// Promise Object DECREMENT
	new Promise((resolve, reject) => {
		setTimeout(() => resolve({
			type : 'DECREMENT'
		}), 50)
	})
])

/*

synchronous actions
	SUBSCRIBE...
	{ count: 5 }


DECREMENT Promise
	SUBSCRIBE...
	{ count: 4 }

INCREMENT Promise
	SUBSCRIBE...
	{ count: 5 }


 */
