import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from './Slideshow.module.css'

const Slideshow = ({ haunt }) => {
  const [coverImage, setCoverImage] = useState(haunt.Images[0].url)
  const [imgIdx, setImgIdx] = useState(0);
  const imageRef = useRef();

  const clickLeft = () => {
    if (imgIdx === 0) {
      setImgIdx(haunt.Images.length - 1);
    } else {
      setImgIdx(prevNum => prevNum - 1)
    }
  }

  const clickRight = () => {
    if (imgIdx === haunt.Images.length - 1) {
      setImgIdx(0);
    } else {
      setImgIdx(prevNum => prevNum + 1);
    }
  }

  useEffect(() => {
    setCoverImage(haunt.Images[imgIdx].url)
  }, [imgIdx])

  return (
    <div className={styles.slideshowContainer}>
      <NavLink to={`/${haunt.id}`}>
        <img className={styles.coverImage} src={coverImage} ref={imageRef} />
      </NavLink>
      <span id={styles.leftButton} onClick={clickLeft} className="material-symbols-outlined">arrow_back_ios</span>
      <span id={styles.rightButton} onClick={clickRight} className="material-symbols-outlined">arrow_forward_ios</span>
    </div>
  )
}

export default Slideshow;