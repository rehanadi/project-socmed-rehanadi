import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Icon } from "@iconify/react"
import PostGrid from "@/features/posts/components/post-grid";
import LikeGrid from "@/features/likes/components/like-grid";

const UserTabs = () => {
  return (
    <Tabs defaultValue="gallery">
      <TabsList>
        <TabsTriggerItem
          value="gallery"
          icon="mage:layout-grid-fill"
          label="Gallery"
        />
        <TabsTriggerItem
          value="liked"
          icon="solar:heart-linear"
          label="Liked"
        />
      </TabsList>
      <TabsContent value="gallery">
        <PostGrid />
      </TabsContent>
      <TabsContent value="liked">
        <LikeGrid />
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;

const TabsTriggerItem = ({
  value,
  icon,
  label,
}: {
  value: string;
  icon: string;
  label: string;
}) => {
  return (
    <TabsTrigger value={value}>
      <Icon icon={icon} className="size-5 md:size-6" />
      <span>{label}</span>
    </TabsTrigger>
  )
};