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

const store = createStore(reduser)

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
	'INCREMENT',
	'INCREMENT',
	'INCREMENT',
	'INCREMENT'
])



/*
	called once
	SUBSCRIBE...
	{ count: 8 }

*/


