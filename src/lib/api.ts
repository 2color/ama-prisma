export const addAMAQuestion = async (question: string): Promise<any> => {
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({ question }),
  })
  const responseBody = await response.json()
  return responseBody
}
