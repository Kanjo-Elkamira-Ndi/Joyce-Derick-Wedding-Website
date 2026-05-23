import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { useLang } from '../context/LangContext'

type Album = 'all' | 'pre' | 'eng'

interface Photo {
  id: number
  album: 'pre' | 'eng'
  aspect: 'portrait' | 'landscape' | 'square'
  color: string
}

// Placeholder photos with different proportions for masonry feel
const PHOTOS: Photo[] = [
  { id: 1, album: 'pre', aspect: 'portrait',   color: '#7A5C3A' },
  { id: 2, album: 'pre', aspect: 'landscape',  color: '#8B6845' },
  { id: 3, album: 'eng', aspect: 'square',     color: '#6B4A2A' },
  { id: 4, album: 'eng', aspect: 'portrait',   color: '#9A7A55' },
  { id: 5, album: 'pre', aspect: 'landscape',  color: '#7D5A38' },
  { id: 6, album: 'eng', aspect: 'square',     color: '#5A3D22' },
  { id: 7, album: 'pre', aspect: 'portrait',   color: '#8A6540' },
  { id: 8, album: 'eng', aspect: 'landscape',  color: '#705035' },
  { id: 9, album: 'pre', aspect: 'square',     color: '#6A4828' },
]

function aspectH(a: Photo['aspect']) {
  if (a === 'portrait')  return 'h-72'
  if (a === 'landscape') return 'h-48'
  return 'h-56'
}

export default function GalleryGrid({
  onSubmitClick,
}: {
  onSubmitClick: () => void
}) {
  const { t } = useLang()
  const [tab, setTab]       = useState<Album>('all')
  const [light, setLight]   = useState<number | null>(null)

  const visible = PHOTOS.filter(p => tab === 'all' || p.album === tab)

  const prev = () => {
    if (light === null) return
    const idx = visible.findIndex(p => p.id === light)
    setLight(visible[(idx - 1 + visible.length) % visible.length].id)
  }
  const next = () => {
    if (light === null) return
    const idx = visible.findIndex(p => p.id === light)
    setLight(visible[(idx + 1) % visible.length].id)
  }

  const tabs: { key: Album; label: string }[] = [
    { key: 'all', label: t('gallery.tab.all') },
    { key: 'pre', label: t('gallery.tab.pre') },
    { key: 'eng', label: t('gallery.tab.eng') },
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map(tb => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`eyebrow px-5 py-2 rounded-full border transition-all duration-300 ${
              tab === tb.key
                ? 'bg-brand-brown text-brand-gold border-brand-brown'
                : 'bg-transparent text-brand-brown border-brand-brown/30 hover:border-brand-gold'
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        <AnimatePresence>
          {visible.map((photo, i) => (
            <motion.button
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLight(photo.id)}
              className={`w-full break-inside-avoid mb-3 rounded-lg overflow-hidden group relative cursor-pointer ${aspectH(photo.aspect)}`}
              style={{ backgroundColor: photo.color }}
            >
              {/* Placeholder interior */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-40 group-hover:opacity-60 transition-opacity">
                <Camera size={24} className="text-brand-gold" />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-brown/0 group-hover:bg-brand-brown/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity font-serif text-sm italic">
                  View photo
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Submit CTA */}
      <div className="mt-12 text-center">
        <p className="font-serif italic text-brand-brown/60 mb-4">{t('gallery.submit.desc')}</p>
        <button
          onClick={onSubmitClick}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-brand-gold text-brand-brown font-sans text-sm font-medium tracking-widest uppercase hover:bg-brand-gold/20 transition-all duration-300"
        >
          <Camera size={16} />
          {t('gallery.submit.btn')}
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {light !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLight(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full mx-4"
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: PHOTOS.find(p => p.id === light)?.color,
                aspectRatio: '4/3',
                borderRadius: '12px',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <Camera size={48} className="text-brand-gold" />
              </div>
            </motion.div>

            {/* Controls */}
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-4 text-brand-gold hover:text-white transition-colors"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-4 text-brand-gold hover:text-white transition-colors"
            >
              <ChevronRight size={36} />
            </button>
            <button
              onClick={() => setLight(null)}
              className="absolute top-4 right-4 text-brand-gold hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
