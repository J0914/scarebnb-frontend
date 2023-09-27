import { NavLink } from "react-router-dom";

const AboutHaunt = ({street, setStreet, city, setCity, state, setState, zip_code, setZip_code}) => {

  return (
    <div>
      <div>
      <span>Step 1</span>
      <h1>Tell us about your place</h1>
      <form>
        <input 
        placeholder="Street Address" 
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        />
        <input 
        placeholder="city" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
        <input 
        placeholder="State" 
        value={state}
        onChange={(e) => setState(e.target.value)}
        />
        <input 
        placeholder="ZIP code" 
        value={zip_code}
        onChange={(e) => setZip_code(e.target.value)}
        />
      </form>
      </div>
      <footer>
        <NavLink to='/host/floor-plan'>Next</NavLink>
      </footer>
    </div>
  )
}

export default AboutHaunt;