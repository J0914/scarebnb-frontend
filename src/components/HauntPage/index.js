import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './HauntPage.module.css'
import { images } from '../../mockimages/images'
import DescriptionModal from './DescriptionModal';
import Review from './Review';

const HauntPage = () => {
  const { hauntId } = useParams();
  const selectedHaunt = useSelector(state => state.haunts.allHaunts[hauntId])
  const [haunt, setHaunt] = useState(selectedHaunt)
  const imageRef = useRef();
  haunt.Images = images;

  useEffect(() => {
    setHaunt(selectedHaunt);
  }, [selectedHaunt])

  

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
          <img className={styles.images} id={styles.first} src={haunt.Images[0].url} ref={imageRef} />
          <img className={styles.images} id={styles.second} src={haunt.Images[1].url} ref={imageRef} />
          <img className={styles.images} id={styles.third} src={haunt.Images[2].url} ref={imageRef} />
          <img className={styles.images} id={styles.fourth} src={haunt.Images[3].url} ref={imageRef} />
          <img className={styles.images} id={styles.fifth} src={haunt.Images[4].url} ref={imageRef} />
        </div>
        <div id={styles.hauntInfo}>
          <span>Entire haunt hosted by {haunt.User.first_name}</span>
          <span>{haunt.max_guests} guests • {haunt.bedrooms} bedroom(s) • {haunt.beds} beds • {haunt.bathrooms} bathroom(s) </span>
          <div id={styles.hauntDescription}>
            <p id={styles.description}>{haunt.description}</p>
            <DescriptionModal description={haunt.description}/>
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