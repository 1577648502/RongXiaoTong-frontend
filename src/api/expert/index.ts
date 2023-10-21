import { request } from "@/utils/service"
import type * as Expert from "./types/table"

/** 增 */
export function createExpertDataApi(data: Expert.GetExpertResponseData) {
  return request({
    url: "expert/addExpert",
    method: "post",
    data
  })
}

/** 删 */
export function deleteExpertDataApi(id: string) {
  return request({
    url: `expert/deleteExpert/?expertId=` + id,
    method: "get"
  })
}

/** 改 */
export function updateExpertDataApi(data: Expert.GetExpertResponseData) {
  return request({
    url: "expert/updateExpert",
    method: "post",
    data
  })
}

/** 查 */
export function getExpertDataApi(data: Expert.GetExpertData, params: { size: number; current: number }) {
  return request<Expert.GetExpertData>({
    url: `expert/getExpertPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getExpertInfoApi(params: Expert.GetExpertResponseData) {
  return request<Expert.GetExpertResponseData>({
    url: `expert/getExpertInfo?expertId=${params}`,
    method: "get" // 使用POST请求
  })
}
