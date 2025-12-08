import { HeaderThemeSetter } from '@/Header/HeaderThemeSetter'

export default function ObrasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderThemeSetter theme="default" logoMobile="icon-white" logoDesktop="full">
        <div aria-hidden className="mb-7 h-28 rounded-b-3xl bg-[linear-gradient(315deg,#162A6B_31.39%,#233E94_80.12%)] md:h-42" />
      </HeaderThemeSetter>
      {children}
    </>
  )
}
