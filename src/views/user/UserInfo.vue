<!--基本信息-->
<template>
  <div class="user-info">
    <el-upload
      :http-request="handleHttpRequest"
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="image"
      method="post"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
      <el-icon v-else class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
    <el-form :model="userinfo" ref="ruleForm" label-width="80px" style="margin-top:40px">
      <el-form-item label="昵称：" prop="userName">
        <el-input v-model="userinfo.userName" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="userName">
        <el-input v-model="userinfo.userName" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-select
          style="width:300px"
          v-model="userinfo.sex"
          placeholder="性别"
          clearable
        >
          <el-option label="男" value="1"/>
          <el-option label="女" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="type">
        <el-select
          style="width:300px"
          v-model="userinfo.type"
          placeholder="类型"
          clearable
        >
          <el-option label="买家" value="1"/>
          <el-option label="农民" value="2"/>
          <el-option label="专家" value="3"/>
          <el-option label="银行用户" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="userinfo.phone" style="width:300px"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="margin-left: 310px;" type="success" @click="updateInfo">修改</el-button>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {Plus} from '@element-plus/icons-vue'

import type {UploadProps} from 'element-plus'
import {modifyUserApi, uploadApi} from "@/api/user";
import {getUserInfoApi} from "@/api/login";
import * as url from "url";

const imageUrl = ref('')
const sex = ref({
  1: '男',
  0: '女'
})
const types = ref({
  1: '买家',
  2: '农民',
  3: '专家',
  4: '银行用户'
})

let userinfo = ref<any>({})


const handleHttpRequest = (params) => {
  uploadApi(params).then((res) => {
    ElMessage({type: 'success', message: '上传成功'})
    // userinfo.avatar.value = res.data
    params.onSuccess(res)

  }).catch(() => {
    ElMessage({type: 'error', message: '上传失败'})
    params.onError()
  })
}

onBeforeMount(() => {
  getUserInfoApi().then(res => {
    userinfo.value = res.data
    userinfo.value.sex = sex.value[userinfo.value.sex]
    userinfo.value.type = types.value[userinfo.value.type]
    console.log(userinfo.value)
    if (userinfo.value.avatar !== null) {
      imageUrl.value = 'http://127.0.0.1:8080' + userinfo.value.avatar
    }

  })
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


const updateInfo = () => {
  if (userinfo.nickName == "") {
    alert("昵称不能为空");
    return;
  }
  if (userinfo.realName == "") {
    alert("真实姓名不能为空");
    return;
  }

  modifyUserApi(userinfo.value).then(res => {
    if (res.code == 200) {
      ElMessage({type: 'success', message: '修改成功'})
      getUserInfoApi().then(res => {
        userinfo.value = res.data
        userinfo.value.sex = sex.value[userinfo.value.sex]
        userinfo.value.type = types.value[userinfo.value.type]
        if (userinfo.value.avatar !== null) {
          imageUrl.value = 'http://127.0.0.1:8080' + userinfo.value.avatar
        }

      })
    }
  })
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.user-info {
  margin: 0px auto;
  width: 900px;
  float: left;
  padding-left: 20px;
  height: 100%;
  min-height: 600px;
}
</style>
