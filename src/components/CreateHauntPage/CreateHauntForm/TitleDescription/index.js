import { NavLink } from "react-router-dom";
import styles from './TitleDescription.module.css'

const TitleDescription = ({ title, setTitle, description, setDescription, price, setPrice }) => {

  return (
    <div id={styles.titleDescriptionContainer}>
      <div id={styles.tAndDWrapper}>
        <div id={styles.formHeader}>
          <h1>Now lets give your haunt a title and description</h1>
          <span>Short titles work best. Have fun with it--you can always change it later.</span>
        </div>
        <form id={styles.formWrapper}>
          <div>
            <input
              id={styles.input}
              placeholder="title"
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span style={{ color: title.length > 50 ? 'red' : 'black' }}>{title.length}/50</span>
          </div>
          <div>
            <textarea
              id={styles.textarea}
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span style={{ color: description.length > 5000 ? 'red' : 'black' }}>{description.length}/5000</span>
          </div>
        </form>
      </div>
      <footer id={styles.footer}>
        <NavLink className={styles.navlink} to='/host/stand-out'>Back</NavLink>
        {title.length === 0 || description.length === 0 ? <span>Add title and description to continue</span> : <NavLink className={styles.navlink} to='/host/finish-setup'>Next</NavLink>}
      </footer>
    </div>
  )
};

export default TitleDescription;