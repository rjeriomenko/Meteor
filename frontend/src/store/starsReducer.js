import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_STARS = 'stars/RECEIVE_STARS';
export const RECEIVE_STAR = 'stars/RECEIVE_STAR';
export const REMOVE_STAR = 'stars/REMOVE_STAR';

//Action Creators
export const receiveStar = star => ({
    type: RECEIVE_STAR,
    star
})

export const receiveStars = stars => ({
    type: RECEIVE_STARS,
    stars
})

export const removeStar = starId => ({
    type: REMOVE_STAR,
    starId
})

//Thunk Action Creators
export const fetchStars = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${taleId}/stars`);
    const data = await req.json();
    let stars = data;

    if (stars) { dispatch(receiveStars(stars)) };
}

export const createStar = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${taleId}/stars`, {
        method: 'POST'
    });
    const data = await req.json();
    const responseStar = data.star;

    dispatch(receiveStar(responseStar));
}

export const deleteStar = starId => async (dispatch) => {
    const req = await csrfFetch(`/api/stars/${starId}`, {
        method: 'DELETE',
    });

    dispatch(removeStar(starId));
}

//Selectors
export const getStars = state => {
    if (state?.stars) {
        return state.stars;
    } else return null;
}

const starsReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_STAR:
            return {
                ...newState, [action.star.id]: action.star
            };
        case RECEIVE_STARS:
            const orderedStars = action.stars.reduce((acc, star) => {
                acc[star.id] = star;
                return acc;
            }, {});

            return {
                ...orderedStars
            };
        case REMOVE_STAR:
            delete newState[action.starId];
            return newState;
        default:
            return state;
    };
};

export default starsReducer