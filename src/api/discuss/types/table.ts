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
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}

export type GetOrderResponseData = ApiResponseData<{
  list: GetOrderData[]
  total: number
}>
