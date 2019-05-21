// import { createStore, applyMiddleware, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import todoApp from '../reducers/index';

// export default function configureStore(initialState) {
//     const middleware = [thunkMiddleware];
//     const store = createStore(
//         todoApp,
//         initialState,
//         compose(
//             applyMiddleware(...middleware),
//         )
//     );

//     if (module.hot) {
//         module.hot.accept('../reducers', () => {
//             const nextReducer = require('../reducers');
//             store.replaceReducer(nextReducer);
//         });
//     }

//     return store;
// }


// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../reducers/rootReducer';
// import thunk from 'redux-thunk';


// export default function configureStore() {
//     return createStore(
//         rootReducer,
//         applyMiddleware(thunk)
//     );

// }

import { applyMiddleware, createStore,compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';


export default function configureStore() {
    const middleware = [thunkMiddleware];
    const store = createStore(
        rootReducer,
        // applyMiddleware(thunk)
        compose(
            applyMiddleware(...middleware),
            // DevTools.instrument()
        )
    );
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducer.js', () => {
            const nextReducer = require('../reducers/rootReducer.js');
            store.replaceReducer(nextReducer);
        });
    }
    console.log(store,"+++")

    return store;
}

