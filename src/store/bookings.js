import csrfFetch from "./csrf";

const ADDHAUNTBOOKINGS = '/bookings/ADDHAUNTBOOKINGS'
const ADDUSERBOOKINGS = '/bookings/ADDUSERBOOKINGS'
const ADDSINGLEBOOKING = '/bookings/ADDSINGLEBOOKING'
const DELETEBOOKING = '/bookings/DELETEBOOKING'

const addHauntBookings = (bookings) => ({
  type: ADDHAUNTBOOKINGS,
  bookings
})

const addUserBookings = (bookings) => ({
  type: ADDUSERBOOKINGS,
  bookings
})

const addSingleBooking = (booking) => ({
  type: ADDSINGLEBOOKING,
  booking
})

const deleteABooking = (bookingId) => ({
  type: DELETEBOOKING,
  bookingId
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

export const createBooking = (booking) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${booking.hauntId}`, {
    method: 'POST',
    body: JSON.stringify(booking)
  });

  if (res.ok){
    const newBooking = await res.json();
    dispatch(addSingleBooking(newBooking))
  }
}

export const deleteBooking = (bookingId) => async dispatch => {
  const res = await csrfFetch(`api/bookings/${bookingId}`, {
    method: 'DELETE'
  })

  if (res.ok){
    dispatch(deleteABooking(bookingId))
  }
}


const bookingReducer = (state = {haunt: {}, user: []}, action) => {
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
      const newState = {...state, user: []};
      newState.user = action.bookings
      return newState;
    }
    case ADDSINGLEBOOKING: {
      const newState = {...state};
      if (!newState.user[action.booking.id]){
        newState.user[action.booking.id] = action.booking;
      }
      return newState;
    }
    case DELETEBOOKING: {
      const newState = {...state};
      delete newState[action.bookingId];
      return newState;
    }
    default:
      return state;
  };
};

export default bookingReducer;