import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from './Slideshow.module.css'

const Slideshow = ({ images, isPreview }) => {
  const [coverImage, setCoverImage] = useState(images[0].url)
  const [imgIdx, setImgIdx] = useState(0);
  const imageRef = useRef();

  console.log('coverImage', coverImage)


  const clickLeft = () => {
    if (imgIdx === 0) {
      setImgIdx(images.length - 1);
    } else {
      setImgIdx(prevNum => prevNum - 1)
    }
  }

  const clickRight = () => {
    if (imgIdx === images.length - 1) {
      setImgIdx(0);
    } else {
      setImgIdx(prevNum => prevNum + 1);
    }
  }

  useEffect(() => {
    setCoverImage(images[imgIdx].url)
  }, [imgIdx])

  return (
    <div className={styles.slideshowContainer}>
      {!isPreview ? <NavLink to={`/haunts/${images[0].hauntId}`}>
        <img className={styles.coverImage} src={coverImage} ref={imageRef} />
      </NavLink>
        :
        <img className={styles.coverImage} src={coverImage} ref={imageRef} />
      }
      <span id={styles.leftButton} onClick={clickLeft} className="material-symbols-outlined">arrow_back_ios</span>
      <span id={styles.rightButton} onClick={clickRight} className="material-symbols-outlined">arrow_forward_ios</span>
    </div>
  )
}

export default Slideshow;