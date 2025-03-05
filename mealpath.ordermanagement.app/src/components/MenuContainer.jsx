import React from "react";
import FilterContainer from "./FilterContainer";
import FoodContainer from "./FoodContainer";
import FoodContainer1 from "./FoodContainer1";
import { observer } from "mobx-react-lite";



const MenuContainer = () => {

  
  return (
    <section>
    {/* <FilterContainer/> */}
    <FoodContainer1/>
    </section>
  )
}

export default observer(MenuContainer)
