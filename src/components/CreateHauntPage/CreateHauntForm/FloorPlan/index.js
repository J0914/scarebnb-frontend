import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const FloorPlan = ({max_guests, setMax_guests, bedrooms, setBedrooms, beds, setBeds, bathrooms, setBathrooms}) => {


  return (
    <div>
      <div>
      <h1>Share some basics about your haunt</h1>
      <form>
        <div>
        <label htmlFor='guests'>Guests</label>
        <input 
        id='guests' 
        type='number'
        value={max_guests}
        onChange={(e) => setMax_guests(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor='bedrooms'>Bedrooms</label>
        <input 
        id='bedrooms' 
        type='number'
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor='beds'>Beds</label>
        <input 
        id='beds' 
        type='number'
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor='bathrooms'>Bathrooms</label>
        <input 
        id='bathrooms' 
        type='number'
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)}
        />
        </div>
      </form>
      </div>
      <footer>
        <NavLink to='/host/about-your-haunt'>Back</NavLink>
        <NavLink to='/host/stand-out'>Next</NavLink>
      </footer>
    </div>
  )
};

export default FloorPlan;