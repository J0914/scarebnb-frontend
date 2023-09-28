import styles from './HauntCard.module.css'
import { images } from '../../../mockimages/images';
import { useState } from 'react';
import Slideshow from './Slideshow';

const HauntCard = ({haunt}) => {
  haunt.Images = images;

  return(
    <div className={styles.hauntCard_container}>
      <Slideshow haunt={haunt}/>
      <span className={styles.location}>{haunt.city}, {haunt.state}</span>
      <span className={styles.price}>${haunt.price} night</span>
    </div>
  )
};

export default HauntCard;