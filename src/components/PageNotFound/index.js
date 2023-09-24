import { NavLink } from 'react-router-dom';
import styles from './PageNotFound.module.css'
const PageNotFound = () => {


  return (
    <div id={styles.pageNotFound}>
      <img className={styles.image} src="https://i.ibb.co/rZGWrQb/sweat.png" alt="whoops" />
      <p className={styles.notFound}>Whoops! This page doesn't exist..</p>
      <NavLink className={styles.navlink} to='/'>This one does though!</NavLink>
    </div>
  )
};

export default PageNotFound;