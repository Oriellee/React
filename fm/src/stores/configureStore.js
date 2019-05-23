import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store;
}

