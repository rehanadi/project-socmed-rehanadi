import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import GalleryGrid from "./gallery-grid"
import SavedGrid from "./saved-grid"
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
          value="saved"
          icon="mingcute:bookmark-line"
          label="Saved"
        />
      </TabsList>
      <TabsContent value="gallery">
        <GalleryGrid />
      </TabsContent>
      <TabsContent value="saved">
        <SavedGrid />
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