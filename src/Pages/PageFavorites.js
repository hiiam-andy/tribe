import React from "react";
import Search from "../Components/Search/Search";
import NavbarMobile from "../Components/NavbarMobile/NavbarMobile";

export default function PageFavorites() {
  return (
    <div>
      <Search />
      <div className="container">
        <h1>ИЗБРАННОЕ</h1>
      </div>
      <NavbarMobile />
    </div>
  );
}
