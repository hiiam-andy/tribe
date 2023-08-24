import React from "react";
import Search from "../Components/Search/Search";
import Cards from "../Components/Event/Cards/Cards";
import NavbarMobile from "../Components/NavbarMobile/NavbarMobile";

export default function PageMain() {
  return (
    <div className="app">
      <Search />
      <div className="container">
        <Cards />
      </div>
      <NavbarMobile />
    </div>
  );
}
