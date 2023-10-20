export interface CreateShoppingCartRequestData {
  username: string
  password: string
}

export interface UpdateShoppingCartRequestData {
  id: string
  username: string
  password?: string
}

export interface GetShoppingCartRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  phone?: string
}

export interface GetShoppingCartData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
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
