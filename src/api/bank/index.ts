import { request } from "@/utils/service"
import type * as Bank from "./types/table"

/** 增 */
export function createBankDataApi(data: Bank.CreateBankRequestData) {
  return request({
    url: "bank/addBank",
    method: "post",
    data
  })
}

/** 删 */
export function deleteBankDataApi(id: string) {
  return request({
    url: `bank/deleteBank/?bankId=` + id,
    method: "get"
  })
}

/** 改 */
export function updateBankDataApi(data: Bank.UpdateBankRequestData) {
  return request({
    url: "bank/updateBank",
    method: "post",
    data
  })
}

/** 查 */
export function getBankDataApi(data, params: Bank.GetBankRequestData) {
  return request<Bank.GetBankResponseData>({
    url: `bank/getBankPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getBankInfoApi(params: Bank.GetBankRequestData) {
  return request<Bank.GetBankResponseData>({
    url: `bank/getBankInfo?bankId=${params}`,
    method: "get" // 使用POST请求
  })
}
