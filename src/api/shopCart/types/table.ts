export interface CreateShoppingCartRequestData {
  shoppingId?: string
  orderId: string
  count?: number
  ownName: string
  createTime?: string
  updateTime?: string
}

export interface UpdateShoppingCartRequestData {
  shoppingId: string
  orderId: string
  count: number
  ownName: string
  createTime: string
  updateTime: string
}

export interface GetShoppingCartRequestData {
  shoppingId: string
  orderId: string
  count: number
  ownName: string
  createTime: string
  updateTime: string
}

export interface GetShoppingCartData {
  shoppingId: string
  orderId: string
  count: number
  ownName: string
  createTime: string
  updateTime: string
}

export type GetShoppingCartResponseData = ApiResponseData<{
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
