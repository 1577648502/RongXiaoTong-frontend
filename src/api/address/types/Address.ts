export interface CreateOrderRequestData {
  ownName: string
  consignee: string
  phone: string
  addressDetail: string
}

export interface UpdateOrderRequestData {
  ownName: string
  consignee: string
  phone: string
  addressDetail: string
}

export interface GetAddressData {
  ownName: string
  consignee: string
  phone: string
  addressDetail: string
  isDefault: number
}
export interface GetAddressResponseData {
  code: number
  data: GetAddressData[]
  map: object
  msg: string
}
export interface DeleteAddressData {
  addressId: string
}
