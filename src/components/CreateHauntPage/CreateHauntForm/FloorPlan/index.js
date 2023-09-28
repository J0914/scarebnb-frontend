import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import styles from './FloorPlan.module.css'
import { useEffect } from "react";

const FloorPlan = ({ max_guests, setMax_guests, bedrooms, setBedrooms, beds, setBeds, bathrooms, setBathrooms }) => {

  const increase = (e, setInput) => {
    e.preventDefault();
    setInput(prevNum => prevNum + 1)
  }

  const decrease = (e, input, setInput) => {
    e.preventDefault();
    if (input <= 1) return;
    setInput(prevNum => prevNum - 1)
  }

  return (
    <div id={styles.floorPlanContainer}>
      <div id={styles.formWrapper}>
        <header id={styles.formHeader}>
          <h1>Share some basics about your haunt</h1>
          <span>You can edit these details later, if needed.</span>
        </header>
        <form id={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor='guests'>Guests</label>
            <div className={styles.inputWrapper}>
              <button onClick={(e) => decrease(e, max_guests, setMax_guests)} className={`material-symbols-outlined ${styles.plusandminus}`}>remove</button>
              <input
                className={styles.input}
                id='guests'
                type='number'
                value={max_guests}
                readOnly
                onChange={(e) => setMax_guests(e.target.value)}
              />
              <button onClick={(e) => increase(e, setMax_guests)} className={`material-symbols-outlined ${styles.plusandminus}`}>add</button>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='bedrooms'>Bedrooms</label>

            <div className={styles.inputWrapper}>
              <button onClick={(e) => decrease(e, bedrooms, setBedrooms)} className={`material-symbols-outlined ${styles.plusandminus}`}>remove</button>
              <input
                className={styles.input}
                id='bedrooms'
                type='number'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                readOnly
              />
              <button onClick={(e) => increase(e, setBedrooms)} className={`material-symbols-outlined ${styles.plusandminus}`}>add</button>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='beds'>Beds</label>
            <div className={styles.inputWrapper}>
              <button onClick={(e) => decrease(e, beds, setBeds)} className={`material-symbols-outlined ${styles.plusandminus}`}>remove</button>
              <input
                className={styles.input}
                id='beds'
                type='number'
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                readOnly
              />
              <button onClick={(e) => increase(e, setBeds)} className={`material-symbols-outlined ${styles.plusandminus}`}>add</button>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='bathrooms'>Bathrooms</label>
            <div className={styles.inputWrapper}>
              <button onClick={(e) => decrease(e, bathrooms, setBathrooms)} className={`material-symbols-outlined ${styles.plusandminus}`}>remove</button>
              <input
                className={styles.input}
                id='bathrooms'
                type='number'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                readOnly
              />
              <button onClick={(e) => increase(e, setBathrooms)} className={`material-symbols-outlined ${styles.plusandminus}`}>add</button>
            </div>
          </div>
        </form>
      </div>
      <footer id={styles.footer}>
        <NavLink className={styles.navlink} to='/host/about-your-haunt'>Back</NavLink>
        <NavLink className={styles.navlink} to='/host/stand-out'>Next</NavLink>
      </footer>
    </div>
  )
};

export default FloorPlan;