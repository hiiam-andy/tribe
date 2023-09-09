import React from "react";
import Search from "../Search/Search";
import Cards from "./Cards/Cards";
import NavbarMobile from "../NavbarMobile/NavbarMobile";

export default function PageEvents() {
  return (
    <div className="app">
      <Search />
      <section className="container">
        <Cards />
      </section>
      <NavbarMobile />
    </div>
  );
}
