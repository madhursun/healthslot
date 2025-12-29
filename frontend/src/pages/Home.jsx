import React from "react";
import Header from "../components/Header";
import Speacialitymenu from "../components/Speacialitymenu";
import Topdoc from "../components/Topdoc";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Speacialitymenu></Speacialitymenu>
      <Topdoc></Topdoc>
      <Banner></Banner>
    </div>
  );
};

export default Home;
