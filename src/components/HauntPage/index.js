import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import styles from './HauntPage.module.css'
import DescriptionModal from './DescriptionModal';
import CalendarView from './Calendar';
import BookingSidebar from './BookingSidebar';
import Review from './Review';
import { getHauntBookings } from '../../store/bookings';

const HauntPage = ({ setIsHosting }) => {
  const { hauntId } = useParams();
  const selectedHaunt = useSelector(state => state.haunts[hauntId])
  const [haunt, setHaunt] = useState(selectedHaunt)
  const [selectedDayRange, setSelectedDayRange] = useState(JSON.parse(localStorage.getItem('selectedDayRange')) || { from: null, to: null })
  const [nights, setNights] = useState([])
  const dispatch = useDispatch();
  const calendarRef = useRef(null)

  useEffect(() => {
    setIsHosting(false)
    dispatch(getHauntBookings(hauntId))
  }, [])

  useEffect(() => {
    setHaunt(selectedHaunt);
  }, [selectedHaunt])

  useEffect(() => {
    if (selectedDayRange.to && selectedDayRange.from) {
      const days = [];
      let date = new Date(`${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`);
      let end = new Date(`${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`)
      while (date.getDate() !== end.getDate() + 1) {
        days.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        let tomorrow = date;
        tomorrow.setDate(tomorrow.getDate() + 1)
        console.log('tomorrow', tomorrow)
        date = tomorrow;
      }
      setNights(days)
    } else setNights([])
  }, [selectedDayRange])

  const handleScrollClick = () => {
    calendarRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  if (!selectedHaunt) {
    return <Redirect to='/page-not-found' />
  }

  return (

    <div id={styles.pageWrapper}>
      <div id={styles.body}>
        <header id={styles.header}>
          <div id={styles.headerInfo}>
            <h1 id={styles.headerTitle}>{haunt.title}</h1>
            <span id={styles.headerReviews}>{haunt.Reviews.length} reviews</span>
            <span id={styles.headerLocation}>{haunt.city}, {haunt.state}</span>
          </div>
          <div id={styles.favoriteContainer}>
            <span className="material-symbols-outlined">heart_plus</span>
            <span>Save</span>
          </div>
        </header>
        <div id={styles.imagesContainer}>
          <div className={styles.images} id={styles.first} style={{ backgroundImage: `url(${haunt.Images[0].url})` }}></div>
          <div className={styles.images} id={styles.second} style={{ backgroundImage: `url(${haunt.Images[1].url})` }}></div>
          <div className={styles.images} id={styles.third} style={{ backgroundImage: `url(${haunt.Images[2].url})` }}></div>
          <div className={styles.images} id={styles.fourth} style={{ backgroundImage: `url(${haunt.Images[3].url})` }}></div>
          <div className={styles.images} id={styles.fifth} style={{ backgroundImage: `url(${haunt.Images[4].url})` }}></div>
        </div>
        <div id={styles.midContainer}>
          <div id={styles.leftMid}>
            <div id={styles.hauntInfo}>
              <span id={styles.hostedBy}>Entire haunt hosted by {haunt.User.first_name}</span>
              <span>{haunt.max_guests} {haunt.max_guests > 1 ? 'guests' : 'guest'} • {haunt.bedrooms} {haunt.bedrooms > 1 ? 'bedrooms' : 'bedroom'} • {haunt.beds} {haunt.beds > 1 ? 'beds' : 'bed'} • {haunt.bathrooms} {haunt.bathrooms > 1 ? 'baths' : 'bath'} </span>
              <div id={styles.hauntDescription}>
                <p id={styles.description}>{haunt.description}</p>
                <DescriptionModal description={haunt.description} />
              </div>
            </div>
            <div ref={calendarRef} id={styles.dateContainer}>
              <CalendarView nights={nights} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />
            </div>
          </div>
          <div id={styles.rightMid}>
            <BookingSidebar handleScrollClick={handleScrollClick} nights={nights} range={selectedDayRange} haunt={haunt} />
          </div>
        </div>
        <div id={styles.reviewContainer}>
          {/* <span>{haunt.Reviews.length} reviews</span> */}
          {haunt.Reviews.slice(0, 6).map(review => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>

  )
};

export default HauntPage;