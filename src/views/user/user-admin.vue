<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type GetTableData } from "@/api/table/types/table"
import { ElMessage, ElMessageBox, type FormInstance, type FormRules, UploadProps } from "element-plus"
import { Delete, Plus, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { deleteUserDataApi, getUserDataApi } from "@/api/login"
import { updateUserDataApi, uploadApi } from "@/api/user"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const userDataId = ref<string>([])
const formRef = ref<FormInstance | null>(null)
const formData = reactive({})
const formRules: FormRules = reactive({
  userName: [{ required: true, trigger: "blur", message: "请输入输入用户名" }],
  type: [{ required: true, trigger: "blur", message: "请输入选择类型" }],
  role: [{ required: true, trigger: "blur", message: "请输入选择角色" }],
  isDelete: [{ required: true, trigger: "blur", message: "请选择用户状态" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      userData.value.avatar = imageUrl.value
      if (currentUpdateId.value === undefined) {
        updateUserDataApi(userData.value)
          .then(() => {
            ElMessage.success("新增成功")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateUserDataApi(userData.value)
          .then(() => {
            ElMessage.success("修改成功")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.userName = ""
  formData.password = ""
}
//#endregion

//#region 删
const handleDelete = (row: GetTableData) => {
  ElMessageBox.confirm(`正在删除用户：${row.userName}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteUserDataApi([row.id]).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}

const deleteUsers = () => {
  ElMessageBox.confirm(`正在批量删除用户，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteUserDataApi(userDataId.value).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}

const handleShopSelectionChange = (val: User[]) => {
  console.log(val)
  userDataId.value = val.filter((item) => item.id !== undefined).map((item) => item.id)
  console.log(userDataId.value)
}

//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetTableData) => {
  userData.value = {}
  imageUrl.value = row.avatar
  userData.value = row
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<GetTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  userName: ""
})
const getTableData = () => {
  loading.value = true
  getUserDataApi(searchData, {
    size: paginationData.pageSize,
    current: paginationData.currentPage
  })
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data.records
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

const imageUrl = ref("")
const userData = ref({})
const handleHttpRequest = (params) => {
  uploadApi(params)
    .then((res) => {
      ElMessage({ type: "success", message: "上传成功" })
      params.onSuccess(res.data.url)
    })
    .catch(() => {
      ElMessage({ type: "error", message: "上传失败" })
      params.onError()
    })
}
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  userData.value.picture = response
}
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!")
    return false
  }
  return true
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="searchData.userName" placeholder="请输入" />
        </el-form-item>
        <!--        <el-form-item prop="phone" label="手机号">-->
        <!--          <el-input v-model="searchData.phone" placeholder="请输入" />-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <!--          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增用户</el-button>-->
          <el-button type="danger" :icon="Delete" @click="deleteUsers">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" @selection-change="handleShopSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="avatar" label="头像">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <!--          <el-table-column prop="id" label="id" align="center" />-->
          <el-table-column prop="userName" label="用户名" align="center" />
          <el-table-column prop="name" label="昵称" align="center" />
          <el-table-column prop="role" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.role === 'admin'" effect="plain">admin</el-tag>
              <el-tag v-else type="warning" effect="plain">{{ scope.row.role }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="type" label="类型" align="center" />
          <el-table-column prop="isDelete" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.isDelete === 0" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.sex === 0" type="success" effect="plain">女</el-tag>
              <el-tag v-else type="success" effect="plain">男</el-tag>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="createTime" label="创建时间" align="center" />-->
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider />
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增用户' : '修改用户'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="userData" :rules="formRules" label-width="100px" label-position="left">
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
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="userData.userName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="name" label="昵称">
          <el-input v-model="userData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input type="number" v-model="userData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select style="width: 300px" v-model="userData.sex" placeholder="性别" clearable>
            <el-option label="男" :value="1" />
            <el-option label="女" :value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="类型：" prop="type">
          <el-select style="width: 300px" v-model="userData.type" placeholder="类型" clearable>
            <el-option label="买家" :value="1" />
            <el-option label="农民" :value="2" />
            <el-option label="专家" :value="3" />
            <el-option label="银行用户" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-select v-model="userData.role" placeholder="选择角色" clearable>
            <el-option label="管理员" value="admin" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="isDelete">
          <el-select style="width: 300px" v-model="userData.isDelete" placeholder="状态" clearable>
            <el-option label="正常" :value="0" />
            <el-option label="禁用" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.avatar-uploader {
  display: flex;
  justify-content: center;
  margin: 10px 0 20px 0;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
}

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

.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
