import React from "react";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Favorites from "./Favorites";
import { useSelector } from "react-redux";
import PageAuth from "../Auth/PageAuth";

export default function PageFavorites() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {isAuth ? (
        <div>
          <h1>ИЗБРАННОЕ</h1>
          <Favorites />
          <NavbarMobile />
        </div>
      ) : (
        <PageAuth />
      )}
    </>
  );
}
