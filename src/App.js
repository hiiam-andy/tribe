import React from "react";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import Cards from "./Components/Cards/Cards";
function App() {
  return (
    <div className="app">
      <Header />
      <Search />
      <Cards />
    </div>
  );
}

export default App;
