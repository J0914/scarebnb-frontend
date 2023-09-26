import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import HauntPage from "./components/HauntPage";
import * as sessionActions from "./store/session";
import * as hauntActions from "./store/haunts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => dispatch(hauntActions.getAllHaunts())).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/:hauntId'>
            <HauntPage />
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
