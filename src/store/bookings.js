import csrfFetch from "./csrf";

const ADDHAUNTBOOKINGS = '/bookings/ADDHAUNTBOOKINGS'
const ADDUSERBOOKINGS = '/bookings/ADDUSERBOOKINGS'

const addHauntBookings = (bookings) => ({
  type: ADDHAUNTBOOKINGS,
  bookings
})

const addUserBookings = (bookings) => ({
  type: ADDUSERBOOKINGS,
  bookings
})

export const getHauntBookings = (hauntId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/haunt/${hauntId}`);

  if (res.ok){
    const bookings = await res.json();
    dispatch(addHauntBookings(bookings));
  }
}

export const getUserBookings = () => async dispatch => {
  const res = await csrfFetch('/api/bookings');

  if (res.ok){
    const bookings = await res.json();
    dispatch(addUserBookings(bookings))
  }
}


const bookingReducer = (state = {haunt: {}, user: {}}, action) => {
  switch (action.type){
    case ADDHAUNTBOOKINGS: {
      const newState = {...state, haunt: {}};
      if (action.bookings.length > 0){
        action.bookings.forEach(booking => {
          newState.haunt[booking.id] = booking;
        });
      } 
      return newState;
    }
    case ADDUSERBOOKINGS: {
      const newState = {...state, user: {}};
      if (action.bookings.length > 0){
        action.bookings.forEach(booking => {
          newState.user[booking.id] = booking;
        });
      }
      return newState;
    }
    default:
      return state;
  };
};

export default bookingReducer;