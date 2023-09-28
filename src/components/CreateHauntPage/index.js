import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './CreateHauntForm/Intro';
import AboutHaunt from './CreateHauntForm/AboutHaunt';
import FloorPlan from './CreateHauntForm/FloorPlan';
import StandOut from './CreateHauntForm/StandOut';
import TitleDescription from './CreateHauntForm/TitleDescription';
import FinishSetup from './CreateHauntForm/FinishSetup';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './CreateHauntPage.module.css'

const CreateHauntPage = ({setIsHosting}) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [max_guests, setMax_guests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  console.log(state);

  useEffect(() => {
    setIsHosting(true);
  }, [])

  return (
    <>
      <nav id={styles.nav}>
      <NavLink to='/'><img className={styles.logo} src='https://i.ibb.co/QCqyySJ/logo.png' /></NavLink>
      <NavLink className={styles.cancelandexit} to='/'>Cancel & exit</NavLink>
      </nav>
      <Switch>
        <Route exact path='/host'>
          <Intro />
        </Route>
        <Route path='/host/about-your-haunt'>
          <AboutHaunt
            street={street}
            setStreet={setStreet}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zip_code={zip_code}
            setZip_code={setZip_code}
          />
        </Route>
        <Route path='/host/floor-plan'>
          <FloorPlan
            max_guests={max_guests}
            setMax_guests={setMax_guests}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            beds={beds}
            setBeds={setBeds}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
          />
        </Route>
        <Route path='/host/stand-out'>
          <StandOut />
        </Route>
        <Route path='/host/title-description'>
          <TitleDescription
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
          />
        </Route>
        <Route path='/host/finish-setup'>
          <FinishSetup 
            title={title}
            description={description}
            street={street}
            city={city}
            state={state}
            zip_code={zip_code}
            max_guests={max_guests}
            beds={beds}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            price={price}
            setPrice={setPrice}
          />
        </Route>
      </Switch>
    </>
  )
}

export default CreateHauntPage;