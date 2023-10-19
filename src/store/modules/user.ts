import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi, registerApi } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import { type RouteRecordRaw } from "vue-router"
import routeSettings from "@/config/route"
import { lowerFirst } from "lodash-es"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")
  const userInfo = ref<any>({})

  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = [value]
  }
  /** 登录 */
  const login = async ({ userName, password }: LoginRequestData) => {
    const { data } = await loginApi({ userName, password })
    setToken(data.id)
    token.value = data.id
    userInfo.value = data
  }
  /** 注册 */
  const register = async ({ userName, password }: LoginRequestData) => {
    const { data } = await registerApi({ userName, password })
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.userName
    userInfo.value = data
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.role?.length > 0 ? [data.role] : routeSettings.defaultRoles
    // permissionStore.setRoutes(roles.value)
  }
  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, username, userInfo, setRoles, login, register, getInfo, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
