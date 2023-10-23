import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import BookingView from "./BookingView";
import styles from './Account.module.css'

const AccountPage = ({ setIsHosting }) => {
  const userBookings = useSelector(state => state.bookings.user)
  const [bookings, setBookings] = useState(userBookings)
  console.log(userBookings)

  useEffect(() => {
    setIsHosting(false);
  }, [])

  useEffect(() => {
    setBookings(userBookings)
  }, [userBookings])

  let upcomingTripContent = () => {
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
          <div className={styles.tripView}>
            {bookings.map(booking => {
              const today = new Date();
              const checkout = new Date(booking.check_out)
              if (today < checkout) {
                return <BookingView booking={booking} />
              }
            })}
          </div>
        </div>
      )
    }
  }

  let completedTripContent = () => {
    if (!userBookings) {
      return (
        <div>
          <span>You haven't taken any trips yet!</span>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Completed Trips</h3>
          <div className={styles.tripView}>
            {userBookings.map(booking => {
              const today = new Date();
              const checkout = new Date(booking.check_out)
              if (today >= checkout) {
                return (
                  <div>
                    <BookingView booking={booking} />
                  </div>
                )
              }
            })}
          </div>
        </div>
      )
    }
  }


  return (
    <div id={styles.body}>
      <header>
        <h2>Trips</h2>
      </header>
      <div >
        {upcomingTripContent()}
        {completedTripContent()}
      </div>
    </div>
  )
};

export default AccountPage;