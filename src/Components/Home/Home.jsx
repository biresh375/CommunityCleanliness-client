import React from "react";
import CategorySection from "./HomeSection/CategorySection";
import Container from "../Container/Container";
import BannerSection from "../BannerSection/BannerSection";
import RecentComplaints from "../RecentComplaints/RecentComplaints";
import { Helmet } from "react-helmet";
import JoinCleanDrive from "../JoinCleanDrive/JoinCleanDrive";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | communitycleanliness</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <BannerSection></BannerSection>
      <Container>
        <CategorySection></CategorySection>
        <RecentComplaints></RecentComplaints>
        <JoinCleanDrive></JoinCleanDrive>
      </Container>
    </div>
  );
};

export default Home;
