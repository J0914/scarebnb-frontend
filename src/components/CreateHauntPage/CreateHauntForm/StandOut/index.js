import { NavLink } from "react-router-dom";

const StandOut = () => {


  return(
    <div>
      <div>
      <h1>StandOut</h1>
      <p>Once image functionality is implemented, create image form here</p>
      <p>make sure to indicate the order of the photos (cover photo at least)</p>
      </div>
      <footer>
      <NavLink to='/host/floor-plan'>Back</NavLink>
      <NavLink to='/host/title-description'>Next</NavLink>
      </footer>
    </div>
  )
}

export default StandOut;