'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTypewriter } from '@/hooks/useTypewriter'

export default function Layout() {
  const router = useRouter()
  const lines = useMemo(() => [
    { text: "Choose your layout", delay: 0 },
    { text: "to create your storyboard.", delay: 2000 }
  ], [])

  const [showButton, setShowButton] = useState<boolean>(false)
  const text1 = useTypewriter(lines[0].text, 30)
  const text2 = useTypewriter(lines[1].text, 30, text1 === lines[0].text ? 0 : lines[1].delay)

  useEffect(() => {
    if (text2 === lines[1].text) {
      setTimeout(() => setShowButton(true), 500)
    }
  }, [text2, lines])

  const handleLayoutClick = (layout: number) => {
    router.push(`/generation/${layout}`)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="sm:pt-10 pt-4">
        <h1 className="font-geist font-semibold text-center 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl tracking-tighter leading-none p-4">
          <span className="block">{text1}</span>
          <span className="block">{text2}</span>
        </h1>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-300 ease-in-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[1, 2, 3].map((layout) => (
            <div key={layout} className="flex flex-col gap-1">
              <h2 className="text-xs md:text-sm text-muted-foreground transition-opacity duration-300" style={{ opacity: showButton ? 1 : 0 }}>Layout {layout}</h2>
              <Button
                variant="outline"
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-72 xl:h-72 rounded-lg border-2 hover:bg-accent relative"
                onClick={() => handleLayoutClick(layout)}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {layout === 1 && (
                    <div className="grid grid-cols-2 gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-20 xl:h-20 bg-black dark:bg-white rounded-[1.5px] lg:rounded-sm" />
                      ))}
                    </div>
                  )}
                  {layout === 2 && (
                    <div className="grid grid-cols-3 grid-rows-2 gap-0.5">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-20 xl:h-20 bg-black dark:bg-white rounded-[1.5px] lg:rounded-sm" />
                      ))}
                    </div>
                  )}
                  {layout === 3 && (
                    <div className="grid grid-cols-3 gap-0.5">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-20 xl:h-20 bg-black dark:bg-white rounded-[1.5px] lg:rounded-sm" />
                      ))}
                    </div>
                  )}
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}