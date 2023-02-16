import {} from './postReducers';

import { combineReducers } from "redux";

import { addPost, deletePost } from "./postReducers";

export default combineReducers({
    addPost,
    deletePost
});
