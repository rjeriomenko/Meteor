import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_TALE = 'tales/RECEIVE_TALE';
export const RECEIVE_ALL_TALES = 'tales/RECEIVE_ALL_TALES';
export const RECEIVE_FOLLOW_TALES = 'tales/RECEIVE_FOLLOW_TALES';
export const RECEIVE_CONSTELLATION_TALES = 'tales/RECEIVE_CONSTELLATION_TALES';
export const REMOVE_TALE = 'tales/REMOVE_TALE';

//Action Creators
export const receiveTale = tale => ({
    type: RECEIVE_TALE,
    tale
})

export const receiveAllTales = tales => ({
    type: RECEIVE_ALL_TALES,
    tales
})

export const receiveFollowTales = tales => ({
    type: RECEIVE_FOLLOW_TALES,
    tales
})

export const receiveConstellationTales = tales => ({
    type: RECEIVE_CONSTELLATION_TALES,
    tales
})

export const removeTale = taleId => ({
    type: REMOVE_TALE,
    taleId
})

//Thunk Action Creators
export const fetchTale = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${taleId}`);
    const data = await req.json();
    let tale = data.tale;

    if (tale) { dispatch(receiveTale(tale)) };
}

export const fetchPublishedTales = () => async (dispatch) => {
    const req = await csrfFetch(`/api/tales`);
    const data = await req.json();
    let tales = data;

    tales = tales.filter(tale => tale.publishTime);

    if (tales) { dispatch(receiveAllTales(tales)) };
}

export const fetchFollowTales = () => async (dispatch) => {
    const req = await csrfFetch(`/api/followed_users_tales`);
    const data = await req.json();
    let tales = data;

    tales = tales.filter(tale => tale.publishTime);

    if (tales) { dispatch(receiveFollowTales(tales)) };
}

export const fetchConstellationTales = (constellationName) => async (dispatch) => {
    const req = await csrfFetch(`/api/constellations/constellation_tales/${constellationName}`);
    const data = await req.json();
    let tales = data;

    tales = tales.filter(tale => tale.publishTime);

    if (tales) { dispatch(receiveConstellationTales(tales)) };
}

export const createTale = tale => async (dispatch) => {
    const req = await csrfFetch(`/api/tales`, {
        method: 'POST',
        body: JSON.stringify(tale)
    });
    const data = await req.json();
    const responseTale = data.tale;

    sessionStorage.setItem('newestTale', JSON.stringify(responseTale));
    
    dispatch(receiveTale(responseTale));
}

export const updateTale = tale => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${tale.id}`, {
        method: 'PATCH',
        body: JSON.stringify(tale)
    });
    const data = await req.json();
    const responseTale = data.tale;

    dispatch(receiveTale(responseTale));
}

export const updateAndPublishTale = tale => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${tale.id}?update-publish-time=true`, {
        method: 'PATCH',
        body: JSON.stringify(tale)
    });
    const data = await req.json();
    const responseTale = data.tale;

    dispatch(receiveTale(responseTale));
}

export const deleteTale = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${taleId}`, {
        method: 'DELETE',
    });

    dispatch(removeTale(taleId));
}

//Selectors
export const getTale = taleId => state => {
    return state.tales ? state.tales.all[taleId] : null;
}

export const getAllTales = state => {
    if (state?.tales) {
        return state.tales.all;
    } else return null;
}

export const getFollowTales = state => {
    if (state?.tales) {
        return state.tales.follow;
    } else return null;
}

export const getConstellationTales = state => {
    if (state?.tales) {
        return state.tales.constellation;
    } else return null;
}

//Reducer
const talesReducer = (state = { all: {}, follow: {}, constellation: {} }, action) => {
    let newState = { ...state };
    let orderedTales;

    switch (action.type) {
        case RECEIVE_TALE:
            return {
                ...newState, all: { ...newState.all, [action.tale.id]: action.tale }
            };
        case RECEIVE_ALL_TALES:
            orderedTales = action.tales.reduce((acc, tale) => {
                acc[tale.id] = tale;
                return acc;
            }, {});

            return {
                ...newState, all: orderedTales
            };
        case RECEIVE_FOLLOW_TALES:
            orderedTales = action.tales.reduce((acc, tale) => {
                acc[tale.id] = tale;
                return acc;
            }, {});

            return {
                ...newState, follow: orderedTales
            };
        case RECEIVE_CONSTELLATION_TALES:
            orderedTales = action.tales.reduce((acc, tale) => {
                acc[tale.id] = tale;
                return acc;
            }, {});

            return {
                ...newState, constellation: orderedTales
            };
        case REMOVE_TALE:
            delete newState.all[action.taleId];
            return newState;
        default:
            return state;
    };
};

export default talesReducer