import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from './BookingView.module.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ReviewModal from "../ReviewModal";



const BookingView = ({ booking }) => {
  const [checkinYear, setCheckinYear] = useState('')
  const [checkinMonth, setCheckinMonth] = useState('');
  const [checkinDay, setCheckinDay] = useState('');
  const [checkoutYear, setCheckoutYear] = useState('')
  const [checkoutMonth, setCheckoutMonth] = useState('');
  const [checkoutDay, setCheckoutDay] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [review, setReview] = useState(null)
  const haunt = useSelector(state => state.haunts[booking.hauntId])
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    if (booking) {
      const today = new Date();
      const checkinDate = new Date(booking.check_in)
      const checkoutDate = new Date(booking.check_out)
      setCheckinYear(booking.check_in.slice(0, 4))
      setCheckinMonth(checkinDate.toLocaleString('default', { month: 'short' }))
      setCheckinDay(booking.check_in.slice(8, 10))
      setCheckoutYear(booking.check_out.slice(0, 4))
      setCheckoutMonth(checkoutDate.toLocaleString('default', { month: 'short' }))
      setCheckoutDay(booking.check_out.slice(8, 10))

      if (today >= checkoutDate) setIsCompleted(true)
    }
  }, [booking])

  useEffect(() => {
    setReview(null)
    setHasReviewed(false)

    haunt.Reviews.forEach(review => {
      if (review.User.id === sessionUser.id){
        setHasReviewed(true);
        setReview(review)
      } 
    })
    
  }, [haunt, hasReviewed])

  // have to refresh to change review button and create not complete


  return (
    <div id={styles.bookingViewContainer}>
    <NavLink id={styles.navLink} to={`/haunts/${haunt.id}`}>
      <div id={styles.BookingView}>
        <img id={styles.img} src={haunt.Images[0].url} />
        <div id={styles.details}>
          <span id={styles.city}>{haunt.city}</span>
          <span className={styles.span}>Hosted by {haunt.User.first_name}</span>
          <span className={styles.span}>{checkinMonth} {checkinDay}{checkinYear !== checkoutYear ? `, ${checkinYear}` : null}-{checkinMonth !== checkoutMonth ? `${checkoutMonth} ` : null}{checkoutDay}, {checkoutYear}</span>
        </div>
      </div>
    </NavLink>
    {isCompleted && <ReviewModal hauntId={booking.hauntId} review={review} hasReviewed={hasReviewed} setHasReviewed={setHasReviewed} />}
    </div>
  )
};

export default BookingView;