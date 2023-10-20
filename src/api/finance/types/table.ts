export interface CreateFinanceRequestData {
  financeId: number
  bankId: number
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: number
  createTime: string
  updateTime: string
  combinationName1: null
  combinationPhone1: null
  combinationIdnum1: null
  combinationName2: null
  combinationPhone2: null
  combinationIdnum2: null
  fileInfo: string
}

export interface UpdateFinanceRequestData {
  financeId: number
  bankId: number
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: number
  createTime: string
  updateTime: string
  combinationName1: null
  combinationPhone1: null
  combinationIdnum1: null
  combinationName2: null
  combinationPhone2: null
  combinationIdnum2: null
  fileInfo: string
}

export interface GetFinanceRequestData {
  financeId: number
  bankId: number
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: number
  createTime: string
  updateTime: string
  combinationName1: null
  combinationPhone1: null
  combinationIdnum1: null
  combinationName2: null
  combinationPhone2: null
  combinationIdnum2: null
  fileInfo: string
}

export interface GetOrderData {
  financeId: number
  bankId: number
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: number
  createTime: string
  updateTime: string
  combinationName1: null
  combinationPhone1: null
  combinationIdnum1: null
  combinationName2: null
  combinationPhone2: null
  combinationIdnum2: null
  fileInfo: string
}

export type GetFinanceResponseData = ApiResponseData<{
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
