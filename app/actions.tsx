'use server'
 
import { fal } from "@fal-ai/client"

if (!process.env.FAL_KEY) {
  throw new Error('FAL_KEY environment variable is not set')
}

fal.config({
  credentials: process.env.FAL_KEY
})

export async function generateImage(prompt: string) {
  try {
    const result = await fal.subscribe('fal-ai/flux-lora', {
      input: {
        prompt,
        image_size: 'square_hd',
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg',
        loras: [
          {
            path: "https://huggingface.co/yochita/yomics_latest_fal_ai/resolve/main/JlZbSMuW_TzmlGffFM7a5_pytorch_lora_weights.safetensors",
            scale: 1.2
          }
        ]
      },
    })
    return { success: true, imageUrl: result.data.images[0].url }
  } catch (error) {
    console.error('Error generating image:', error)
    return { success: false, error: 'Failed to generate image' }
  }
}

