import { useState } from "react";
import { NavLink } from "react-router-dom";
import {states} from './states'
import styles from './AboutHaunt.module.css'
import { useEffect } from "react";

const AboutHaunt = ({ street, setStreet, city, setCity, state, setState, zip_code, setZip_code }) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (street && city && state && zip_code){
      setDisabled(false);
    }
  }, [street, city, state, zip_code])

  const addToLocal = () => {
    localStorage.setItem('street', street);
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
    localStorage.setItem('zip_code', zip_code);
  }

  return (
    <div id={styles.aboutContainer}>
      <div id={styles.formWrapper}>
        <header id={styles.formHeader}>
          <h1>Tell us where your haunt is located</h1>
          <span>Your address is only shared with guests after they’ve made a reservation.</span>
        </header>
        <form id={styles.aboutForm}>
          <input
            placeholder="Street Address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div id={styles.locationWrapper}>
          <select
            id={styles.select}
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value=''>State</option>
            {states.map(statestring => (
              <option value={statestring}>{statestring}</option>
            ))}
          </select>
          <input
            placeholder="ZIP code"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
          />
          </div>
        </form>
        <h2>todo: add google map</h2>
      </div>
      <footer id={styles.footer}>
        {!disabled && <NavLink onClick={addToLocal} className={styles.navlink} to='/host/floor-plan'>Next</NavLink>}
      </footer>
    </div>
  )
}

export default AboutHaunt;