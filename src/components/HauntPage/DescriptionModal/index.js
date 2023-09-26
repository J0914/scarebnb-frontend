import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './DescriptionModal.module.css'

const DescriptionModal = ({ description }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      position: 'absolute',
      margin: 'auto auto',
      height: '75%',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      overflow: 'auto',
      overflowX: 'hidden'
    },
  };

  return (
    <>
      <span className={styles.descriptionButton} onClick={setModalIsOpenToTrue} >Show More <span id={styles.rightButton} className="material-symbols-outlined">arrow_forward_ios</span></span>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div id={styles.descriptionHeader}>
          <span onClick={setModalIsOpenToFalse} className="material-symbols-outlined">close</span>
          <span id={styles.header}>About This Space</span>
        </div>
        {description}
      </Modal>
    </>
  )
};

export default DescriptionModal;