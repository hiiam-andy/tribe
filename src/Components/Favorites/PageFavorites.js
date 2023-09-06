import React from "react";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Favorites from "./Favorites";

export default function PageFavorites() {
  return (
    <div>
      <h1>ИЗБРАННОЕ</h1>
      <Favorites />
      <NavbarMobile />
    </div>
  );
}
