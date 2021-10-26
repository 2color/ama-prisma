// @ts-check
import http from 'k6/http'
// @ts-ignore
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

import { check, fail, sleep, group } from 'k6'
import { Trend } from 'k6/metrics'

let CreateQuestionTrend = new Trend('Create question', true)
let GetQuestionsTrend = new Trend('Get questions', true)
let LikeQuestionTrend = new Trend('Like question', true)

export let options = {
  vus: 100,
  duration: '10s',
  summaryTimeUnit: 'ms',
  summaryTrendStats: ['avg', 'max', 'p(95)', 'count'],
}

const SLEEP_DURATION = 0.1

// const apiUrl = 'http://localhost:3000/api'
const apiUrl = `https://${__ENV.API_URL}/api`

// Get questions      http localhost:3000/api/posts/1
// Add question       http POST localhost:3000/api/posts
// like question      http POST localhost:3000/api/posts

export default function () {
  group('user flow', function () {
    // Get questions
    let getPostsRes = http.get(`${apiUrl}/questions?status=ANSWERED`)
    check(getPostsRes, { 'status 200 (get posts)': (r) => r.status == 200 })
    GetQuestionsTrend.add(getPostsRes.timings.duration)

    sleep(SLEEP_DURATION)

    // Create question
    let createQuestionRes = http.post(
      `${apiUrl}/questions`,
      JSON.stringify({
        question: 'How do you load test?',
      })
    )
    check(createQuestionRes, {
      'status 200 (create question)': (r) => r.status == 200,
    })
    CreateQuestionTrend.add(createQuestionRes.timings.duration)
    let createdQuestionId
    try {
      createdQuestionId = JSON.parse(String(createQuestionRes.body)).id
    } catch (e) {
      return
    }

    sleep(SLEEP_DURATION)
    // Add view to post
    let createLikeRes = http.put(
      `${apiUrl}/questions/${createdQuestionId}/reactions`
    )
    check(createLikeRes, {
      'status 200 (like question)': (r) => r.status == 200,
    })
    LikeQuestionTrend.add(createLikeRes.timings.duration)

    sleep(SLEEP_DURATION)
  })
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}
