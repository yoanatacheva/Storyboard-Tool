import { fal } from '@fal-ai/client'

if (typeof process.env.FAL_KEY !== 'string') {
  throw new Error('FAL_KEY environment variable is not set')
}

fal.config({
  credentials: process.env.FAL_KEY,
})

