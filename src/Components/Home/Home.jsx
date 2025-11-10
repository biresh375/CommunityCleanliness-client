import React from "react";
import CategorySection from "./HomeSection/CategorySection";
import Container from "../Container/Container";
import BannerSection from "../BannerSection/BannerSection";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <Container>
        <CategorySection></CategorySection>
      </Container>

    </div>
  );
};

export default Home;
