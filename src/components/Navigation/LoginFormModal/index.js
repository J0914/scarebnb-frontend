import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import styles from './LoginForm.module.css'

const LoginFormModal = ({ setParentIsOpen }) => {
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
      borderRadius: '10px'
    },
  };

  return (
    <>
      <button className={styles.loginButton} onClick={setModalIsOpenToTrue} >Login</button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div id={styles.formHeader}>
          <span onClick={setModalIsOpenToFalse} className="material-symbols-outlined">close</span>
        <span id={styles.login}>Login</span>
        </div>
        <LoginForm setParentIsOpen={setParentIsOpen}/>
      </Modal>
    </>
  )
};

export default LoginFormModal;