export interface CreateFinanceRequestData {
  financeId: number
  bankId: string
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: string
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
  bankId: string
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: string
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
  bankId: string
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: string
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

export interface GetFinanceData {
  financeId: number
  bankId: string
  ownName: string
  realName: string
  phone: string
  idNum: string
  status: number
  remark: null
  money: number
  rate: number
  repayment: string
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
// export type GetFinanceResponseData = {
//   code: number
//   msg: null
//   data: GetFinanceData[]
//   map: object
// }

export type GetFinanceResponseData = ApiResponseData<{
  code: number
  msg: null
  data: GetFinanceData[]
  map: object
}>
