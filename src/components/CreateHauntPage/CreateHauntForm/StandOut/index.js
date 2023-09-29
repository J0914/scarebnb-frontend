import { useState } from "react";
import { NavLink } from "react-router-dom";
import fs from 'fs';
import path from 'path';

const StandOut = () => {
  const [image, setImage] = useState(true)

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };


  return(
    <div>
      <div>
      <h1>StandOut</h1>
      {image && <img src={} alt="preview image" />}
      <input 
      type="file" 
      name="stCard" 
      multiple accept=".png, .jpg" 
      onChange={onImageChange}
      ></input>
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