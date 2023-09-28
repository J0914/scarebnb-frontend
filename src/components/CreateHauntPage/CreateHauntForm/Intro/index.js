import { NavLink } from "react-router-dom";
import styles from './Intro.module.css';

const Intro = () => {

  return (
    <div id={styles.introContainer}>
      <div id={styles.h1Container}>
        <h1 id={styles.h1}>It's easy to get started on Scarebnb</h1>
      </div>
      <div id={styles.listContainer}>
        <ol id={styles.list}>
          <li className={styles.listItem} id={styles.listItem1}>
            <div>
            <h2>Tell us about your haunt</h2>
            <p>Share some basic info like where it is and how many guests can stay.</p>
            </div>
            <img src="https://i.ibb.co/db1txQx/bookshelf.png" />
          </li>
          <li className={styles.listItem} id={styles.listItem2}>
            <div>
            <h2>Make it stand out</h2>
            <p>Add 5 or more photos plus a title and description--we'll help you out.</p>
            </div>
            <img src="https://i.ibb.co/BVj8jvD/desk.png" />
          </li>
          <li className={styles.listItem} id={styles.listItem3}>
            <div>
            <h2>Finish up and publish</h2>
            <p>Verify your information is correct, set a starting price and publish your listing.</p>
            </div>
            <img src="https://i.ibb.co/fCF4Lyz/wallhanging.png" />
          </li>
        </ol>
      </div>
      <footer id={styles.footer}>
        <NavLink className={styles.navlink} to='/host/about-your-haunt'>Get Started</NavLink>
      </footer>
    </div>
  )
}

export default Intro;