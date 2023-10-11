import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './PriceBreakdownModal.module.css'

const PriceBreakdownModal = ({ price, nights, range }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [totalBasePrice, setTotalBasePrice] = useState(0)

  useEffect(() => {
    if (range.from){
      let rangeDates = [];
      for (let i = 0; i < (range.to.day - range.from.day); i++){
        rangeDates.push(`${range.from.month}/${range.from.day + i}/${range.from.year}`)
      }
      setDates(rangeDates)
    } else {
      setDates([])
    }
  }, [range])

  useEffect(() => {
    setTotalBasePrice(price * nights)
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
      // overflow: 'auto',
      // overflowX: 'hidden'
    },
  };

  return (
    <>
      <span className={styles.modalOpenSpan} onClick={setModalIsOpenToTrue} >${price} x {nights} nights</span>
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
            {dates.map((date) => (
              <div>
              <span>{date}</span>
              <span>${(price)}</span>
              </div>
            ))}
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