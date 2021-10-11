export const addAMAQuestion = async (question: string): Promise<any> => {
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({ question }),
  })
  const responseBody = await response.json()

  if (response.ok) return responseBody

  throw new Error(response.statusText)
}

export const incrementAMAReactions = async (amaId: string): Promise<any> => {
  const response = await fetch(`/api/questions/${amaId}/reactions`, {
    method: 'PUT',
  })
  const responseBody = await response.json()

  if (response.ok) return responseBody

  throw new Error(response.statusText)
}

export const getQuestions = async (answered: boolean): Promise<any> => {
  const response = await fetch(`/api/questions?status=${answered ? 'ANSWERED' : 'UNANSWERED'}`, {
    method: 'GET',
  })
  const responseBody = await response.json()

  if (response.ok) return responseBody

  throw new Error(response.statusText)
}
