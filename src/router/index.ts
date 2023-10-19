import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/test",
    component: () => import("@/views/test.vue")
  },
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/goods",
    component: Layouts,
    redirect: "/goods-list",
    name: "商品管理",
    meta: {
      title: "商品管理",
      elIcon: "Box"
    },
    children: [
      {
        path: "/goods-list",
        component: () => import("@/views/goods/index.vue"),
        name: "商品货源",
        meta: {
          elIcon: "Box",
          title: "商品货源",
          keepAlive: true
        }
      },
      {
        path: "goods-admin",
        component: () => import("@/views/goods/goods-admin.vue"),
        name: "商品管理",
        meta: {
          elIcon: "Box",
          title: "商品管理",
          hidden: true,
          keepAlive: true
        }
      },
      {
        path: "goods-info/:orderId",
        component: () => import("@/views/goods/goodsInfo.vue"),
        name: "商品详情",
        meta: {
          elIcon: "Memo",
          title: "商品详情",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/purchase",
    component: Layouts,
    redirect: "/purchase",
    name: "收购需求",
    meta: {
      title: "收购需求",
      elIcon: "Box"
    },
    children: [
      {
        path: "/purchase",
        component: () => import("@/views/purchase/index.vue"),
        name: "收购需求",
        meta: {
          elIcon: "Box",
          title: "收购需求",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/knowledge",
    component: Layouts,
    redirect: "/knowledge",
    name: "农业知识",
    meta: {
      title: "农业知识",
      elIcon: "Box"
    },
    children: [
      {
        path: "/knowledge",
        component: () => import("@/views/knowledge/index.vue"),
        name: "农业知识",
        meta: {
          elIcon: "Box",
          title: "农业知识",
          keepAlive: true
        }
      },
      {
        path: "/knowledge/:knowledgeId",
        component: () => import("@/views/knowledge/KnowledgeInfo.vue"),
        name: "农业知识详情",
        meta: {
          elIcon: "Box",
          title: "农业知识详情",
          keepAlive: true,
          hidden: true
        }
      },
      {
        path: "/knowledge-admin/",
        component: () => import("@/views/knowledge/knowledge-admin.vue"),
        name: "农业知识管理",
        meta: {
          elIcon: "Box",
          title: "农业知识管理",
          keepAlive: true,
          hidden: true
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layouts,
    redirect: "/guide",
    name: "专家指导",
    meta: {
      title: "专家指导",
      elIcon: "Box"
    },
    children: [
      {
        path: "/guide",
        component: () => import("@/views/guide/index.vue"),
        name: "专家指导",
        meta: {
          elIcon: "Box",
          title: "专家指导",
          keepAlive: true
        }
      },
      {
        path: "/guide/:questionId",
        component: () => import("@/views/guide/guideInfo.vue"),
        name: "专家指导详情",
        meta: {
          elIcon: "Box",
          title: "专家指导详情",
          keepAlive: true,
          hidden: true
        }
      }
    ]
  },

  {
    path: "/question",
    component: Layouts,
    redirect: "/question/",
    name: "提问页",
    meta: {
      title: "提问页",
      elIcon: "Box",
      hidden: true
    },
    children: [
      {
        path: "/question/:expertName",
        component: () => import("@/views/question/index.vue"),
        name: "提问页",
        meta: {
          elIcon: "Box",
          title: "提问页",
          keepAlive: true,
          hidden: true
        }
      }
    ]
  },
  {
    path: "/reserve",
    component: Layouts,
    redirect: "/reserve",
    name: "预约页",
    meta: {
      title: "预约页",
      elIcon: "Box",
      hidden: true
    },
    children: [
      {
        path: "/reserve/:expertName",
        component: () => import("@/views/reserve/index.vue"),
        name: "预约页",
        meta: {
          elIcon: "Box",
          title: "预约页",
          keepAlive: true,
          hidden: true
        }
      }
    ]
  },
  {
    path: "/shopCart",
    component: Layouts,
    redirect: "/shopCart",
    name: "购物车",
    meta: {
      title: "购物车",
      elIcon: "Box"
    },
    children: [
      {
        path: "/shopCart",
        component: () => import("@/views/shopCart/index.vue"),
        name: "购物车",
        meta: {
          elIcon: "Box",
          title: "购物车",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/financing",
    component: Layouts,
    redirect: "/financing",
    name: "融资申请",
    meta: {
      title: "融资申请",
      elIcon: "Box"
    },
    children: [
      {
        path: "/smartMatch",
        component: () => import("@/views/financing/SmartMatchUser.vue"),
        name: "智能匹配",
        meta: {
          elIcon: "Box",
          title: "智能匹配",
          keepAlive: true
        }
      },
      {
        path: "/financing",
        component: () => import("@/views/financing/index.vue"),
        name: "融资申请",
        meta: {
          elIcon: "Box",
          title: "融资申请",
          keepAlive: true
        }
      },
      {
        path: "/financingDetails/:bankId",
        component: () => import("@/views/financing/FinancingDetails.vue"),
        name: "贷款中心",
        meta: {
          elIcon: "Box",
          title: "贷款中心",
          keepAlive: true,
          hidden: true
        }
      }
    ]
  }
  // {
  //   path: "/order",
  //   component: Layouts,
  //   redirect: "/order/order-list",
  //   name: "融资申请",
  //   meta: {
  //     title: "融资申请",
  //     elIcon: "Box",
  //   }
  // }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/user",
    component: Layouts,
    redirect: "/user/user-admin",
    name: "user",
    meta: {
      title: "用户",
      elIcon: "Grid",
      hidden: true
    },
    children: [
      {
        path: "user-admin",
        component: () => import("@/views/user/user-admin.vue"),
        name: "用户管理",
        meta: {
          elIcon: "Avatar",
          title: "用户管理",
          hidden: true,
          roles: ["admin"], // 可以在根路由中设置角色
          keepAlive: true
        }
      },
      {
        path: "/userInfo",
        component: () => import("@/views/user/UserInfo.vue"),
        name: "userInfo",
        meta: {
          title: "用户详情",
          svgIcon: "dashboard",
          hidden: true,
          keepAlive: true
        }
      },
      {
        path: "/userAddress",
        component: () => import("@/views/user/UserAddress.vue"),
        name: "userAddress",
        meta: {
          title: "用户地址",
          svgIcon: "dashboard",
          hidden: true,
          keepAlive: true
        }
      }
    ]
  },
  // {
  //   path: "/permission",
  //   component: Layouts,
  //   redirect: "/permission/page",
  //   name: "Permission",
  //   meta: {
  //     title: "权限管理",
  //     svgIcon: "lock",
  //     roles: ["admin", "editor"], // 可以在根路由中设置角色
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "page",
  //       component: () => import("@/views/permission/page.vue"),
  //       name: "PagePermission",
  //       meta: {
  //         title: "页面权限",
  //         roles: ["admin"] // 或者在子导航中设置角色
  //       }
  //     },
  //     {
  //       path: "directive",
  //       component: () => import("@/views/permission/directive.vue"),
  //       name: "DirectivePermission",
  //       meta: {
  //         title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
  //       }
  //     }
  //   ]
  // },

  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
