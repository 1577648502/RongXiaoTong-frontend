<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import { uploadApi } from "@/api/user"
import { ElMessage, UploadProps } from "element-plus"
import { ref } from "vue"

const imageUrl = ref("")

const props = defineProps<{ name: string }>()
imageUrl.value = props.name

const handleHttpRequest = (params: any): Promise<any> => {
  return uploadApi(params)
    .then((res: any) => {
      ElMessage({ type: "success", message: "上传成功" })
      // userinfo.avatar.value = res.data
      params.onSuccess(res?.data.url)
    })
    .catch(() => {
      ElMessage({ type: "error", message: "上传失败" })
      params.onError()
    })
}
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = response
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!")
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!")
    return false
  }
  return true
}
</script>

<template>
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
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

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
</style>
