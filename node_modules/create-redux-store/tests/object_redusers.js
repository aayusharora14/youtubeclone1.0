const createStore = require('../')
const log = data => console.dir(data, {colors:true})

const defStateFirst = {
	count : 0
}

const defStateSecond = {
	count : 0
}

const defStateLast = {
	count : 0
}


const redusers = {
	first : (state=defStateFirst, action) => {
		if (action.type == 'INCREMENT') {
			return {
				count : state.count + 1
			}
		}

		return state;
	},
	second : (state=defStateSecond, action) => {
		if (action.type == 'INCREMENT') {
			return {
				count : state.count + 2
			}
		}

		return state;
	},
	last : (state=defStateLast, action) => {
		if (action.type == 'INCREMENT') {
			return {
				count : state.count + 3
			}
		}

		return state;
	}
}

const store = createStore(redusers)


// initial state
log(store.getState())

store.subscribe(()=>{
	log(store.getState())
})

store.dispatch('INCREMENT')

/*

initial state
{ 
	first: { count: 0 }, 
	second: { count: 0 }, 
	last: { count: 0 } 
}


result state
{ 
	first: { count: 1 }, 
	second: { count: 2 }, 
	last: { count: 3 } 
}

*/