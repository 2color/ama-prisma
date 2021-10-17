import { UploadApiResponse } from 'cloudinary'
import {
  AmaQuestion,
  AmaReactionsResponse,
  UpdateAmaQuestion,
} from '~/types/Ama'
import { UploadSignatureMetadata } from '~/types/Upload'
import { Visitor } from '@prisma/client'

export const addAMAQuestion = async (
  question: string
): Promise<AmaQuestion[]> => {
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({ question }),
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}

export const incrementAMAReactions = async (
  amaId: string
): Promise<AmaReactionsResponse> => {
  const response = await fetch(`/api/questions/${amaId}/reactions`, {
    method: 'PUT',
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}

export const deleteAma = async (amaId: string): Promise<void> => {
  const response = await fetch(`/api/questions/${amaId}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error(response.statusText)

  return
}

export const getQuestions = async (
  answered: boolean
): Promise<AmaQuestion[]> => {
  const response = await fetch(
    `/api/questions?status=${answered ? 'ANSWERED' : 'UNANSWERED'}`,
    {
      method: 'GET',
    }
  )
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}

export const signUpload = async (): Promise<UploadSignatureMetadata> => {
  const response = await fetch(`/api/answers/sign`, {
    method: 'POST',
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}

export const updateAMAQuestion = async (
  amaId: string,
  question: UpdateAmaQuestion
): Promise<any> => {
  const response = await fetch(`/api/questions/${amaId}`, {
    method: 'PUT',
    body: JSON.stringify({ question }),
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}
export async function uploadToCloudinary(
  blob: Blob,
  folder: string,
  timestamp: string | Blob,
  signature: string
): Promise<UploadApiResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`
  const formData = new FormData()

  formData.append('file', blob)
  formData.append('folder', folder)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)
  formData.append('api_key', process.env.CLOUDINARY_API_KEY)
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
  // If recorded on Chrome which currently only supports .webm recording
  // This parameter will tell cloudinary to transform to mp4 for cross browser compatibility
  formData.append('format', 'mp4')

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const getVisitors = async (): Promise<number> => {
  const response = await fetch(`/api/visitors`, {
    method: 'GET',
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}
