import { all, put, call, takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import postsblogPostApi from "../../server/api";



function* addPost(action) {
    console.log(action)
    try {
        const postResponse = yield call(postsblogPostApi.add, action.payload);
        yield put({ type: actionType.ADDED_POST, payload: postResponse });
    } catch (err) {
        console.log(err);
    }
}

export default function* addPostSaga() {
    yield takeEvery(actionType.ADD_POST, addPost);
}