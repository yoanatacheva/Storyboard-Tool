'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel"
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const lines = useMemo(() => [
    { text: "What is your project idea today?", delay: 0 },
    { text: "Here is your storyboard tool to help you.", delay: 2000 }
  ], [])
  
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [showButton, setShowButton] = useState<boolean>(false)
  const [showCarousel, setShowCarousel] = useState<boolean>(false)
  const [api, setApi] = useState<CarouselApi>()
  const text1 = useTypewriter(lines[0].text, 30)
  const text2 = useTypewriter(lines[1].text, 30, text1 === lines[0].text ? 0 : lines[1].delay)

  useEffect(() => {
    if (text2 === lines[1].text) {
      setIsComplete(true)
      setTimeout(() => setShowButton(true), 100)
    }
  }, [text2, lines])

  useEffect(() => {
    if (showButton) {
      setTimeout(() => setShowCarousel(true), 500)
    }
  }, [showButton])

  useEffect(() => {
    if (!api || !showCarousel) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [api, showCarousel])

  return (
    <div className="h-screen flex flex-col items-center justify-center sm:space-y-4 space-y-0">
      <h1 className="font-geist font-semibold text-center 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl tracking-tighter leading-none p-4">
        <span className="block">{text1}</span>
        <span className="block">{text2}</span>
      </h1>
      {isComplete && (
        <Button 
          className={`font-geist font-semibold transform transition-all duration-300 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          onClick={() => router.push('/layout')}>Click to Start
        </Button>
      )}
      <div className={`w-full sm:max-w-[65vh] max-w-[45vh] transform transition-all duration-300 ${showCarousel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}>
          <CarouselContent>
            {[
              { src: "/storyboard1.png", alt: "Storyboard 1" },
              { src: "/storyboard2.png", alt: "Storyboard 2" },
              { src: "/storyboard3.png", alt: "Storyboard 3" },
            ].map((image, index) => (
              <CarouselItem key={index}>
                <div className="m-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1000}
                    height={1000}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
