import { csrfFetch } from "./csrf";

//Action Types
export const RECEIVE_USER = 'users/RECEIVE_USER';
export const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const REMOVE_USER = 'users/REMOVE_USER';
export const RECEIVE_STARRED_TALES = 'users/RECEIVE_STARRED_TALES';

//Action Creators
export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})

export const removeUser = userId => ({
    type: REMOVE_USER,
    userId
})

export const receiveStarredTales = (userId, starredTales) => ({
    type: RECEIVE_STARRED_TALES,
    userId,
    starredTales
})

//Thunk Action Creators
export const fetchUser = userId => async(dispatch) => {
    const req = await csrfFetch(`/api/users/${userId}`);
    const data = await req.json();
    let user = data.user;

    if (user) { dispatch(receiveUser(user)) };
}

export const fetchUsers = () => async (dispatch) => {
    const req = await csrfFetch(`/api/users`);
    const data = await req.json();
    let users = data;

    if (users) { dispatch(receiveUsers(users)) };
}

export const fetchStarredTales = userId => async (dispatch) => {
    const req = await csrfFetch(`/api/users/${userId}/starred_tales`);
    const data = await req.json();
    let starredTales = data;

    if (starredTales) { dispatch(receiveStarredTales(userId, starredTales)) };
}

export const createUser = user => async(dispatch) => {
    const req = await csrfFetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await req.json();
    const responseUser = data.user;

    sessionStorage.setItem('currentUser', JSON.stringify(responseUser));

    dispatch(receiveUser(responseUser));
}

export const updateUser = user => async(dispatch) => {
    const req = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user)
    });
    const data = await req.json();
    const responseUser = data.user;

    dispatch(receiveUser(responseUser));
}

export const deleteUser = userId => async (dispatch) => {
    const req = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE',
    });

    dispatch(removeUser(userId));
}

export const loginUser = user => async (dispatch) => {
    const req = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await req.json();
    const responseUser = data.user;

    sessionStorage.setItem('currentUser', JSON.stringify(responseUser));

    dispatch(receiveUser(responseUser));
}

export const logoutUser = userId => async (dispatch) => {
    const req = await csrfFetch(`/api/session`, {
        method: 'DELETE'
    });

    sessionStorage.setItem('currentUser', null);

    dispatch(removeUser(userId));
}

export const loginUserAndRedirect = (user, url, history) => async (dispatch) => {
    await dispatch(loginUser(user));
    history.push(url);
}

//Selectors
export const getUser = userId => state => {
    return state.users ? state.users[userId] : null;
}

export const getUsers = state => {
    if (state?.users) {
        return state.users;
    } else return null;
}

export const getStarredTales = userId => state => {
    if (state?.users[userId]?.starredTales) {
        return state.users[userId].starredTales;
    } else return null;
}

//Reducer
const usersReducer = ( state = {}, action ) => {
    let newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            return {
                ...newState, [action.user.id]: action.user
            };
        case RECEIVE_USERS:
            const orderedUsers = action.users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});

            return {
                ...newState, ...orderedUsers
            };
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
        case RECEIVE_STARRED_TALES:
            const starredTales = []

            for (const starredTale in action.starredTales) {
                starredTales.push(action.starredTales[starredTale])
            }

            return {
                ...newState[action.userId].starredTales = starredTales
            };
    };
};

export default usersReducer