"use client";

import ModalLikes from "@/features/likes/components/modal-likes";
import HomeContainer from "./partials/home-container";
import Timeline from "./partials/timeline";
import ModalComments from "@/features/comments/components/modal-comments";
import FloatingMenus from "@/features/shared/components/floating-menus";

const Home = () => {
  return (
    <HomeContainer>
      <Timeline />
      <FloatingMenus />
      <ModalComments isOpen={false} onClose={() => {}} />
      <ModalLikes isOpen={false} onClose={() => {}} />
    </HomeContainer>
  );
};

export default Home;