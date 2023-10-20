import React, { useState } from 'react';
import Modal from 'react-modal';
import ReviewForm from './ReviewForm';
import styles from './ReviewForm.module.css'

const ReviewModal = ({hauntId, review, hasReviewed, setHasReviewed}) => {
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
      height: 'fit-content',
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px'
    },
  };

  return (
    <>
      <button className={styles.reviewButton} onClick={setModalIsOpenToTrue} >{hasReviewed ? 'Edit review' : 'Leave a review'}</button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <div id={styles.formHeader}>
          <button onClick={setModalIsOpenToFalse} className="material-symbols-outlined">close</button>
        <span id={styles.reviewHeader}>How was your stay?</span>
        </div>
        <ReviewForm hasReviewed={hasReviewed} setHasReviewed={setHasReviewed} setModalIsOpen={setModalIsOpen} hauntId={hauntId} review={review} />
      </Modal>
    </>
  )
};

export default ReviewModal;