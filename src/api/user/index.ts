import { request } from "@/utils/service"
import type * as Login from "./types/login"
import {LoginResponseData} from "./types/login";

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function uploadApi(params) {
  const formData = new FormData()
  formData.append('image', params.file)
  // axios的二次封装
  return  request({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}
/** 注册 */
export function modifyUserApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "user/modifyUser",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "user/info",
    method: "get"
  })
}

//
// /** 查 */
// export function getUserDataApi(data,params: Login.LoginResponseData) {
//   return request<Login.LoginResponseData>({
//     url: `user/getPageUser`,
//     method: "get",
//     data:{},
//     params
//   })
// }
/** 查 */
export function getUserDataApi(data,params: Login.LoginResponseData) {
  return request<Login.LoginResponseData>({
    url: `user/getPageUser?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}

/** 删 */
export function deleteUserDataApi(id: string) {
  return request({
    url: `user/delUser/${id}`,
    method: "delete"
  })
}
