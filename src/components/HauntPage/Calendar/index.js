import { useState } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from 'react-modern-calendar-datepicker';
import styles from './Calendar.module.css'


const CalendarView = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  })

  console.log(selectedDayRange)

  if (selectedDayRange.from){
    const {from: {month, day, year}} = selectedDayRange;
    const date = new Date(`${month}-${day}-${year}`)
    console.log(date)
  }

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
      // disabledDays={disabledDays}
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