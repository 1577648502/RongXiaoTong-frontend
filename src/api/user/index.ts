import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 登录并返回 Token */
export function uploadApi(params) {
  const formData = new FormData()
  formData.append("file", params.file)
  // axios的二次封装
  return request({
    url: "/file/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
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
export function getUserDataApi(data, params: Login.LoginResponseData) {
  return request<Login.LoginResponseData>({
    url: `user/getPageUser?size=${params.size}&current=${params.current}`,
    method: "post", // 使用POST请求
    data // 将JSON数据放在请求体中
  })
}

/** 查头像 */
export function getUserImgApi(userName: Login.LoginResponseData) {
  return request<Login.LoginResponseData>({
    url: `user/getUserImg?userName=` + userName,
    method: "get" // 使用POST请求
  })
}

/** 改 */
export function updateUserDataApi(data: Login.UpdateUserData) {
  return request({
    url: "user/updateUser",
    method: "post",
    data
  })
}

/** 删 */
export function deleteUserDataApi(id: string) {
  return request({
    url: `user/delUser/${id}`,
    method: "delete"
  })
}
