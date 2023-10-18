import { useEffect, useState } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import styles from './Calendar.module.css'


const CalendarView = ({nights, selectedDayRange, setSelectedDayRange}) => {
  const hauntBookings = useSelector(state => state.bookings.haunt)
  const [disabledDays, setDisabledDays] = useState([]);

  // console.log('utils', utils)
  
  useEffect(() => {
    if (selectedDayRange.from === null) localStorage.removeItem('selectedDayRange')
    else {
      if (selectedDayRange.from !== null && selectedDayRange.to !== null){
        const range = JSON.stringify(selectedDayRange)
        localStorage.setItem('selectedDayRange', range)
      }
    }
  }, [selectedDayRange])

  useEffect(() => {
      if (hauntBookings){
        console.log('haunt bookings', hauntBookings)
        const days = [];
        Object.values(hauntBookings).forEach((booking) => {
          let date = new Date(booking.check_in)
          let end = new Date(booking.check_out)
          while (date.getDate() <= end.getDate()) {
            days.push({year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() })
            let tomorrow = date;
            tomorrow.setDate(tomorrow.getDate() + 1)
            date = tomorrow;
          }
          setDisabledDays(days);
        }) 
      }
  }, [hauntBookings])

  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      minimumDate={utils().getToday()}
      disabledDays={disabledDays}
      onDisabledDayError={() => {window.alert('Sorry this day is already booked!')}}
      shouldHighlightWeekends
      colorPrimary='orangered'
      colorPrimaryLight='rgba(255, 68, 0, 0.2)'
      calendarClassName={styles.calendar}
      renderFooter={() => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
          <button
            type="button"
            onClick={() => {
              setSelectedDayRange({
                from: null,
                to: null
              })
            }}
            style={{
              border: 'none',
              color: 'black',
              background: 'white',
              textDecoration: 'underline',
              marginLeft: 'auto',
              textAlign: 'end',
              padding: '5px',
            }}
          >
            Clear Dates
          </button>
        </div>
      )}
    />
  )
};

export default CalendarView;