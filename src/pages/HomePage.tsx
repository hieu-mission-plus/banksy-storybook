import React, { useContext } from "react";
import Taxonomy from "../components/Taxonomy";
import useIsMobile from "../hooks/useIsMobile";
import { Context as CategoryContext } from "../contexts/CategoryContext"

const HomePage = () => {
  const {state: { category }, setCategory} = useContext(CategoryContext)
  const isMobile = useIsMobile()

  return (
    <Taxonomy
      view={category}
      setView={setCategory}
      isMobile={isMobile}
    />
  )
}
export default HomePage;