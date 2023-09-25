import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import styles from './Navigation.module.css'
import Modal from 'react-modal'


const ProfileButton = ({ user, isLoaded }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const handleLogout = () => {
    dispatch(sessionActions.logoutUser())
    setModalIsOpen(false)
  }

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
    );
  } else {
    sessionLinks = (
      <>
        <SignupFormModal setParentIsOpen={setModalIsOpen} />
        <LoginFormModal setParentIsOpen={setModalIsOpen} />
      </>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <span onClick={setModalIsOpenToTrue} id={styles.menuButton} class="material-symbols-outlined">menu</span>
      <span onClick={setModalIsOpenToTrue} id={styles.profileButton} class="material-symbols-outlined">account_circle</span>
      <Modal
        isOpen={modalIsOpen}
        className={styles.modalStyle}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        {isLoaded && sessionLinks}
      </Modal>
    </div>
  )

};

export default ProfileButton;

