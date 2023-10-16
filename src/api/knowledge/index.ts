import { request } from "@/utils/service"
import type * as Knowledge from "./types/table"

/** 增 */
export function createKnowledgeDataApi(data: Knowledge.CreateKnowledgeRequestData) {
  return request({
    url: "knowledge/addKnowledge",
    method: "post",
    data
  })
}

/** 删 */
export function deleteKnowledgeDataApi(ids: []) {
  return request({
    url: `knowledge/deleteKnowledge/`,
    method: "delete",
    data: ids
  })
}

/** 改 */
export function updateKnowledgeDataApi(data: Knowledge.UpdateKnowledgeRequestData) {
  return request({
    url: "knowledge/updateKnowledge",
    method: "post",
    data
  })
}



/** 查 */
export function getKnowledgeDataApi(data,params: Knowledge.GetKnowledgeRequestData) {
  return request<Knowledge.GetKnowledgeResponseData>({
    url: `knowledge/getKnowledgePageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getKnowledgeInfoApi(params: Knowledge.GetKnowledgeRequestData) {
  return request<Knowledge.GetKnowledgeResponseData>({
    url: `knowledge/getKnowledgeInfo?knowledgeId=${params}`,
    method: "get", // 使用POST请求
  })
}

