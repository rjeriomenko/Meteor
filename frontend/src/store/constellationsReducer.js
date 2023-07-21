import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_CONSTELLATIONS = 'tales/RECEIVE_CONSTELLATIONS';
export const RECEIVE_CONSTELLATION = 'tales/RECEIVE_CONSTELLATION';
export const REMOVE_CONSTELLATION = 'tales/REMOVE_CONSTELLATION';

//Action Creators
export const receiveConstellation = constellation => ({
    type: RECEIVE_CONSTELLATION,
    constellation
})

export const receiveConstellations = constellations => ({
    type: RECEIVE_CONSTELLATIONS,
    constellations
})

export const removeConstellation = constellationId => ({
    type: REMOVE_CONSTELLATION,
    constellationId
})

//Thunk Action Creators
export const fetchConstellations = () => async (dispatch) => {
    const req = await csrfFetch(`/api/constellations`);
    const data = await req.json();
    let constellations = data;

    if (constellations) { dispatch(receiveConstellations(constellations)) };
}

export const createUserConstellation = () => async (dispatch) => {
    const req = await csrfFetch(`/api/constellations/create_user`, {
        method: 'POST'
    });
    const data = await req.json();
    const responseConstellation = data.constellation;

    dispatch(receiveConstellation(responseConstellation));
}

export const createTaleConstellation = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/constellations/create_tale/${taleId}`, {
        method: 'POST'
    });
    const data = await req.json();
    const responseConstellation = data.constellation;

    dispatch(receiveConstellation(responseConstellation));
}

export const updateConstellation = constellation => async (dispatch) => {
    const req = await csrfFetch(`/api/constellations/${constellation.id}`, {
        method: 'PATCH',
        body: JSON.stringify(constellation)
    });
    const data = await req.json();
    const responseConstellation = data.constellation;

    dispatch(receiveConstellation(responseConstellation));
}

export const deleteConstellation = constellationId => async (dispatch) => {
    const req = await csrfFetch(`/api/constellations/${constellationId}`, {
        method: 'DELETE',
    });

    dispatch(removeConstellation(constellationId));
}

//Selectors
export const getConstellations = state => {
    if (state?.constellations) {
        return state.constellations;
    } else return null;
}

export const getConstellation = constellationId => state => {
    return state.constellations ? state.constellations[constellationId] : null;
}

//Reducer
const constellationsReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_CONSTELLATION:
            return {
                ...newState, [action.constellation.id]: action.constellation
            };
        case RECEIVE_CONSTELLATIONS:
            const orderedConstellations = action.constellations.reduce((acc, constellation) => {
                acc[constellation.id] = constellation;
                return acc;
            }, {});

            return {
                ...newState, ...orderedConstellations
            };
        case REMOVE_CONSTELLATION:
            delete newState[action.constellationId];
            return newState;
        default:
            return state;
    };
};

export default constellationsReducer