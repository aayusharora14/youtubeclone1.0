const createStore = require('../')
const log = data => console.dir(data, {colors:true})



const defState = {
	count : 0
}

console.time('promise:resolve')
console.time('promise:reject')


const reduser = (state=defState, action) => {
	log(action);
	switch (action.type) {
		case '@@ERROR':
			console.timeEnd('promise:reject')
			return state;
		break;
		case 'INCREMENT':
			console.timeEnd('promise:resolve')
			return {
				count : state.count + 1
			}
		break;
		default:
			return state;
		break;

	}
}

const store = createStore(reduser)

store.subscribe( () => {
	console.log('SUBSCRIBE...')
	log(store.getState())
})

store.dispatch(new Promise((resolve, reject) => {
	setTimeout(() => resolve('INCREMENT'),1000)
}))


store.dispatch(new Promise((resolve, reject) => {
	setTimeout(() => reject(new Error('test promise Error')), 1200)
}))


/*
{ type: '@@redux/INIT' }

{ type: 'INCREMENT' }
promise:resolve: 1025.810ms

SUBSCRIBE...
{ count: 1 }

{ type: '@@ERROR',
  error: Error: test promise Error
    at Timeout.setTimeout [as _onTimeout] (/home/karifan/node/git/create-redux-store/tests/promise.js:47:26)
    at ontimeout (timers.js:458:11)
    at tryOnTimeout (timers.js:296:5)
    at Timer.listOnTimeout (timers.js:259:5) }
promise:reject: 1222.578ms

SUBSCRIBE...
{ count: 1 }

*/