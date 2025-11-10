import React from "react";
import CategorySection from "./HomeSection/CategorySection";
import Container from "../Container/Container";
import BannerSection from "../BannerSection/BannerSection";
import RecentComplaints from "../RecentComplaints/RecentComplaints";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <Container>
        <CategorySection></CategorySection>
        <RecentComplaints></RecentComplaints>
      </Container>
    </div>
  );
};

export default Home;
