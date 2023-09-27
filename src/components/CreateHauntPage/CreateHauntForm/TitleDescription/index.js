import { NavLink } from "react-router-dom";

const TitleDescription = ({ title, setTitle, description, setDescription, price, setPrice }) => {

  return (
    <div>
      <div>
        <h1>Now lets give your haunt a title and description</h1>
        <span>Short titles work best. Have fun with it--you can always change it later.</span>
      </div>
      <div>
        <input
          placeholder="title"
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span style={{color: title.length >= 50 ? 'red' : 'black'}}>{title.length}/50</span>
      </div>
      <div>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span style={{color: description.length >= 5000 ? 'red' : 'black'}}>{description.length}/5000</span>
      </div>
      <footer>
        <NavLink to='/host/stand-out'>Back</NavLink>
        <NavLink to='/host/finish-setup'>Next</NavLink>
      </footer>
    </div>
  )
};

export default TitleDescription;