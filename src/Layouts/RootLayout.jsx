import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import Container from "../Components/Container/Container";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
