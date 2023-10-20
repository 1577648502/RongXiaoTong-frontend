export interface CreateKnowledgeRequestData {
  knowledgeId: number
  title: string
  content: string
  picPath: string
  ownName: string
  createTime: number
  updateTime: string
}

export interface UpdateKnowledgeRequestData {
  knowledgeId: number
  title: string
  content: string
  picPath: string
  ownName: string
  createTime: number
  updateTime: string
}

export interface GetKnowledgeRequestData {
  knowledgeId: number
  title: string
  content: string
  picPath: string
  ownName: string
  createTime: number
  updateTime: string
}

export interface GetKnowledgeData {
  knowledgeId: number
  title: string
  content: string
  picPath: string
  ownName: string
  createTime: number
  updateTime: string
}

export type GetKnowledgeResponseData = ApiResponseData<{
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
