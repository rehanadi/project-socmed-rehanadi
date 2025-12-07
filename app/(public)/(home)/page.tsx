"use client";

import HomeContainer from "./partials/home-container";
import Timeline from "./partials/timeline";
import FloatingMenus from "@/features/shared/components/floating-menus";

const HomePage = () => {
  return (
    <HomeContainer>
      <Timeline />
      <FloatingMenus />
    </HomeContainer>
  );
};

export default HomePage;