export interface CreateExpertRequestData {
  userName: string
  realName: string
  phone: string
  profession: string
  position: string
  belong: string
}

export interface UpdateExpertRequestData {
  userName: string
  realName: string
  phone: string
  profession: string
  position: string
  belong: string
}

export interface GetExpertRequestData {
  userName: string
  realName: string
  phone: string
  profession: string
  position: string
  belong: string
}

export interface GetExpertData {
  userName: string
  realName: string
  phone: string
  profession: string
  position: string
  belong: string
}

export type GetExpertResponseData = ApiResponseData<{
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
