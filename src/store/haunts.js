import csrfFetch from "./csrf";

const ADDHAUNTS = '/haunts/ADDHAUNTS'

const addAllHaunts = (haunts) => ({
  type: ADDHAUNTS,
  haunts
});

export const getAllHaunts = () => async dispatch => {
  const res = await csrfFetch('/api/haunts');
  if (res.ok){
    const haunts = await res.json();
    dispatch(addAllHaunts(haunts));
  }
};


const hauntReducer = (state = {allHaunts: {}}, action) => {
  switch (action.type){
    case ADDHAUNTS:{
      const newState = {...state}
      action.haunts.forEach(haunt => {
        newState.allHaunts[haunt.id] = haunt;
      });
      return newState;
    }
    default:
      return state;
  };
};

export default hauntReducer;