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
    const newHaunt = hauntRes.json();
    const imagesRes = await csrfFetch(`/api/images/multiple/${newHaunt.id}`, {
      method: 'POST',
      body: JSON.stringify(haunt.images)
    });

    if (imagesRes.ok){
      const finalHaunt = imagesRes.json();
      dispatch(addSingleHaunt(finalHaunt))
    }
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
    case ADDSINGLE:{
      const newState = {...state};
      newState[action.haunt.id] = action.haunt;
      return newState;
    }
    default:
      return state;
  };
};

export default hauntReducer;