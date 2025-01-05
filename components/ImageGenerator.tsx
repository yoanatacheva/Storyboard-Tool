'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { generateImage } from '@/app/actions'
import { Edit, ArrowLeft, ArrowUp } from 'lucide-react'

interface ImageGeneratorProps {
  index: number;
  onImageChange: (index: number, url: string, description: string) => void;
}

export function ImageGenerator({ index, onImageChange }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')

    const formattedPrompt = `Generate a black and white image of ${prompt} in the style of YOMICS.`

    try {
      const result = await generateImage(formattedPrompt)
      if (result.success && result.imageUrl) {
        setImageUrl(result.imageUrl)
        setDescription(prompt)
        setIsEditing(false)
        onImageChange(index, result.imageUrl, prompt)
      } else {
        setError('Failed to generate image')
      }
    } catch (err: unknown) {
      console.error('Error generating image:', err)
      setError('An error occurred while generating the image')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleGoBack = () => {
    setIsEditing(false)
  }

  return (
    <div className="relative flex flex-col items-center justify-center imageGeneratorTile bg-foreground dark:bg-white rounded-[1.5px] lg:rounded-sm overflow-hidden">
      {imageUrl && !isEditing && !isLoading ? (
        <div className="relative w-full h-full">
          <Image 
            src={imageUrl} 
            alt="Generated image" 
            fill
            className="object-cover lg:rounded-sm"/>
          <div className="absolute inset-x-0 bottom-0 p-2 bg-white dark:bg-black opacity-85">
            <p className="text-foreground text-xs sm:text-sm line-clamp-2">{description}</p>
          </div>
          <Button
            size="icon"
            variant="outline"
            className="absolute top-2 left-2 z-10"
            onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <Textarea 
            placeholder="Describe your storyboard image"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="font-geist flex-1 bg-transparent border-0 shadow-none resize-none p-4 text-secondary selection:bg-[#ffffff] selection:text-[#000000] dark:selection:bg-[#000000] dark:selection:text-[#ffffff]"/>
          {imageUrl && !isLoading && (
            <Button 
              size="icon"
              variant="outline"
              className="font-geist absolute bottom-2 left-2 z-10"
              onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="outline"
            className="font-geist absolute bottom-2 right-2 z-20"
            onClick={handleSubmit}
            disabled={isLoading || !prompt}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />) : (<ArrowUp className="h-4 w-4" />)}
          </Button>
        </>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center z-10">
          <div className="text-xs sm:text-sm text-muted-foreground">Generating...</div>
        </div>
      )}
      {error && (
        <p className="text-red-500 text-xs absolute bottom-0 left-0 right-0 text-center">{error}</p>
      )}
    </div>
  )
}