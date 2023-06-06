// import { csrfFetch } from "./csrf";

// //Action Types
// export const RECEIVE_LOADING = 'users/RECEIVE_LOADING';

// //Action Creators
// export const receiveUser = user => ({
//     type: RECEIVE_USER,
//     user
// })

// //Thunk Action Creators
// export const fetchUser = userId => async (dispatch) => {
//     const req = await csrfFetch(`/api/users/${userId}`);
//     const data = await req.json();
//     let user = data.user;

//     if (user) { dispatch(receiveUser(user)) };
// }

// export const createUser = user => async (dispatch) => {
//     console.log(user)
//     const req = await csrfFetch(`/api/users`, {
//         method: 'POST',
//         body: JSON.stringify(user)
//     });
//     const data = await req.json();
//     const responseUser = data.user;

//     sessionStorage.setItem('currentUser', JSON.stringify(responseUser));

//     dispatch(receiveUser(responseUser));
// }

// export const updateUser = user => async (dispatch) => {
//     console.log(user)
//     const req = await csrfFetch(`/api/users/${user.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify(user)
//     });
//     const data = await req.json();
//     const responseUser = data.user;

//     dispatch(receiveUser(responseUser));
// }

// export const deleteUser = userId => async (dispatch) => {
//     const req = await csrfFetch(`/api/users/${userId}`, {
//         method: 'DELETE',
//     });

//     dispatch(removeUser(userId));
// }

// export const loginUser = user => async (dispatch) => {
//     const req = await csrfFetch(`/api/session`, {
//         method: 'POST',
//         body: JSON.stringify(user)
//     });
//     const data = await req.json();
//     const responseUser = data.user;

//     sessionStorage.setItem('currentUser', JSON.stringify(responseUser));

//     dispatch(receiveUser(responseUser));
// }

// export const logoutUser = userId => async (dispatch) => {
//     const req = await csrfFetch(`/api/session`, {
//         method: 'DELETE'
//     });

//     sessionStorage.setItem('currentUser', null);

//     dispatch(removeUser(userId));
// }

// export const loginUserAndRedirect = (user, url, history) => async (dispatch) => {
//     await dispatch(loginUser(user));
//     history.push(url);
// }

// //Selectors
// export const getUser = userId => state => {
//     return state.users ? state.users[userId] : null;
// }

// export const getUsers = state => {
//     const users = [];

//     for (const user in state.users) {
//         users.push(state.users[user]);
//     }

//     return users;
// }

// //Reducer
// const usersReducer = (state = {}, action) => {
//     let newState = { ...state };

//     switch (action.type) {
//         case RECEIVE_USER:
//             return {
//                 ...newState, [action.user.id]: action.user
//             };
//         case RECEIVE_USERS:
//             return {
//                 ...newState, ...action.users
//             };
//         case REMOVE_USER:
//             delete newState[action.userId];
//             return newState;
//         default:
//             return state;
//     };
// };

// export default usersReducer