import styles from './HauntCard.module.css'

import Slideshow from './Slideshow';

const HauntCard = ({haunt}) => {

  return(
    <div className={styles.hauntCard_container}>
      <Slideshow haunt={haunt}/>
      <span className={styles.location}>{haunt.city}, {haunt.state}</span>
      <span className={styles.price}>${haunt.price} night</span>
    </div>
  )
};

export default HauntCard;