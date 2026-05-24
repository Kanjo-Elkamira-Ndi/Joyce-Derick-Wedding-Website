import { useEffect, useRef, useState } from "react"
import { Check, Upload, Trash2 } from "lucide-react"
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
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

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

  const handleApprove = async (id: string) => {
    try {
      await mediaApi.approve(id)
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, approved: true } : i)))
    } catch {
      alert("Failed to approve")
    }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await mediaApi.adminUpload(file, album)
      fetchItems()
    } catch {
      alert("Upload failed")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const [album, setAlbum] = useState("pre-wedding")

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-3xl text-[#5A3319] mb-1">Gallery</h2>
          <p className="text-[#5A3319]/60 text-sm">Manage photo albums</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="text-sm border border-[#E5C290] rounded-lg px-3 py-2 bg-white text-[#5A3319]"
          >
            <option value="pre-wedding">Pre-wedding</option>
            <option value="engagement">Engagement</option>
            <option value="ceremony">Ceremony</option>
            <option value="reception">Reception</option>
          </select>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#5A3319] text-[#E5C290] rounded-lg text-sm hover:bg-[#3d2010] transition-colors disabled:opacity-50"
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-[#5A3319]/40 py-12">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-[#5A3319]/40 py-12">No photos yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((img) => (
            <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
              <div className="relative">
                <img src={img.url} alt="" className="w-full h-40 object-cover" />
                {!img.approved && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleApprove(img.id)}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                      title="Approve"
                    >
                      <Check size={20} />
                    </button>
                  </div>
                )}
                {img.approved && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check size={10} /> Approved
                  </span>
                )}
              </div>
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
