import { useEffect, useState } from "react";
import PriceBreakdownModal from "./PriceBreakdownModal";
import CleaningFeeModal from "./CleaningFeeModal";
import ServiceFeeModal from "./ServiceFeeModal";
import styles from './BookingSidebar.module.css'


const BookingSidebar = ({ range, haunt }) => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0)
  const [stayPrice, setStayPrice] = useState(0)
  const [cleaningFee, setCleaningFee] = useState(0);
  const [scarebnbFee, setScarebnbFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState('none')

  useEffect(() => {
    if (range.from) {
      setStart(`${range.from.month}/${range.from.day}/${range.from.year}`)
    } else {
      setStart('');
    }
    if (range.to) {
      setEnd(`${range.to.month}/${range.to.day}/${range.to.year}`)
    } else {
      setEnd('')
    }

    if (range.from && range.to) {
      setStayPrice((haunt.price * (range.to.day - range.from.day)).toFixed(2))
      setNights(range.to.day - range.from.day)
      setCleaningFee((haunt.price * .8).toFixed(2))
      setScarebnbFee((haunt.price * .5).toFixed(2))
    } else {
      setStayPrice(0)
      setNights(0)
      setCleaningFee(0)
      setScarebnbFee(0)
      setTotal(0)
    }
  }, [range])

  useEffect(() => {
    setTotal((parseFloat(stayPrice) + parseFloat(cleaningFee) + parseFloat(scarebnbFee)).toFixed(2))
  }, [stayPrice, cleaningFee, scarebnbFee])

  const increase = (e, setInput) => {
    e.preventDefault();
    if (guests === haunt.max_guests) return;
    setInput(prevNum => ++prevNum)
  }

  const decrease = (e, input, setInput) => {
    e.preventDefault();
    if (input <= 1) return;
    setInput(prevNum => --prevNum)
  }

  return (
    <div id={styles.BookingSidebarContainer}>
      <header id={styles.bookingHeader}>
        <div id={styles.listPrice}>
          <span>${haunt.price}</span>
          <span>night</span>
        </div>
        <span>{haunt.Reviews.length} reviews</span>
      </header>
      <div>
        <div id={styles.inputWrapper}>
          <div id={styles.bookingInputContainer}>
            <input 
            placeholder="Choose check-in date" 
            type="text" value={start} 
            readOnly 
            />
            <input 
            placeholder="Choose checkout date" 
            type="text" 
            value={end} 
            readOnly 
            />
          </div>
          <div id={styles.guestsInputContainer}>
            <div>
              <label htmlFor='guests'>Guests</label>
            </div>
            <div id={styles.guestsInput}>
              <button onClick={(e) => decrease(e, guests, setGuests)} className={`material-symbols-outlined`}>remove</button>
              <input
                id='guests'
                type='number'
                value={guests}
                max={haunt.max_guests}
                readOnly
              />
              <button onClick={(e) => increase(e, setGuests)} className={`material-symbols-outlined`}>add</button>
            </div>
          </div>
        </div>
        <div id={styles.buttonContainer}>
          {range.from && range.to ?
            <div>
              <button>Reserve</button>
              <span>You won't be charged</span>
            </div>
            :
            <div>
              <button>Check availability</button>
            </div>
          }
        </div>
        <div>
          {range.from && range.to ?
            <div id={styles.detailsContainer}>
              <div>
                <PriceBreakdownModal price={haunt.price} nights={nights} range={range} />
                <span>${stayPrice}</span>
              </div>
              <div>
                <CleaningFeeModal />
                <span>${cleaningFee}</span>
              </div>
              <div>
                <ServiceFeeModal />
                <span>${scarebnbFee}</span>
              </div>
              <footer id={styles.bookingFooter}>
                <span>Total before taxes</span>
                <span>${total}</span>
              </footer>
            </div>
            : null
          }
        </div>
      </div>
    </div>
  )
};

export default BookingSidebar;