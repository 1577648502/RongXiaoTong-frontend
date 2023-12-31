import { request } from "@/utils/service"
import type * as Address from "./types/Address"

/** 增 */
export function createAddressDataApi(data: Address.CreateAddressRequestData) {
  return request({
    url: "address/addAddress",
    method: "post",
    data
  })
}

/** 删 */
export function deleteAddressDataApi(addressId: Address.DeleteAddressData) {
  return request({
    url: `address/deleteAddress/?addressId=${addressId}`,
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
export function setDefaultAddressApi(data: { defaultAddress: number; newAddress: number }) {
  return request({
    url: `address/setDefaultAddress?defaultAddress=${data.defaultAddress}&newAddress=${data.newAddress}`,
    method: "get"
  })
}

/** 查所有 */
export function getAddressDataApi(data: Address.GetAddressData) {
  return request<Address.GetAddressResponseData>({
    url: `address/getAddressPageList`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}
/** 查详情 */
export function getAddressInfoApi(addressId: Address.DeleteAddressData) {
  return request<Address.GetAddressData>({
    url: `address/getAddressInfo?addressId=${addressId}`,
    method: "get" // 使用POST请求
  })
}
