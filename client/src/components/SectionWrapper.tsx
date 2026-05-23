import { ReactNode } from "react"

export default function SectionWrapper({
  id,
  className = "",
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
      {children}
    </section>
  )
}
