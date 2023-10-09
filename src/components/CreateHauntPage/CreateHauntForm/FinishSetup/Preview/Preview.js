import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './Preview.module.css'
import Slideshow from '../../../../HomePage/HauntCard/Slideshow'


const Preview = ({ title, description, city, state, max_guests, bedrooms, beds, bathrooms, images }) => {
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
      width: '500px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px',
      overflow: 'auto',
      overflowX: 'hidden'
    },
  };

  return (
    <>
      <span className={styles.previewButton} onClick={setModalIsOpenToTrue} >View Preview</span>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div id={styles.previewHeader}>
          <span onClick={setModalIsOpenToFalse} className="material-symbols-outlined">close</span>
          <span id={styles.header}>Preview</span>
        </div>
        <div id={styles.titleContainer}>
          <span>{title}</span>
        </div>
        <div id={styles.slideshowContainer}>
          {images ? <Slideshow
            isPreview={true}
            images={images} />
            :
            'Sorry, please re-select images :('}
        </div>
        <div id={styles.info}>
        <span>{city} {state}</span>
        <span>{max_guests} {max_guests > 1 ? 'guests' : 'guest'} • {bedrooms} {bedrooms > 1 ? 'bedrooms' : 'bedroom'} • {beds} {beds > 1 ? 'beds' : 'bed'} • {bathrooms} {bathrooms > 1 ? 'baths' : 'bath'} </span>
        </div>
        <div id={styles.description}>
          <p>{description}</p>
        </div>
      </Modal>
    </>
  )
};

export default Preview;