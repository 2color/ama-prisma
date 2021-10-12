import { AmaQuestion, UpdateAmaQuestion } from '~/types/Ama'
import { UploadSignatureMetadata } from '~/types/Upload'

export const addAMAQuestion = async (question: string): Promise<any> => {
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({ question }),
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}

export const incrementAMAReactions = async (amaId: string): Promise<any> => {
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
  const response = await fetch(`/api/answers/`, {
    method: 'POST',
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}


export const updateAMAQuestion = async (amaId: string, question: UpdateAmaQuestion): Promise<any> => {
  const response = await fetch(`/api/questions/${amaId}`, {
    method: 'PUT',
    body: JSON.stringify({ question }),
  })
  if (!response.ok) throw new Error(response.statusText)

  return response.json()
}