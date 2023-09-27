import { NavLink } from "react-router-dom";

const Intro = () => {

  return (
    <div>
      <div>
        <div>
          <h1>It's easy to get started on Scarebnb</h1>
        </div>
        <div>
          <ol>
            <li>
              <h2>Tell us about your place</h2>
              <p>Share some basic info like where it is and how many guests can stay.</p>
            </li>
            <li>
              <h2>Make it stand out</h2>
              <p>Add 5 or more photos plus a title and description--we'll help you out.</p>
            </li>
            <li>
              <h2>Finish up and publish</h2>
              <p>Verify your information is correct, set a starting price and publish your listing.</p>
            </li>
          </ol>
        </div>
      </div>
      <footer>
        <NavLink to='/host/about-your-haunt'>Get Started</NavLink>
      </footer>
    </div>
  )
}

export default Intro;