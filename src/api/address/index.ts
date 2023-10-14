import { request } from "@/utils/service"
import type * as Address from "./types/table"

/** 增 */
export function createAddressDataApi(data: Address.CreateAddressRequestData) {
  return request({
    url: "address/addAddress",
    method: "post",
    data
  })
}

/** 删 */
export function deleteAddressDataApi(id: string) {
  return request({
    url: `address/deleteAddress/?addressId=`+id,
    method: "get"
  })
}

/** 改 */
export function updateAddressDataApi(data: Address.UpdateAddressRequestData) {
  return request({
    url: "address/updateAddress",
    method: "post",
    data
  })
}
/** 设置默认收货地址 */
export function setDefaultAddressApi(data: Address.UpdateAddressRequestData) {
  return request({
    url: "address/setDefaultAddress?defaultAddress="+data.defaultAddress+"&newAddress="+data.newAddress,
    method: "get",
  })
}



/** 查 */
export function getAddressDataApi(data: Address.GetAddressRequestData) {
  return request<Address.GetAddressResponseData>({
    url: `address/getAddressPageList`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查 */
export function getAddressInfoApi(params: Address.GetAddressRequestData) {
  return request<Address.GetAddressResponseData>({
    url: `address/getAddressInfo?addressId=${params}`,
    method: "get", // 使用POST请求
  })
}

