import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './ServiceFeeModal.module.css'

const ServiceFeeModal = () => {
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
      <span onClick={setModalIsOpenToTrue} >Scarebnb service fee</span>
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
          <span>This helps us run our platform and offer services like 24/7 support on your trip.</span>
        </div>
        </div>
      </Modal>
    </>
  )
};

export default ServiceFeeModal;