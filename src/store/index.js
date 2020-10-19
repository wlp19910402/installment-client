import {createStore,combineReducers}from 'redux'

import user from '@/store/user'

let arr = combineReducers({
	user:user
})
export default createStore(arr);