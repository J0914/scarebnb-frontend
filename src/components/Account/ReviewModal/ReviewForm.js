import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import styles from './ReviewForm.module.css'
import { createReview, editReview, deleteReview } from '../../../store/haunts'


const ReviewForm = ({ setModalIsOpen, hauntId, review, hasReviewed, setHasReviewed }) => {
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (review)
      setBody(review.body)
  }, [])

  const handleSubmit = (e, isDelete) => {
    e.preventDefault();

    if (isDelete) {
      return dispatch(deleteReview(review))
        .then(setHasReviewed(false))
        .then(setModalIsOpen(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    if (!review) {
      review = {
        hauntId,
        body
      }
    } else {
      review.body = body;
    }

    console.log('The Review', review)

    if (hasReviewed) {
      return dispatch(editReview(review))
        .then(setModalIsOpen(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      return dispatch(createReview(review))
        .then(setHasReviewed(true))
        .then(setModalIsOpen(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  }

  return (
    <div>
      <form>
        <ul>
          {errors.length > 0 && errors.map((error, idx) => <li className={styles.errors} key={idx}>{error}</li>)}
        </ul>
        <textarea
          id={styles.bodyInput}
          placeholder='leave a review'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div id={styles.buttonsContainer}>
        {review && <button className={styles.reviewButtons} onClick={(e) => handleSubmit(e, true)}>Delete</button>}
        <button className={review ? styles.reviewButtons : styles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default ReviewForm;