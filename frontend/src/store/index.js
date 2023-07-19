import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './usersReducer';
import talesReducer from './talesReducer';
import cometsReducer from './cometsReducer';
import starsReducer from './starsReducer';
import followsReducer from './followsReducer';

export const rootReducer = combineReducers({
    users: usersReducer,
    tales: talesReducer,
    comets: cometsReducer,
    stars: starsReducer,
    follows: followsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore