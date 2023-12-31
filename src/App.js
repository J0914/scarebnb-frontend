import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import HauntPage from "./components/HauntPage";
import CreateHauntPage from "./components/CreateHauntPage";
import AccountPage from "./components/Account";
import { restoreUser } from "./store/session";
import { getAllHaunts } from "./store/haunts";
import { getUserBookings } from './store/bookings';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHosting, setIsHosting] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => dispatch(getAllHaunts()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser) dispatch(getUserBookings())
  }, [sessionUser])

  return (
    <>
      {!isHosting && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage setIsHosting={setIsHosting} />
          </Route>
          <Route path='/haunts/:hauntId'>
            <HauntPage setIsHosting={setIsHosting} />
          </Route>
          <Route path='/host'>
            <CreateHauntPage setIsHosting={setIsHosting} />
          </Route>
          <Route path='/account'>
            <AccountPage setIsHosting={setIsHosting} />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
