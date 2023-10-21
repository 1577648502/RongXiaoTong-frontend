export interface CreateFinancingIntentionRequestData {
  id: number
  userName: string
  realName: string
  address: string
  amount: number
  application: string
  item: string
  repaymentPeriod: string
  area: number
  phone: string
  createTime: string
  updateTime: string
}

export interface UpdateFinancingIntentionRequestData {
  id: number
  userName: string
  realName: string
  address: string
  amount: number
  application: string
  item: string
  repaymentPeriod: string
  area: number
  phone: string
  createTime: string
  updateTime: string
}

export interface GetFinancingIntentionRequestData {
  id: number
  userName: string
  realName: string
  address: string
  amount: number
  application: string
  item: string
  repaymentPeriod: string
  area: number
  phone: string
  createTime: string
  updateTime: string
}

export interface GetFinancingIntentionData {
  id: number
  userName: string
  realName: string
  address: string
  amount: number
  application: string
  item: string
  repaymentPeriod: string
  area: number
  phone: string
  createTime: string
  updateTime: string
}

export type GetFinancingIntentionResponseData = ApiResponseData<{
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
