import csrfFetch from "./csrf";

const UPDATEREVIEWS = '/reviews/UPDATEREVIEWS';
const ADDSINGLEREVIEW = '/reviews/ADDSINGLEREVIEW';
const REMOVEREVIEW = '/reviews/REMOVEREVIEW'

const updateReviews = (reviews) => ({
  type: UPDATEREVIEWS,
  reviews
})

const addSingleReview = (review) => ({
  type: ADDSINGLEREVIEW,
  review
})

const removeReview = (reviewId) => ({
  type: REMOVEREVIEW,
  reviewId
})


export const getReviews = (userId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${userId}`)

  if (res.ok) {
    const reviews = await res.json();
    dispatch(updateReviews(reviews))
  } else return res
}

export const createReview = (review) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.hauntId}`, {
    method: 'POST',
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const review = await res.json();
    dispatch(addSingleReview(review))
  } else return res
}

export const editReview = (review) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const review = await res.json();
    dispatch(addSingleReview(review))
  } else return res
}

export const deleteReview = (review) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(removeReview(review.id))
  } else return res
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATEREVIEWS: {
      const newState = { ...state };
      action.reviews.forEach(review => {
        newState[review.id] = review
      })
      return newState;
    }
    case ADDSINGLEREVIEW: {
      const newState = { ...state };
      newState[action.review.id] = action.review
      return newState;
    }
    case REMOVEREVIEW: {
      const newState = {...state};
      delete newState[action.reviewId]
      return newState;
    }
    default:
      return state;
  };
};

export default reviewReducer;