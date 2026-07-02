import { motion } from "framer-motion"
import { useLang } from "@/context/LangContext"
import groomImg from "@/assets/images/groom.jpg"
import brideImg from "@/assets/images/bride.jpg"

function SplitSection({
  imgSrc,
  imgAlt,
  name,
  desc,
  imgLeft,
  eyebrow,
}: {
  imgSrc: string
  imgAlt: string
  name: string
  desc: string
  imgLeft: boolean
  eyebrow: string
}) {
  return (
    <section className="min-h-[70vh] md:min-h-screen flex flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`w-full md:w-1/2 overflow-hidden ${imgLeft ? "order-first" : "md:order-last"}`}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-[50vh] md:h-full object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: imgLeft ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 lg:p-24"
      >
        <div className={`max-w-md ${imgLeft ? "md:pl-8" : "md:pr-8"}`}>
          <p className="eyebrow mb-3 text-center md:text-left">
            {eyebrow}
          </p>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-brown mb-6 text-center md:text-left">
            {name}
          </h2>
          <div className="gold-rule w-20 mx-auto md:mx-0 mb-6" />
          <p className="font-sans text-base md:text-lg text-brand-brown/70 leading-relaxed text-center md:text-left">
            {desc}
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default function Meet() {
  const { t } = useLang()

  return (
    <>
      <SplitSection
        imgSrc={groomImg}
        imgAlt="Derick"
        name={t.meet.groom.name}
        desc={t.meet.groom.desc}
        imgLeft={true}
        eyebrow={t.meet.groomEyebrow}
      />
      <SplitSection
        imgSrc={brideImg}
        imgAlt="Joyce"
        name={t.meet.bride.name}
        desc={t.meet.bride.desc}
        imgLeft={false}
        eyebrow={t.meet.brideEyebrow}
      />
    </>
  )
}
