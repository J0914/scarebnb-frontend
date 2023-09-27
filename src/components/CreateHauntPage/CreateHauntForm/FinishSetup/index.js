import { NavLink } from "react-router-dom"

import Preview from "./preview"

const FinishSetup = ({title, description, street, city, state, zip_code, max_guests, bedrooms, beds, bathrooms, price, setPrice}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newHaunt = {
      title,
      description,
      street,
      city,
      state,
      zip_code,
      max_guests,
      bedrooms,
      beds,
      bathrooms,
      price
    }

    window.alert(newHaunt)
  }

  return(
    <div>
      <div>
      <h1>Yay! It's time to publish.</h1>
      <p>Here's what we'll show to guests. Before you publish, make sure to review the details.</p>
      </div>
      <div>
      <Preview />
      </div>
      <div>
        <label htmlFor="price">Set a Price per day</label>
        <input 
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <h2>What's next?</h2>
        <div>
        <h3>Keep an eye on your Calendar</h3>
        <p>Guests can start booking immediately after you publish</p>
        </div>
        <div>
        <h3>Adjust your settings</h3>
        <p>Edit your title, description, or any other information about your haunt to personalize and make it stand out.</p>
        </div>
        <div>
        <h3>Prepare for your first guest</h3>
        <p>Guests typically expect a clean and safe haunt. Make sure it's ready for them!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} id='createHaunt' style={{visibility: 'hidden'}}>
        {/* add form */}
      </form>
      <footer>
        <NavLink to='/host/title-description'>Back</NavLink>
        <button form='createHaunt' type="Submit">Publish</button>
      </footer>
    </div>
  )
}

export default FinishSetup;