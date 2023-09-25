import React, { useState } from 'react';
import Modal from 'react-modal';
import SignupForm from './SignupForm';
import styles from './SignupForm.module.css'

const SignupFormModal = ({ setParentIsOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
    setParentIsOpen(false)
  }

  const customStyles = {
    content: {
      position: 'absolute',
      margin: 'auto auto',
      height: 'fit-content',
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  return (
    <>
      <button className={styles.signupButton} onClick={setModalIsOpenToTrue} >Signup</button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
      >
        <button onClick={setModalIsOpenToFalse}>x</button>
        <SignupForm />
      </Modal>
    </>
  )
};

export default SignupFormModal;
