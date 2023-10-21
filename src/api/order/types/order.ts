export interface CreateOrderRequestData {
  username: string
  password: string
}

export interface UpdateOrderRequestData {
  id: string
  username: string
  password?: string
}

export interface GetOrderRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  phone?: string
}

export interface GetOrderData {
  orderId?: number
  title?: string
  price?: number
  content?: string
  orderStatus?: number
  type?: string
  picture?: string
  ownName?: string
  cooperationName?: null
  createTime: number
  updateTime: number
  address?: null
  version?: null
  isDelete?: number
}

export type GetOrderResponseData = ApiResponseData<{
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
