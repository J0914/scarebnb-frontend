import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './AddImages.module.css';

const AddImages = ({ images, setImages }) => {
  const [url1, setUrl1] = useState('https://i.ibb.co/RT2hLzH/house2.jpg');
  const [url2, setUrl2] = useState('https://i.ibb.co/k8y1JCc/interior19.jpg');
  const [url3, setUrl3] = useState('https://i.ibb.co/Ctq7WgV/interior16.jpg');
  const [url4, setUrl4] = useState('https://i.ibb.co/Kx4H7Rm/interior13.jpg');
  const [url5, setUrl5] = useState('https://i.ibb.co/fNWVPC0/interior5.jpg');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (url1 && url2 && url3 && url4 && url5){
      const newImages = [url1, url2, url3, url4, url5]
      setImages(newImages)
    }

    if (images.length === 5){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [url1, url2, url3, url4, url5])

  return (
    <div id={styles.imagesContainer}>
      <div id={styles.formWrapper}>
        <header id={styles.formHeader}>
          <h1>Add some photos of your haunt</h1>
          <span>You'll need 5 photos to get started.</span>
          <span>(Aws Integration coming soon! If you don't have your own image urls feel free to use these!)</span>
        </header>
        <div id={styles.form}>
          <div id={styles.previewContainer}>
            <input type="text" placeholder="Image Url 1" value={url1} onChange={(e) => setUrl1(e.target.value)}/>
            <input type="text" placeholder="Image Url 2" value={url2} onChange={(e) => setUrl2(e.target.value)} />
            <input type="text" placeholder="Image Url 3" value={url3} onChange={(e) => setUrl3(e.target.value)} />
            <input type="text" placeholder="Image Url 4" value={url4} onChange={(e) => setUrl4(e.target.value)} />
            <input type="text" placeholder="Image Url 5" value={url5} onChange={(e) => setUrl5(e.target.value)} />
          </div>
        </div>
      </div>
      <footer id={styles.footer}>
        <NavLink className={styles.navlink} to='/host/floor-plan'>Back</NavLink>
        {!disabled && <NavLink className={styles.navlink} to='/host/title-description'>Next</NavLink>}
      </footer>
    </div>
  )
}

export default AddImages;