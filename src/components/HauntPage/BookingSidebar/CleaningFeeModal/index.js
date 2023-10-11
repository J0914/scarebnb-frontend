import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './CleaningFeeModal.module.css'

const CleaningFeeModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      position: 'relative',
      margin: 'auto auto',
      height: '20',
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      top: '40%',
      // overflow: 'auto',
      // overflowX: 'hidden'
    },
  };

  return (
    <>
      <span onClick={setModalIsOpenToTrue} >Cleaning fee</span>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div id={styles.content}>
        <span onClick={setModalIsOpenToFalse} className="material-symbols-outlined">close</span>
        <div>
          <span>One-time fee charged by host to cover the cost of cleaning their space.</span>
        </div>
        </div>
      </Modal>
    </>
  )
};

export default CleaningFeeModal;