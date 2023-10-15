<script lang="ts" setup>
import {reactive, ref} from "vue"
import {useRouter} from "vue-router"
import {useUserStore} from "@/store/modules/user"
import {ElMessage, type FormInstance, type FormRules} from "element-plus"
import {User, Lock, Key, Picture, Loading} from "@element-plus/icons-vue"
import {getLoginCodeApi} from "@/api/login"
import {type LoginRequestData} from "@/api/login/types/login"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"

const router = useRouter()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)

/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  userName: "admin",
  password: "admin",
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  userName: [{required: true, message: "请输入用户名", trigger: "blur"}],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur"}
  ]
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          ElMessage.success("登录成功")
          router.push({path: "/"})
        })
        .catch(() => {
          ElMessage.error("登录失败")
          // createCode()
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
/** 注册逻辑 */
const handleRegister = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .register(loginFormData)
        .then(() => {
          ElMessage.success("注册成功")
          router.push({path: "/"})
        }).catch(() => {
        ElMessage.error("注册失败")
        loginFormData.password = ""
      })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}

</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch"/>
    <div class="login-card">
      <div class="title">
        <h1>登录</h1>
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="userName">
            <el-input
              v-model.trim="loginFormData.userName"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <!--          <el-form-item prop="code">-->
          <!--            <el-input-->
          <!--              v-model.trim="loginFormData.code"-->
          <!--              placeholder="验证码"-->
          <!--              type="text"-->
          <!--              tabindex="3"-->
          <!--              :prefix-icon="Key"-->
          <!--              maxlength="7"-->
          <!--              size="large"-->
          <!--            >-->
          <!--              <template #append>-->
          <!--                <el-image :src="codeUrl" @click="createCode" draggable="false">-->
          <!--                  <template #placeholder>-->
          <!--                    <el-icon>-->
          <!--                      <Picture />-->
          <!--                    </el-icon>-->
          <!--                  </template>-->
          <!--                  <template #error>-->
          <!--                    <el-icon>-->
          <!--                      <Loading />-->
          <!--                    </el-icon>-->
          <!--                  </template>-->
          <!--                </el-image>-->
          <!--              </template>-->
          <!--            </el-input>-->
          <!--          </el-form-item>-->
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
          <el-button style="margin-left: 0px" :loading="loading" type="primary" size="large"
                     @click.prevent="handleRegister">注 册
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }
    }

    .content {
      padding: 20px 50px 50px 50px;

      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;

        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
