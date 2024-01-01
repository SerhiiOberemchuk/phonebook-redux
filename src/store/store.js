import { createStore } from 'redux';
import { reducer } from './reducer';

export const store = createStore(reducer);

// console.log(store);
// store.dispatch({ type: 'addfilter', payload: 2 });
// store.dispatch({
//   type: 'addcontacts',
//   payload: [{ name: 'Serhii', number: 555 }],
// });
// console.log('store.getState', store.getState());
