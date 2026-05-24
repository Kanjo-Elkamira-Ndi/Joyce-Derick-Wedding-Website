import { Upload, Trash2 } from "lucide-react"
import {
  cover_image_1,
  cover_image_2,
  cover_image_3,
  cover_image_4,
  cover_image_5,
  cover_image_6,
} from "@/assets/images"

const images = [
  { id: 1, src: cover_image_1, album: "Pre-wedding" },
  { id: 2, src: cover_image_2, album: "Pre-wedding" },
  { id: 3, src: cover_image_3, album: "Engagement" },
  { id: 4, src: cover_image_4, album: "Engagement" },
  { id: 5, src: cover_image_5, album: "Pre-wedding" },
  { id: 6, src: cover_image_6, album: "Engagement" },
]

export default function AdminGallery() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-3xl text-[#5A3319] mb-1">Gallery</h2>
          <p className="text-[#5A3319]/60 text-sm">Manage photo albums</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#5A3319] text-[#E5C290] rounded-lg text-sm hover:bg-[#3d2010] transition-colors">
          <Upload size={16} />
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
            <img src={img.src} alt="" className="w-full h-40 object-cover" />
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs text-[#5A3319]/60">{img.album}</span>
              <button className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
