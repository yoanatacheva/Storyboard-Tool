'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PanelsTopLeft, Info, Image, HomeIcon as House } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleHomeClick = () => {
    router.push('/')
  }

  const handleLayoutClick = () => {
    router.push('/layout')
  }

  const handleGenerationClick = (layout: number) => {
    if (!pathname.startsWith('/generation')) {
      router.push(`/generation/${layout}`)
    }
  }

  const handleImagesClick = () => {
    if (pathname !== '/info') {
      router.push('/info')
    }
  }

  const Home = pathname === '/'
  const Layout = pathname === '/layout'
  const Generation = pathname.startsWith('/generation')
  const About = pathname === '/info'

  return (
    <TooltipProvider>
      <aside className="hidden md:flex flex-col w-[72px] p-4 border-r bg-zinc-50 dark:bg-black z-50">
        <div className="flex flex-col gap-4 flex-grow">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`w-9 ${Home ? 'bg-accent hover:bg-accent' : ''}`}
                onClick={handleHomeClick}>
                <House className="h-4 w-4" aria-label="home icon" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={`w-9 ${Layout ? 'bg-accent hover:bg-accent' : ''}`}
                onClick={handleLayoutClick}>
                <PanelsTopLeft className="h-4 w-4" aria-label="layout icon" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Layout</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`w-9 ${Generation ? 'bg-accent hover:bg-accent' : ''} ${Home || Layout || About ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleGenerationClick(1)}
                disabled={Home || Layout || About}
                aria-disabled={Home || Layout || About}>
                <Image className="h-4 w-4" aria-label="edit icon" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Generation</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline"
              size="icon"
              className={`w-9 mt-auto ${About ? 'bg-accent hover:bg-accent' : ''}`}
              onClick={handleImagesClick}>
              <Info className="h-4 w-4" aria-label="info icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Info</p>
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  )
}