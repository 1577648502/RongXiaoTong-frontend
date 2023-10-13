import { request } from "@/utils/service"
import type * as Reserve from "./types/table"

/** 增 */
export function createReserveDataApi(data: Reserve.CreateReserveRequestData) {
  return request({
    url: "reserve/addReserve",
    method: "post",
    data
  })
}

/** 删 */
export function deleteReserveDataApi(id: string) {
  return request({
    url: `reserve/deleteReserve/?reserveId=`+id,
    method: "get"
  })
}

/** 改 */
export function updateReserveDataApi(data: Reserve.UpdateReserveRequestData) {
  return request({
    url: "reserve/updateReserve",
    method: "post",
    data
  })
}



/** 查 */
export function getReserveDataApi(data,params: Reserve.GetReserveRequestData) {
  return request<Reserve.GetReserveResponseData>({
    url: `reserve/getReservePageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getReserveInfoApi(params: Reserve.GetReserveRequestData) {
  return request<Reserve.GetReserveResponseData>({
    url: `reserve/getReserveInfo?reserveId=${params}`,
    method: "get", // 使用POST请求
  })
}

