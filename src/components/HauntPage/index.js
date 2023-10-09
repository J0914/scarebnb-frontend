import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import styles from './HauntPage.module.css'
import DescriptionModal from './DescriptionModal';
import CalendarView from './Calendar';
import BookingSidebar from './BookingSidebar';
import Review from './Review';

const HauntPage = ({ setIsHosting }) => {
  const { hauntId } = useParams();
  const selectedHaunt = useSelector(state => state.haunts[hauntId])
  const [haunt, setHaunt] = useState(selectedHaunt)
  const [selectedDayRange, setSelectedDayRange] = useState(JSON.parse(localStorage.getItem('selectedDayRange')) || { from: null, to: null })

  useEffect(() => {
    setIsHosting(false)
  }, [])

  useEffect(() => {
    setHaunt(selectedHaunt);
  }, [selectedHaunt])

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
            <div id={styles.dateContainer}>
              <CalendarView selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />
            </div>
          </div>
          <div id={styles.rightMid}>
            <BookingSidebar />
          </div>
        </div>
        <div id={styles.reviewContainer}>
          {/* <span>{haunt.Reviews.length} reviews</span> */}
          {haunt.Reviews.slice(0, 5).map(review => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>

  )
};

export default HauntPage;