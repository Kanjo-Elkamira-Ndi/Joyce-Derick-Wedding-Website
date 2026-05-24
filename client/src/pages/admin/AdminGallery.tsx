import { useEffect, useState } from "react"
import { Upload, Trash2 } from "lucide-react"
import { media as mediaApi } from "@/lib/api"

interface MediaItem {
  id: string
  url: string
  album: string
  caption: string | null
  approved: boolean
}

export default function AdminGallery() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchItems = () => {
    setLoading(true)
    mediaApi.adminList()
      .then((res) => setItems(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchItems() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo?")) return
    try {
      await mediaApi.delete(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {
      alert("Failed to delete")
    }
  }

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

      {loading ? (
        <p className="text-center text-[#5A3319]/40 py-12">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-[#5A3319]/40 py-12">No photos yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((img) => (
            <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
              <img src={img.url} alt="" className="w-full h-40 object-cover" />
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs text-[#5A3319]/60">{img.album}</span>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
