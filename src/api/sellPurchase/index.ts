import { request } from "@/utils/service"
import type * as SellPurchase from "./types/table"

/** 增 */
export function createSellPurchaseDataApi(data: SellPurchase.CreateSellPurchaseRequestData) {
  return request({
    url: "sellPurchase/addSellPurchase",
    method: "post",
    data
  })
}

/** 删 */
export function deleteSellPurchaseDataApi(id: string) {
  return request({
    url: `sellPurchase/deleteSellPurchase/?sellPurchaseId=`+id,
    method: "get"
  })
}

/** 改 */
export function updateSellPurchaseDataApi(data: SellPurchase.UpdateSellPurchaseRequestData) {
  return request({
    url: "sellPurchase/updateSellPurchase",
    method: "post",
    data
  })
}



/** 查 */
export function getSellPurchaseDataApi(data,params: SellPurchase.GetSellPurchaseRequestData) {
  return request<SellPurchase.GetSellPurchaseResponseData>({
    url: `sellPurchase/getSellPurchasePageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getSellPurchaseInfoApi(params: SellPurchase.GetSellPurchaseRequestData) {
  return request<SellPurchase.GetSellPurchaseResponseData>({
    url: `sellPurchase/getSellPurchaseInfo?sellPurchaseId=${params}`,
    method: "get", // 使用POST请求
  })
}

