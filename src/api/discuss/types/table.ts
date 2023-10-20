export interface CreateDiscussRequestData {
  discussId: number
  knowledgeId: number
  ownName: string
  content: string
  createTime: string
}

export interface UpdateDiscussRequestData {
  discussId: number
  knowledgeId: number
  ownName: string
  content: string
  createTime: string
}

export interface GetDiscussRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  username?: string
  /** 查询参数：手机号 */
  phone?: string
}

export interface GetDiscussData {
  discussId: number
  knowledgeId: number
  ownName: string
  content: string
  createTime: string
}

export type GetDiscussResponseData = ApiResponseData<{
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
