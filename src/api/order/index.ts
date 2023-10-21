import { request } from "@/utils/service"
import type * as Order from "./types/order"

/** 增 */
export function createOrderDataApi(data: Order.GetOrderData) {
  return request({
    url: "order/addOrder",
    method: "post",
    data
  })
}

/** 删 */
export function deleteOrderDataApi(data: []) {
  return request({
    url: `order/deleteOrder/`,
    method: "delete",
    data
  })
}

/** 改 */
export function updateOrderDataApi(data: Order.GetOrderData) {
  return request({
    url: "order/updateOrder",
    method: "post",
    data
  })
}

/** 查 */
export function getOrderDataApi(data: Order.GetOrderData, params: { size: number; current: number }) {
  return request<Order.GetOrderResponseData>({
    url: `order/getOrderPageList?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getOrderInfoApi(params: any) {
  return request<Order.GetOrderData>({
    url: `order/getOrderInfo?orderId=${params.orderId}`,
    method: "get" // 使用POST请求
  })
}
