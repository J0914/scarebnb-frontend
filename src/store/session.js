import csrfFetch from "./csrf";

const LOGIN = '/session/LOGIN';
const LOGOUT = '/session/LOGOUT'

const setUser = (user) => ({
  type: LOGIN,
  user
})

const removeUser = () => ({
  type: LOGOUT
})

export const signupUser = (user) => async dispatch => {
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  if (res.ok){
    const user = await res.json();
    dispatch(setUser(user));
    return true;
  } else return false;
};

export const loginUser = (credentials) => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  if (res.ok) {
    const user = await res.json();
    dispatch(setUser(user));
    return true;
  } else return false;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logoutUser = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(removeUser())
  }
};



const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN: {
      const newState = { ...state };
      newState.user = action.user;
      return newState;
    }
    case LOGOUT: {
      const newState = { ...state };
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
}

export default sessionReducer;