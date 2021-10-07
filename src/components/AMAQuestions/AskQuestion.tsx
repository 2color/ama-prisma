import * as React from 'react'
import { Textarea } from '~/components/Input'
import { addAMAQuestion } from '~/lib/api'
import { ErrorAlert, SuccessAlert } from '../Alert'
import Button from '../Button'

export default function AddBookmark() {
  const [question, setQuestion] = React.useState('')
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  const handleAddQuestion = React.useCallback(
    async (e) => {
      setSuccess(false)
      e.preventDefault()
      if (!question) return
      try {
        const createdComment = await addAMAQuestion(question)
        setQuestion('')
        setSuccess(true)
      } catch (e) {
        setError(e.toString())
        setQuestion('')
      }
      // setPostingComment(false)
      // setComment('')
      // setComments((comments) => [...comments, createdComment])
    },
    [question]
  )
  // const [handleAddAMAQuestion] = useAddAmaQuestionMutation({
  //   onCompleted: () => {
  //     setQuestion('')
  //     setSuccess(true)
  //   },
  //   onError({ message }) {
  //     const clean = message.replace('GraphQL error:', '')
  //     setError(clean)
  //     setQuestion('')
  //   },
  // })

  function onQuestionChange(e) {
    error && setError('')
    return setQuestion(e.target.value)
  }

  function onKeyDown(e) {
    if (e.keyCode === 13 && e.metaKey) {
      return onSubmit(e)
    }
  }

  return (
    <form className="items-stretch space-y-4" onSubmit={handleAddQuestion}>
      <Textarea
        value={question}
        placeholder="Ask me anything..."
        onChange={onQuestionChange}
        onKeyDown={onKeyDown}
      />
      {question.length > 0 && (
        <div className="flex self-end">
          <Button onClick={handleAddQuestion}>Ask away!</Button>
        </div>
      )}
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {success && (
        <SuccessAlert>
          Thanks for asking! I’ll reply soon, so feel free to check back 👋
        </SuccessAlert>
      )}
    </form>
  )
}
