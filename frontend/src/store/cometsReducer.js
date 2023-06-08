import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_COMETS = 'tales/RECEIVE_COMETS';
export const RECEIVE_COMET = 'tales/RECEIVE_COMET';
export const REMOVE_COMET = 'tales/REMOVE_COMET';

//Action Creators
export const receiveComet = comet => ({
    type: RECEIVE_COMET,
    comet
})

export const receiveComets = comets => ({
    type: RECEIVE_COMETS,
    comets
})

export const removeComet = cometId => ({
    type: REMOVE_COMET,
    cometId
})

//Thunk Action Creators
export const fetchComets = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${taleId}/comets`);
    const data = await req.json();
    let comets = data;

    if (comets) { dispatch(receiveComets(comets)) };
}

export const createComet = (comet) => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${comet.taleId}/comets`, {
        method: 'POST',
        body: JSON.stringify(comet)
    });
    const data = await req.json();
    const responseComet = data.comet;

    dispatch(receiveComet(responseComet));
}

export const updateComet = comet => async (dispatch) => {
    const req = await csrfFetch(`/api/comets/${comet.id}`, {
        method: 'PATCH',
        body: JSON.stringify(comet)
    });
    const data = await req.json();
    const responseComet = data.comet;

    dispatch(receiveComet(responseComet));
}

export const deleteComet = cometId => async (dispatch) => {
    const req = await csrfFetch(`/api/comets/${cometId}`, {
        method: 'DELETE',
    });

    dispatch(removeComet(cometId));
}

//Selectors
export const getComets = state => {
    if (state?.comets) {
        return state.comets;
    } else return null;
}

//Reducer
const cometsReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_COMET:
            return {
                ...newState, [action.comet.id]: action.comet
            };
        case RECEIVE_COMETS:
            const orderedComets = action.comets.reduce((acc, comet) => {
                acc[comet.id] = comet;
                return acc;
            }, {});

            return {
                ...newState, ...orderedComets
            };
        case REMOVE_COMET:
            delete newState[action.cometId];
            return newState;
        default:
            return state;
    };
};

export default cometsReducer