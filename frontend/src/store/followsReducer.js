import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_FOLLOWS = 'tales/RECEIVE_FOLLOWS';
export const RECEIVE_FOLLOW = 'tales/RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'tales/REMOVE_FOLLOW';

//Action Creators
export const receiveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow
})

export const receiveFollows = follows => ({
    type: RECEIVE_FOLLOWS,
    follows
})

export const removeFollow = followId => ({
    type: REMOVE_FOLLOW,
    followId
})

//Thunk Action Creators
export const fetchFollows = () => async (dispatch) => {
    const req = await csrfFetch(`/api/follows`);
    const data = await req.json();
    let follows = data;

    if (follows) { dispatch(receiveFollows(follows)) };
}

export const createFollow = userId => async (dispatch) => {
    const req = await csrfFetch(`/api/users/${userId}/follows`, {
        method: 'POST'
    });
    const data = await req.json();
    const responseFollow = data.follow;

    dispatch(receiveFollow(responseFollow));
}

export const deleteFollow = followId => async (dispatch) => {
    const req = await csrfFetch(`/api/follows/${followId}`, {
        method: 'DELETE',
    });

    dispatch(removeFollow(followId));
}

//Selectors
export const getFollows = state => {
    if (state?.follows) {
        return state.follows;
    } else return null;
}

const followsReducer = (state = {}, action) => {
    let newState = { ...state };
    let orderedFollows;

    switch (action.type) {
        case RECEIVE_FOLLOW:
            return {
                ...newState, [action.follow.id]: action.follow
            };
        case RECEIVE_FOLLOWS:
            orderedFollows = action.follows.reduce((acc, follow) => {
                acc[follow.id] = follow;
                return acc;
            }, {});
            return {
                ...newState, ...orderedFollows
            };
        case REMOVE_FOLLOW:
            delete newState[action.followId];
            return newState;
        default:
            return state;
    };
};

export default followsReducer