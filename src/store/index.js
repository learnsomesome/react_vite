import { combineReducers, createStore } from 'redux';
import { listReducer } from './reducers/listReducer';

const reducers = combineReducers({
  listReducer,
});

export const store = createStore(reducers);
