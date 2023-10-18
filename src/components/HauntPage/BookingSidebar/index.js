import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import PriceBreakdownModal from "./PriceBreakdownModal";
import CleaningFeeModal from "./CleaningFeeModal";
import ServiceFeeModal from "./ServiceFeeModal";
import styles from './BookingSidebar.module.css';
import { createBooking } from "../../../store/bookings";


const BookingSidebar = ({ handleScrollClick, range, haunt, nights }) => {
  const [check_in, setCheck_in] = useState('')
  const [check_out, setCheck_out] = useState('')
  const [num_guests, setNum_guests] = useState(1);
  const [stayPrice, setStayPrice] = useState(0)
  const [cleaningFee, setCleaningFee] = useState(0);
  const [scarebnbFee, setScarebnbFee] = useState(0);
  const [total, setTotal] = useState(0);
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (range.from) {
      setCheck_in(`${range.from.month}/${range.from.day}/${range.from.year}`)
    } else {
      setCheck_in('');
    }
    if (range.to) {
      setCheck_out(`${range.to.month}/${range.to.day}/${range.to.year}`)
    } else {
      setCheck_out('')
    }

    if (range.from && range.to) {
      let len = 1;
      if (nights.length > 1){
        len = nights.length - 1;
      }
      setStayPrice((haunt.price * len).toFixed(2))
      setCleaningFee((haunt.price * .8).toFixed(2))
      setScarebnbFee((haunt.price * .5).toFixed(2))
    } else {
      setStayPrice(0)
      setCleaningFee(0)
      setScarebnbFee(0)
      setTotal(0)
    }
  }, [range, nights])

  useEffect(() => {
    setTotal((parseFloat(stayPrice) + parseFloat(cleaningFee) + parseFloat(scarebnbFee)).toFixed(2))
  }, [stayPrice, cleaningFee, scarebnbFee])

  const increase = (e, setInput) => {
    e.preventDefault();
    if (num_guests === haunt.max_guests) return;
    setInput(prevNum => ++prevNum)
  }

  const decrease = (e, input, setInput) => {
    e.preventDefault();
    if (input <= 1) return;
    setInput(prevNum => --prevNum)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionUser) window.alert('Please login to book this haunt!')
    else {
      const booking = {
        hauntId: haunt.id,
        check_in,
        check_out,
        num_guests
      }

      if (window.confirm('Are you sure you want to book this haunt?')) {
        await dispatch(createBooking(booking))
        .then(() => {
          localStorage.removeItem('selectedDayRange')
          return history.push('/account')
        })
        .catch((err) => console.log(err))
      } else {
        return;
      }
    }
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
            type="text" 
            value={check_in} 
            onFocus={handleScrollClick}
            readOnly 
            />
            <input 
            onFocus={handleScrollClick}
            placeholder="Choose checkout date" 
            type="text" 
            value={check_out} 
            readOnly 
            />
          </div>
          <div id={styles.guestsInputContainer}>
            <div>
              <label htmlFor='guests'>Guests</label>
            </div>
            <div id={styles.guestsInput}>
              <button onClick={(e) => decrease(e, num_guests, setNum_guests)} className={`material-symbols-outlined`}>remove</button>
              <input
                id='guests'
                type='number'
                value={num_guests}
                max={haunt.max_guests}
                readOnly
              />
              <button onClick={(e) => increase(e, setNum_guests)} className={`material-symbols-outlined`}>add</button>
            </div>
          </div>
        </div>
        <div id={styles.buttonContainer}>
          {range.from && range.to ?
            <div>
              <button onClick={handleSubmit}>Reserve</button>
              <span>You won't be charged</span>
            </div>
            :
            <div>
              <button onClick={handleScrollClick}>Check availability</button>
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