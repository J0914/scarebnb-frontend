import { NavLink } from "react-router-dom";

const StandOut = () => {


  return(
    <div>
      <div>
      <h1>StandOut</h1>
      <input type="file" name="stCard" multiple accept=".png, .jpg"></input>
      <p>Once image functionality is implemented, create image form here</p>
      
      <p>make sure to indicate the order of the photos and implement drag and drop (saved in react folder)</p>
      </div>
      <footer>
      <NavLink to='/host/floor-plan'>Back</NavLink>
      <NavLink to='/host/title-description'>Next</NavLink>
      </footer>
    </div>
  )
}

export default StandOut;