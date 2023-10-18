import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import BookingView from "./BookingView";

const AccountPage = ({ setIsHosting }) => {
  const userBookings = useSelector(state => state.bookings.user)
  console.log(userBookings)

  useEffect(() => {
    setIsHosting(false);
  }, [])

  let tripContent = () => {
    if (!userBookings) {
      return (
        <div>
          <span>No trips booked... yet!</span>
          <NavLink to='/'>Start searching</NavLink>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Upcoming Trips</h3>
          <div>
            {userBookings.map(booking => (
              <BookingView booking={booking} />
            ))}
          </div>
        </div>
      )
    }

  }


  return (
    <div>
      <header>
        <h2>Trips</h2>
      </header>
      <div>
        {tripContent()}
      </div>
    </div>
  )
};

export default AccountPage;