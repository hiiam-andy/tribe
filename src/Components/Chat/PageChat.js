import React from "react";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import { useSelector } from "react-redux";
import PageAuth from "../Auth/PageAuth";

export default function PageChat() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {isAuth ? (
        <section>
          <h1>Здесь когда-то будет чат</h1>
          <NavbarMobile />
        </section>
      ) : (
        <PageAuth />
      )}
    </>
  );
}
