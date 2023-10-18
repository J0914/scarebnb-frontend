import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './PriceBreakdownModal.module.css'

const PriceBreakdownModal = ({ price, nights }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalBasePrice, setTotalBasePrice] = useState(0)
  console.log('nights in pricebreakdown', nights)

  useEffect(() => {
    setTotalBasePrice(price * (nights.length -1))
  }, [price, nights])

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
    },
  };

  return (
    <>
      <span className={styles.modalOpenSpan} onClick={setModalIsOpenToTrue} >${price} x {nights.length - 1 || 1} nights</span>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={setModalIsOpenToFalse}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <div>
          <div id={styles.modalHeader}>
            <span onClick={setModalIsOpenToFalse} className="material-symbols-outlined">close</span>
            <span>Base Price Breakdown</span>
          </div>
          <div id={styles.breakdownContainer}>
            {nights.map((date) => (
              <div>
              <span>{date}</span>
              <span>${(price)}</span>
              </div>
            )).slice(0, nights.length - 1)}
          </div>
          <div id={styles.breakdownFooter}>
            <span>Total Base Price</span>
            <span>${totalBasePrice}</span>
          </div>
        </div>
      </Modal>
    </>
  )
};

export default PriceBreakdownModal;