import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index";

import {addPostSaga, deletePostSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middleware =
    window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === "development"
        ? compose(applyMiddleware(sagaMiddleware), reduxDevTools)
        : applyMiddleware(sagaMiddleware);


export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(addPostSaga);

sagaMiddleware.run(deletePostSaga);