import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Icon } from "@iconify/react"
import PostGrid from "@/features/posts/components/post-grid";
import SaveGrid from "@/features/saves/components/save-grid";

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
          value="saved"
          icon="mingcute:bookmark-line"
          label="Saved"
        />
      </TabsList>
      <TabsContent value="gallery">
        <PostGrid />
      </TabsContent>
      <TabsContent value="saved">
        <SaveGrid />
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