import { galleryData } from "@/features/posts/constants/gallery-data"
import Image from "next/image"

const GalleryGrid = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-[1.78px] md:gap-1">
      {galleryData.map((item) => (
        <div
          key={item.id}
          className="w-full aspect-square rounded-[2.67px] md:rounded-sm overflow-hidden cursor-pointer relative"
        >
          <Image
            src={item.image}
            alt="Post Image"
            fill
            className="object-cover hover:scale-110 transition-transform"
          />
        </div>
      ))}
    </div>
  )
}

export default GalleryGrid