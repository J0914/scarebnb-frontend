import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './AddImages.module.css';

const AddImages = ({ setImages }) => {
  const [preview, setPreview] = useState([])
  const [disabled, setDisabled] = useState(true);

  const updateFiles = (e) => {
    const files = e.target.files;
    setImages(files);
    const prev = [];
    for (let i = 0; i < files.length; i++) {
      prev.push(URL.createObjectURL(files[i]))
    }
    setPreview(prev)
  };

  useEffect(() => {
    if (preview.length > 4) {
      setDisabled(false)
    }
  }, [preview])



  return (
    <div id={styles.imagesContainer}>
      <div id={styles.formWrapper}>
        <header id={styles.formHeader}>
          <h1>Add some photos of your haunt</h1>
          <span>You'll need at least 5 photos to get started (jpg or png)</span>
        </header>
        <div id={styles.form}>
          <div id={styles.previewContainer}>
            {preview.length > 0 ?
                <div id={styles.preview}>
              {preview.map((url, i) => (
                <img 
                  key={i}
                  style={{ width: '300px', margin: '5px' }} 
                  src={url} 
                  alt='preview image' 
                  />
                ))}
              </div>
              :
              <div id={styles.noPreview}>
                <img src="https://i.ibb.co/KbjzgWp/hearts.png" />
                Make sure you choose your desired cover photo first.
              </div>
            }
          </div>
          {/* {preview && <img src={preview} />} */}
          {<label className={styles.fileButton} htmlFor="upload">{preview.length > 0 ? 'Re-select Images' : 'Select Images'}</label>}
          <input
            id='upload'
            type="file"
            name="images"
            multiple
            accept=".png, .jpg"
            onChange={updateFiles}
          ></input>
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