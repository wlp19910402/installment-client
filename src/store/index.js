import { createStore, combineReducers } from 'redux';

import user from '@/store/user';

const arr = combineReducers({
  user,
});
export default createStore(arr);
