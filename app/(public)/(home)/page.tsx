"use client";

import ModalAddComment from "@/features/comments/components/modal-add-comment";
import HomeContainer from "./partials/home-container";
import Timeline from "./partials/timeline";

const Home = () => {
  return (
    <HomeContainer>
      <Timeline />
      <ModalAddComment isOpen={true} onClose={() => {}} />
    </HomeContainer>
  );
};

export default Home;