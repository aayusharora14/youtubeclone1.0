const createStore = require('../')
const log = data => console.dir(data, {colors:true})

const defState = {
	count : 0
}
const reduser = (state=defState, action) => {
	log(action);
	return state;
}

const store = createStore(reduser)

store.dispatch(new Error('test Error'))

// { type: '@@redux/INIT' }
// { type: '@@ERROR',
//   error: Error: test Error
//     at Object.<anonymous> ...
// }
