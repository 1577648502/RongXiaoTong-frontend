import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "user/login",
    method: "post",
    data
  })
}
/** 注册 */
export function registerApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "user/register",
    method: "post",
    data
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
    url: `user/info/`,
    method: "get"
  })
}

/**注销 */
export function logoutApi() {
  return request<Login.UserInfoResponseData>({
    url: `user/logout/`,
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
export function getUserDataApi(data: Login.LoginResponseData, params: { size: number; current: number }) {
  return request<Login.LoginResponseData>({
    url: `user/getPageUser?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}

/** 删 */
export function deleteUserDataApi(data: []) {
  return request({
    url: `user/delUser/`,
    method: "delete",
    data
  })
}
