import styles from './Review.module.css'

const Review = ({review}) => {
  
  const date = review.updatedAt.slice(5, 10)
  const dateEnd = review.updatedAt.slice(0, 4)

  return(
    <div id={styles.reviewContainer}>
      <div id={styles.reviewHeader}>
      <span>{review.User.first_name}</span>
      <span>{date}-{dateEnd}</span>
      </div>
      <p>{review.body}</p>
    </div>
  )
};

export default Review;