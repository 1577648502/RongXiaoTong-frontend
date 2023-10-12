import {n} from "vitest/dist/reporters-cb94c88b";

export interface LoginRequestData {
  /** admin 或 editor */
  userName: "admin" | "editor"
  /** 密码 */
  password: string
  // /** 验证码 */
  // code: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{
  token: string;
  id: string
  type: number
  name: string
  sex: number
  phone: string
  serName: string
  updateTime:  string
  createTime: string
  avatar: string
  role: string
  isDelete: number
  size: number
  current:number
}>

export type UserInfoResponseData = ApiResponseData<{ userName: string; roles: string[] }>
