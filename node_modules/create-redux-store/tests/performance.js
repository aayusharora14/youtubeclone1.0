const createStore = require('../')
const log = data => console.dir(data, {colors:true})

const defState = {
	count : 2
}



const reduser = (state=defState, action) => {
	
	switch (action.type) {

		case 'DECREMENT':
			return {
				count : state.count - 1
			}
		break;
		case 'INCREMENT':
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


const smallArray = [
	'DECREMENT',
	'DECREMENT'
]

let bigArray = [];

// 100000 actions at the same time
for (let i = 0; i < 100000; i++) {
	bigArray.push('INCREMENT')
}



console.time('test min timeout')
process.nextTick(()=>console.timeEnd('test min timeout'))



setTimeout(()=>{

	let remove = store.subscribe(() => {
		console.log('*******  test for small array actions')
		log(store.getState())
		console.timeEnd('small array actions')
		remove()
	})

	console.time('small array actions')
	store.dispatch(smallArray)
},100)

setTimeout(()=>{

	let remove = store.subscribe(() => {
		console.log('*******  test for big array actions')
		log(store.getState())
		console.timeEnd('big array actions')
		remove()
	})

	console.time('big array actions')
	store.dispatch(bigArray)
},500)


/*

test min timeout: 4.250ms


*******  test for small array actions
{ count: 0 }
small array actions: 12.084ms


*******  test for big array actions
{ count: 100000 }
big array actions: 139.938ms

 */