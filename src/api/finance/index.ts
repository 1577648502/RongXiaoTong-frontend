



import { request } from "@/utils/service"
import type * as Finance from "./types/table"

/** 增 */
export function createFinanceDataApi(data: Finance.CreateFinanceRequestData) {
  return request({
    url: "finance/addFinance",
    method: "post",
    data
  })
}

/** 删 */
export function deleteFinanceDataApi(id: string) {
  return request({
    url: `finance/deleteFinance/?financeId=`+id,
    method: "get"
  })
}

/** 改 */
export function updateFinanceDataApi(data: Finance.UpdateFinanceRequestData) {
  return request({
    url: "finance/updateFinance",
    method: "post",
    data
  })
}



/** 查 */
export function getFinanceDataApi(data,params: Finance.GetFinanceRequestData) {
  return request<Finance.GetFinanceResponseData>({
    url: `finance/getFinancePageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getFinanceInfoApi(params: Finance.GetFinanceRequestData) {
  return request<Finance.GetFinanceResponseData>({
    url: `finance/getFinanceInfo?bankId=${params}`,
    method: "get", // 使用POST请求
  })
}

