import * as actionType from "../actions/actionTypes";

const initialState = {
    post: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionType.DELETED_POST: {
            return {
                ...state,
                post: action.payload
            };
        }
        default: {
            return { ...state };
        }
    }
}