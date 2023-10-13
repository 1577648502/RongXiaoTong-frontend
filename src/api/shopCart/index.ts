import { request } from "@/utils/service"
import type * as ShoppingCart from "./types/table"

/** 增 */
export function createShoppingCartDataApi(data: ShoppingCart.CreateShoppingCartRequestData) {
  return request({
    url: "shoppingCart/addShoppingCart",
    method: "post",
    data
  })
}

/** 删 */
export function deleteShoppingCartDataApi(id: string) {
  return request({
    url: `shoppingCart/deleteShoppingCart/?shoppingCartId=`+id,
    method: "get"
  })
}

/** 改 */
export function updateShoppingCartDataApi(data: ShoppingCart.UpdateShoppingCartRequestData) {
  return request({
    url: "shoppingCart/updateShoppingCart",
    method: "post",
    data
  })
}



/** 查 */
export function getShoppingCartDataApi(data,params: ShoppingCart.GetShoppingCartRequestData) {
  return request<ShoppingCart.GetShoppingCartResponseData>({
    url: `shoppingCart/getShoppingCartPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getShoppingCartInfoApi(params: ShoppingCart.GetShoppingCartRequestData) {
  return request<ShoppingCart.GetShoppingCartResponseData>({
    url: `shoppingCart/getShoppingCartInfo?shoppingCartId=${params}`,
    method: "get", // 使用POST请求
  })
}

