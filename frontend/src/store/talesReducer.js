import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_TALE = 'tales/RECEIVE_TALE';
export const RECEIVE_TALES = 'tales/RECEIVE_TALES';
export const REMOVE_TALE = 'tales/REMOVE_TALE';

//Action Creators
export const receiveTale = tale => ({
    type: RECEIVE_TALE,
    tale
})

export const receiveTales = tales => ({
    type: RECEIVE_TALES,
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
    console.log(data) //THIS IS WHERE YOU PUT LOGIC TO FILTER OUT BY TALES THAT ARE PUBLISHED
    console.log(tales)

    if (tales) { dispatch(receiveTales(tales)) };
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

export const deleteTale = taleId => async (dispatch) => {
    const req = await csrfFetch(`/api/tales/${taleId}`, {
        method: 'DELETE',
    });

    dispatch(removeTale(taleId));
}

//Selectors
export const getTale = taleId => state => {
    return state.tales ? state.tales[taleId] : null;
}

export const getTales = state => {
    if (state?.tales) {
        const tales = [];
    
        for (const tale in state.tales) {
            tales.push(state.tales[tale]);
        }
    
        return tales;
    } else return null;
}

//Reducer
const talesReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_TALE:
            return {
                ...newState, [action.tale.id]: action.tale
            };
        case RECEIVE_TALES:
            const orderedTales = action.tales.reduce((acc, tale) => {
                acc[tale.id] = tale;
                return acc;
            }, {});

            return {
                ...newState, ...orderedTales
            };
        case REMOVE_TALE:
            delete newState[action.taleId];
            return newState;
        default:
            return state;
    };
};

export default talesReducer