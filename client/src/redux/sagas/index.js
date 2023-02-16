import {addPostSaga, deletePostSaga} from "./postSagas";


export default function* rootSaga() {
    yield all([
        addPostSaga(),
        deletePostSaga()
    ]);
}

