import { NavLink, useHistory } from "react-router-dom"
import Preview from "./Preview/Preview"
import styles from './FinishSetup.module.css'
import { useEffect, useState } from "react"
import {useDispatch } from 'react-redux'
import { createHaunt } from "../../../../store/haunts"


const FinishSetup = ({ title, description, street, city, state, zip_code, max_guests, bedrooms, beds, bathrooms, price, setPrice, images }) => {
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (title && description && street && city && state && zip_code && max_guests && bedrooms && beds && bathrooms && images && price){
      setDisabled(false)
    }
  }, [price])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newHaunt = {
      title,
      description,
      street,
      city,
      state,
      zip_code,
      max_guests,
      bedrooms,
      beds,
      bathrooms,
      images,
      price
    }

    await dispatch(createHaunt(newHaunt))
    .then((haunt) => {
      localStorage.removeItem('street')
      localStorage.removeItem('city')
      localStorage.removeItem('state')
      localStorage.removeItem('zip_code')
      localStorage.removeItem('max_guests')
      localStorage.removeItem('bedrooms')
      localStorage.removeItem('beds')
      localStorage.removeItem('bathrooms')
      localStorage.removeItem('title')
      localStorage.removeItem('description')
      localStorage.removeItem('price')
      localStorage.removeItem('images')
      history.push(`/haunts/${haunt.id}`)
    });
  }

  return (
    <div id={styles.FinishSetupWrapper}>
      <div id={styles.headerContainer}>
        <h1>Yay! It's time to publish.</h1>
        <p>Here's what we'll show to guests. Before you publish, make sure to review the details and set a price per day.</p>
      </div>
      <div id={styles.previewAndPrice}>
        <div id={styles.previewContainer}>
          <Preview
            isPreview={true}
            images={images}
            title={title}
            description={description}
            city={city}
            state={state}
            max_guests={max_guests}
            bedrooms={bedrooms}
            beds={beds}
            bathrooms={bathrooms}
          />
        </div>
        <div id={styles.priceContainer}>
          <label htmlFor="price">Set a Price per day</label>
          <input
            id="price"
            className={styles.priceInput}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div id={styles.nextContainer}>
        <h2>What's next?</h2>
        <div className={styles.listItem}>
          <h3>Keep an eye on your Calendar</h3>
          <p>Guests can start booking immediately after you publish</p>
        </div>
        <div className={styles.listItem}>
          <h3>Adjust your settings</h3>
          <p>Edit your title, description, or any other information about your haunt to personalize and make it stand out.</p>
        </div>
        <div className={styles.listItem}>
          <h3>Prepare for your first guest</h3>
          <p>Guests typically expect a clean and safe haunt. Make sure it's ready for them!</p>
        </div>
      </div>
      <footer id={styles.footer}>
        <NavLink className={styles.navlink} to='/host/title-description'>Back</NavLink>
        {!disabled && <button className={styles.navlink} onClick={handleSubmit}>Publish</button>}
      </footer>
    </div>
  )
}

export default FinishSetup;