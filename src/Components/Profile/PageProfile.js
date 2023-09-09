import React from "react";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import PageAuth from "../Auth/PageAuth";

export default function PageProfile() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <section>
      {isAuth ? (
        <>
          <Profile />
          <NavbarMobile />
        </>
      ) : (
        <PageAuth />
      )}
    </section>
  );
}
