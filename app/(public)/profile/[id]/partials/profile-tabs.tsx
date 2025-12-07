import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import GalleryGrid from "./gallery-grid"
import LikedGrid from "./liked-grid"
import { Icon } from "@iconify/react"

const ProfileTabs = () => {
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
        <GalleryGrid />
      </TabsContent>
      <TabsContent value="liked">
        <LikedGrid />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;

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