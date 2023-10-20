export interface CreateQuestionRequestData {
  id: number
  expertName: string
  questioner: string
  phone: string
  plantName: string
  title: string
  question: string
  answer: string
  status: number
}

export interface UpdateQuestionRequestData {
  id: number
  expertName: string
  questioner: string
  phone: string
  plantName: string
  title: string
  question: string
  answer: string
  status: number
}

export interface GetQuestionRequestData {
  id: number
  expertName: string
  questioner: string
  phone: string
  plantName: string
  title: string
  question: string
  answer: string
  status: number
}

export interface GetQuestionData {
  id: number
  expertName: string
  questioner: string
  phone: string
  plantName: string
  title: string
  question: string
  answer: string
  status: number
}

export type GetQuestionResponseData = ApiResponseData<{
  records: object[]
  total: number
  size: number
  current: number
  orders: []
  optimizeCountSql: boolean
  searchCount: boolean
  maxLimit: null
  countId: null
  pages: number
}>
