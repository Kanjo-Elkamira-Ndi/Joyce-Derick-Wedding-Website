import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import SectionWrapper from '../components/SectionWrapper'
import GalleryGrid from '../components/GalleryGrid'
import { useLang } from '../context/LangContext'

export default function Gallery() {
  const { t } = useLang()
  const [modal, setModal] = useState(false)

  return (
    <SectionWrapper id="gallery" className="section-pad bg-brand-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">{t('gallery.eyebrow')}</p>
          <h2 className="font-serif font-light text-brand-brown mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {t('gallery.title')}
          </h2>
          <div className="gold-rule w-32 mx-auto" />
        </div>

        <GalleryGrid onSubmitClick={() => setModal(true)} />
      </div>

      {/* Submit modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-brown/70 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-brand-cream rounded-2xl p-10 max-w-md w-full relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setModal(false)}
                className="absolute top-5 right-5 text-brand-brown/40 hover:text-brand-brown transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif text-2xl font-light text-brand-brown mb-2">
                {t('gallery.modal.title')}
              </h3>
              <div className="gold-rule w-16 mb-4" />
              <p className="font-sans text-sm text-brand-brown/60 mb-8 leading-relaxed">
                {t('gallery.modal.desc')}
              </p>

              {/* Upload area */}
              <div className="border-2 border-dashed border-brand-gold/40 rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-300">
                <Upload size={28} className="text-brand-gold-deep" />
                <p className="font-sans text-sm text-brand-brown/60 text-center">
                  {t('gallery.modal.btn')}
                </p>
              </div>

              <button
                onClick={() => setModal(false)}
                className="mt-6 w-full py-3 bg-brand-brown text-brand-gold font-sans font-medium tracking-widest uppercase text-sm rounded-full hover:bg-brand-brown-dark transition-colors duration-300"
              >
                {t('gallery.modal.close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
