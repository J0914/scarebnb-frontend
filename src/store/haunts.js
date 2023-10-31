import csrfFetch from "./csrf";

const ADDHAUNTS = '/haunts/ADDHAUNTS'
const ADDSINGLE = '/haunts/ADDSINGLE'

const addAllHaunts = (haunts) => ({
  type: ADDHAUNTS,
  haunts
});

const addSingleHaunt = (haunt) => ({
  type: ADDSINGLE,
  haunt
})

export const getAllHaunts = () => async dispatch => {
  const res = await csrfFetch('/api/haunts');
  if (res.ok){
    const haunts = await res.json();
    dispatch(addAllHaunts(haunts));
  }
};

export const createHaunt = (haunt) => async dispatch => {
  const hauntRes = await csrfFetch('/api/haunts', {
    method: 'POST',
    body: JSON.stringify(haunt)
  })
  
  if (hauntRes.ok){
    const newHaunt = await hauntRes.json();
    dispatch(addSingleHaunt(newHaunt))
    return newHaunt;
  }
};

const hauntReducer = (state = {}, action) => {
  switch (action.type){
    case ADDHAUNTS:{
      const newState = {...state}
      action.haunts.forEach(haunt => {
        newState[haunt.id] = haunt;
      });
      return newState;
    }
    case ADDSINGLE:{
      const newState = {...state};
      if (newState[action.haunt.id]){
        delete newState[action.haunt.id];
      }
      newState[action.haunt.id] = action.haunt;
      return newState;
    }
    default:
      return state;
  };
};

export default hauntReducer;