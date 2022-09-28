import { Ama } from '@prisma/client'

// To avoid type errors with the Prisma.JsonValue type, override the audioWaveform type
export type AmaQuestion = Omit<Ama, 'audioWaveform'> & {
  audioWaveform: number[] | null
}

export type UpdateAmaQuestion = Pick<
  AmaQuestion,
  'answer' | 'question' | 'audioUrl' | 'audioWaveform' | 'status' | 'cid'
>

export type AmaReactionsResponse = Pick<Ama, 'id' | 'reactions' | 'status'>
