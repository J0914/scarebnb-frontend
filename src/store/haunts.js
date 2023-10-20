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

export const createReview = (review) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.hauntId}`, {
    method: 'POST',
    body: JSON.stringify(review)
  })

  if (res.ok){
    const haunt = res.json();
    dispatch(addSingleHaunt(haunt))
    return haunt;
  } else return res
}

export const editReview = (review) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review)
  })

  if (res.ok){
    const haunt = res.json();
    dispatch(addSingleHaunt(haunt))
    return haunt;
  } else return res
}

export const deleteReview = (review) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'DELETE'
  })

  if (res.ok){
    const haunt = res.json();
    dispatch(addSingleHaunt(haunt))
    return haunt;
  } else return res
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
      newState[action.haunt.id] = action.haunt;
      return newState;
    }
    default:
      return state;
  };
};

export default hauntReducer;