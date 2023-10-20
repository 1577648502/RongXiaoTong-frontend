export interface CreateBankRequestData {
  bankId: number
  bankName: string
  introduce: string
  bankPhone: string
  money: number
  rate: number
  repayment: number
}

export interface UpdateBankRequestData {
  bankId: number
  bankName: string
  introduce: string
  bankPhone: string
  money: number
  rate: number
  repayment: number
}

export interface GetBankRequestData {
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
}

export interface GetBankData {
  bankId: number
  bankName: string
  introduce: string
  bankPhone: string
  money: number
  rate: number
  repayment: number
}

export type GetBankResponseData = ApiResponseData<{
  list: GetBankData[]
  total: number
}>
