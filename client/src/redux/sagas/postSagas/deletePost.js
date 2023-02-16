import { all, put, call, takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import postsblogPostApi from "../../server/api";


function* deletePost(action) {
    console.log(action)
    try {
        const postResponse = yield call(postsblogPostApi.delete, action.payload);
        yield put({ type: actionType.DELETED_POST, payload: postResponse });
    } catch (err) {
        console.log(err);
    }
}

export default function* deletePostSaga() {
    yield takeEvery(actionType.DELETE_POST, deletePost);
}
