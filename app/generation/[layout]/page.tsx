'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImageGenerator } from '@/components/ImageGenerator'

function truncateText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  let truncated = text
  while (truncated.length > 0 && ctx.measureText(truncated + '...').width > maxWidth) {
    truncated = truncated.slice(0, -1)
  }
  return truncated !== text ? truncated + '...' : truncated
}

export default function Generation({ params }: { params: { layout: string } }) {
  const layout = parseInt(params.layout, 10) || 1
  const [isDownloading, setIsDownloading] = useState(false)

  const numRectangles = layout === 1 ? 4 : layout === 2 ? 6 : 9
  const [imagesData, setImagesData] = useState(
    Array.from({ length: numRectangles }, () => ({
      url: '',
      description: '',
    }))
  )

  const onImageChange = (index: number, url: string, description: string) => {
    setImagesData((prev) => {
      const newData = [...prev]
      newData[index] = { url, description }
      return newData
    })
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      let columns = 2
      let rows = 2
      if (layout === 2) {
        columns = 3
        rows = 2
      } else if (layout === 3) {
        columns = 3
        rows = 3
      }

      const cellWidth = 1000
      const cellHeight = 1000
      const GAP = 10

      const canvasWidth = columns * cellWidth + (columns - 1) * GAP
      const canvasHeight = rows * cellHeight + (rows - 1) * GAP

      const canvas = document.createElement('canvas')
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      for (let i = 0; i < imagesData.length; i++) {
        const { url, description } = imagesData[i]
        if (!url) continue

        const row = Math.floor(i / columns)
        const col = i % columns

        const x = col * (cellWidth + GAP)
        const y = row * (cellHeight + GAP)

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = url

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = (err) => reject(err)
        })

        ctx.drawImage(img, x, y, cellWidth, cellHeight)

        ctx.fillStyle = 'rgba(0,0,0,0.85)'
        ctx.fillRect(x, y + cellHeight - 100, cellWidth, 100)

        ctx.fillStyle = '#fff'
        ctx.font = '32px sans-serif'
        const maxTextWidth = cellWidth - 40
        const truncated = truncateText(ctx, description, maxTextWidth)
        ctx.fillText(truncated, x + 20, y + cellHeight - 40)
      }

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'storyboard.png'
      link.click()
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  const isDownloadDisabled = imagesData.some(({ url }) => !url)

  const gridCols = layout === 1 ? 'grid-cols-2' : 'grid-cols-3'
  const gridRows = layout === 2 ? 'grid-rows-2' : layout === 3 ? 'grid-rows-3' : ''

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-fit">
        <h1 className="text-xs md:text-sm text-muted-foreground mb-2">Layout {layout}</h1>
        <div className={`grid ${gridCols} ${gridRows} md:gap-1 gap-0.5`}>
          {imagesData.map((_, i) => (
            <ImageGenerator
              key={i}
              index={i}
              onImageChange={onImageChange}
            />
          ))}
        </div>
        <Button
          onClick={handleDownload}
          className="mt-2 w-full sm:text-sm text-xs"
          variant="outline"
          disabled={isDownloadDisabled || isDownloading}
        >
          {isDownloading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            'Download'
          )}
        </Button>
      </div>
    </div>
  )
}
