import { useEffect, useState } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import styles from './Calendar.module.css'


const CalendarView = ({selectedDayRange, setSelectedDayRange}) => {
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
    console.log(hauntBookings)
    const toBeDisabled = [];
    const disabled = [];

    Object.values(hauntBookings).forEach(booking => {
      const checkInYear = booking.check_in.slice(0,4)
      const checkInMonth = booking.check_in.slice(5,7)
      const checkInDay = booking.check_in.slice(8,10)
      const checkOutYear = booking.check_out.slice(0,4)
      const checkOutMonth = booking.check_out.slice(5,7)
      const checkOutDay = booking.check_out.slice(8,10)
      
      toBeDisabled.push({check_in: {year: parseInt(checkInYear), month: parseInt(checkInMonth), day: parseInt(checkInDay)}, check_out: {year: parseInt(checkOutYear), month: parseInt(checkOutMonth), day: parseInt(checkOutDay)}})
    })

    console.log('toBeDisabled', toBeDisabled)
    toBeDisabled.forEach(range => {
      const date = new Date(`${range.check_in.year}-${range.check_in.month}-${range.check_in.day}`)
      const tomorrow = date;
      tomorrow.setDate(tomorrow.getDate() + 1)
      console.log('month', tomorrow.getMonth() + 1)
      console.log('day', tomorrow.getDate())
      console.log('year', tomorrow.getFullYear())
    })

    // setDisabledDays(toBeDisabled)
  }, [hauntBookings])
  
  // const disabledDays = [
  //   {
  //     year: 2019,
  //     month: 3,
  //     day: 20,
  //   },
  //   {
  //     year: 2019,
  //     month: 3,
  //     day: 21,
  //   },
  //   {
  //     year: 2019,
  //     month: 3,
  //     day: 7,
  //   }
  // ];

  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      minimumDate={utils().getToday()}
      disabledDays={disabledDays}
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