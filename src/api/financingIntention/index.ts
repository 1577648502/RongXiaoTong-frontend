import { request } from "@/utils/service"
import type * as FinancingIntention from "./types/table"

/** 增 */
export function createFinancingIntentionDataApi(data: FinancingIntention.CreateFinancingIntentionRequestData) {
  return request({
    url: "financingIntention/addFinancingIntention",
    method: "post",
    data
  })
}

/** 删 */
export function deleteFinancingIntentionDataApi(id: string) {
  return request({
    url: `financingIntention/deleteFinancingIntention/?financingIntentionId=` + id,
    method: "get"
  })
}

/** 改 */
export function updateFinancingIntentionDataApi(data: FinancingIntention.UpdateFinancingIntentionRequestData) {
  return request({
    url: "financingIntention/updateFinancingIntention",
    method: "post",
    data
  })
}

/** 查 */
export function getFinancingIntentionDataApi(data, params: FinancingIntention.GetFinancingIntentionRequestData) {
  return request<FinancingIntention.GetFinancingIntentionResponseData>({
    url: `financingIntention/getFinancingIntentionPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getFinancingIntentionInfoApi(params: FinancingIntention.GetFinancingIntentionRequestData) {
  return request<FinancingIntention.GetFinancingIntentionResponseData>({
    url: `financingIntention/getFinancingIntentionInfo?financingIntentionId=${params}`,
    method: "get" // 使用POST请求
  })
}
