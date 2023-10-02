import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './CreateHauntForm/Intro';
import AboutHaunt from './CreateHauntForm/AboutHaunt';
import FloorPlan from './CreateHauntForm/FloorPlan';
import AddImages from './CreateHauntForm/AddImages';
import TitleDescription from './CreateHauntForm/TitleDescription';
import FinishSetup from './CreateHauntForm/FinishSetup';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './CreateHauntPage.module.css'

const CreateHauntPage = ({setIsHosting}) => {
  const [street, setStreet] = useState(localStorage.getItem('street') || '');
  const [city, setCity] = useState(localStorage.getItem('city') || '');
  const [state, setState] = useState(localStorage.getItem('state') || '');
  const [zip_code, setZip_code] = useState(localStorage.getItem('zip_code') || '');
  const [max_guests, setMax_guests] = useState(localStorage.getItem('max_guests') || 1);
  const [bedrooms, setBedrooms] = useState(localStorage.getItem('bedrooms') || 1);
  const [beds, setBeds] = useState(localStorage.getItem('beds') || 1);
  const [bathrooms, setBathrooms] = useState(localStorage.getItem('bathrooms') || 1);
  const [title, setTitle] = useState(localStorage.getItem('title') || '');
  const [description, setDescription] = useState(localStorage.getItem('description') || '');
  const [price, setPrice] = useState(localStorage.getItem('price') || 0);
  const [images, setImages] = useState(localStorage.getItem('images') || null)


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
          <AddImages 
            images={images}
            setImages={setImages}
          />
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
            images={images}
            price={price}
            setPrice={setPrice}
          />
        </Route>
      </Switch>
    </>
  )
}

export default CreateHauntPage;