import React, { useState, useEffect } from 'react'
import Divider from '../Divider'
import { QuestionItem } from './QuestionItem'
import LoadingSpinner from '../LoadingSpinner'
import { getQuestions } from '~/lib/api'
import { useQuery } from 'react-query'

export default function PendingQuestion() {
  const { isLoading, data: questions } = useQuery(
    ['questions', 'pending'],
    () => getQuestions(false)
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!questions) return null

  return (
    <div className=" space-y-8">
      {questions.map((question) => (
        <QuestionItem editable={true} key={question.id} question={question} />
      ))}

      <Divider />
    </div>
  )
}
