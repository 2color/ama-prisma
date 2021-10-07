import { Ama } from '@prisma/client'

export type AmaQuestion = Omit<Ama, 'audioWaveform' | 'updatedAt'> & {
  audioWaveform: number[] | null
  updatedAt: string
}
