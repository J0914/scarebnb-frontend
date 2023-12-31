import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HauntCard from './HauntCard';
import styles from './HomePage.module.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const HomePage = ({setIsHosting}) => {
  const allHaunts = useSelector(state => state.haunts)
  const [haunts, setHaunts] = useState([])

  useEffect(() => {
    setIsHosting(false);
  },[])

  useEffect(() => {
    const hauntsArray = Object.values(allHaunts)
    setHaunts(hauntsArray)
  }, [allHaunts])

  return (
    <div className={styles.homePage_container}>
      {haunts?.map(haunt => (
          <HauntCard key={haunt.id} haunt={haunt} />
      ))}
    </div>
  )
}

export default HomePage;