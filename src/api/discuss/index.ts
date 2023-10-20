import { request } from "@/utils/service"
import type * as Discuss from "./types/table"

/** 增 */
export function createDiscussDataApi(data: Discuss.CreateDiscussRequestData) {
  return request({
    url: "discuss/addDiscuss",
    method: "post",
    data
  })
}

/** 删 */
export function deleteDiscussDataApi(id: string) {
  return request({
    url: `discuss/deleteDiscuss/?discussId=` + id,
    method: "get"
  })
}

/** 改 */
export function updateDiscussDataApi(data: Discuss.UpdateDiscussRequestData) {
  return request({
    url: "discuss/updateDiscuss",
    method: "post",
    data
  })
}

/** 查 */
export function getDiscussDataApi(data: Discuss.GetDiscussData, params: { size: number; current: number }) {
  return request<Discuss.GetDiscussRequestData>({
    url: `discuss/getDiscussPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getDiscussInfoApi(params: Discuss.GetDiscussRequestData) {
  return request<Discuss.GetDiscussResponseData>({
    url: `discuss/getDiscussInfo?discussId=${params}`,
    method: "get" // 使用POST请求
  })
}
