import * as React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Textarea } from '~/components/Input'
import { addAMAQuestion } from '~/lib/api'
import { ErrorAlert, SuccessAlert } from '../Alert'
import Button from '../Button'

export default function AskQuestion() {
  const [question, setQuestion] = React.useState('')
  // const [error, setError] = React.useState('')
  // const [success, setSuccess] = React.useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation(addAMAQuestion, {
    onSuccess: (data, variables, context) => {
      // Invalidate pending questions so that the new question is rendered automatically.
      queryClient.invalidateQueries(['questions', 'UNANSWERED'])
    },
    onError: (error, variables, context) => {},
    onSettled(data, error) {
      setQuestion('')
    },
  })

  const onCreateAMA = React.useCallback(
    (e) => {
      e.preventDefault()
      mutation.mutate(question)
    },
    [mutation, question]
  )

  // const handleAddQuestion = React.useCallback(
  //   async (e) => {

  //     e.preventDefault()
  //     if (!question) return
  //     try {
  //       const createdComment = await addAMAQuestion(question)
  //       setQuestion('')

  //     } catch (e) {
  //       setQuestion('')
  //     }
  //   },
  //   [question, setQuestion, setSuccess]
  // )
  // const [handleAddAMAQuestion] = useAddAmaQuestionMutation({
  //   onCompleted: () => {
  //     setSuccess(true)
  //   },
  //   onError({ message }) {
  //     const clean = message.replace('GraphQL error:', '')
  //     setError(clean)
  //     setQuestion('')
  //   },
  // })

  function onQuestionChange(e) {
    mutation.error && mutation.reset()
    return setQuestion(e.target.value)
  }

  function onKeyDown(e) {
    if (e.keyCode === 13 && e.metaKey) {
      return onCreateAMA(e)
    }
  }

  return (
    <form className="items-stretch space-y-4" onSubmit={onCreateAMA}>
      <Textarea
        value={question}
        placeholder="Ask me anything..."
        onChange={onQuestionChange}
        onKeyDown={onKeyDown}
      />
      {question.length > 0 && (
        <div className="flex self-end">
          <Button onClick={onCreateAMA}>Ask away!</Button>
        </div>
      )}
      {mutation.isError && <ErrorAlert>{mutation.error.toString()}</ErrorAlert>}
      {mutation.isSuccess && (
        <SuccessAlert>
          Thanks for asking! I’ll reply soon, so feel free to check back 👋
        </SuccessAlert>
      )}
    </form>
  )
}
