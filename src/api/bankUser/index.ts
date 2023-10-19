import { request } from "@/utils/service"
import type * as BankUser from "./types/table"

/** 增 */
export function createBankUserDataApi(data: BankUser.CreateBankUserRequestData) {
  return request({
    url: "bankUser/addBankUser",
    method: "post",
    data
  })
}

/** 删 */
export function deleteBankUserDataApi(id: string) {
  return request({
    url: `bankUser/deleteBankUser/?bankUserId=` + id,
    method: "get"
  })
}

/** 改 */
export function updateBankUserDataApi(data: BankUser.UpdateBankUserRequestData) {
  return request({
    url: "bankUser/updateBankUser",
    method: "post",
    data
  })
}

/** 查 */
export function getBankUserDataApi(data, params: BankUser.GetBankUserRequestData) {
  return request<BankUser.GetBankUserResponseData>({
    url: `bankUser/getBankUserPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getBankUserInfoApi(params: BankUser.GetBankUserRequestData) {
  return request<BankUser.GetBankUserResponseData>({
    url: `bankUser/getBankUserInfo?bankUserId=${params}`,
    method: "get" // 使用POST请求
  })
}
