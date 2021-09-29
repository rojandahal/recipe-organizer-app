import React from "react";
import GetAllRecipes from "../../Components/Recipe/GetAllRecipes/GetAllRecipes";
import { Body } from "../UI/Body/Body";
import SearachBar from "../UI/SearchBar/SearchBar";
import Footer from "../UI/Footer/Footer";

const Home = () => {
  return (
    <>
      <SearachBar />
      <Body/>

      {/* <GetAllRecipes /> */}

      <Footer />
    </>
  );
};

export default Home;
