import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from './Navigation.module.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  return (
    <nav id={styles.nav}>
      <div className={styles.logoContainer}>
        <NavLink to='/'><img className={styles.logo} src='https://i.ibb.co/QCqyySJ/logo.png' /></NavLink>
        <NavLink className={styles.logoText} exact to="/">Scarebnb</NavLink>
      </div>
      <div className={styles.searchContainer}>
      <input id={styles.searchBar} type='search' placeholder='Search For A Haunt'  />
      <span id={styles.searchButton} class="material-symbols-outlined">search</span>
      </div>
      <ProfileButton isLoaded={isLoaded} user={sessionUser} />
    </nav>
  );
}

export default Navigation;