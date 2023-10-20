<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { usePagination } from "@/hooks/usePagination"
import { ElMessage, ElMessageBox, FormInstance, FormRules, UploadProps } from "element-plus"
import {
  createKnowledgeDataApi,
  deleteKnowledgeDataApi,
  getKnowledgeDataApi,
  updateKnowledgeDataApi
} from "@/api/knowledge"
import { GetTableData } from "@/api/table/types/table"
import { uploadApi } from "@/api/user"
import { CirclePlus, Delete, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import * as Knowledge from "@/api/knowledge/types/table"
import {CreateKnowledgeRequestData, UpdateKnowledgeRequestData} from "@/api/knowledge/types/table";
import {a} from "vitest/dist/reporters-cb94c88b";

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const knowledgeIds = ref<string[]>([])
const formRef = ref<FormInstance | null>(null)
const knowledgeData = ref<Knowledge.GetKnowledgeData>()
const formData = reactive({
  userName: "",
  password: ""
})
const formRules: FormRules = reactive({
  title: [{ required: true, trigger: "blur", message: "请输入标题" }],
  content: [{ required: true, trigger: "blur", message: "请输入内容" }],
  type: [{ required: true, trigger: "blur", message: "请选择类型" }],
  price: [{ required: true, trigger: "blur", message: "请输入价格" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createKnowledgeDataApi(<CreateKnowledgeRequestData>knowledgeData.value)
          .then(() => {
            ElMessage.success("新增成功")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateKnowledgeDataApi(<UpdateKnowledgeRequestData>knowledgeData.value)
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

const handleShopSelectionChange = (val:any) => {
  console.log(val)
  knowledgeIds.value = val.filter((item:any) => item.knowledgeId !== undefined).map((item:any) => item.knowledgeId)
}

const deleteKnowledges = () => {
  ElMessageBox.confirm(`正在批量删除农业知识，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteKnowledgeDataApi(knowledgeIds.value).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}

//#region 删
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`正在删除农业知识：${row.title}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteKnowledgeDataApi([row.knowledgeId]).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: any) => {
  knowledgeData.value = row
  imageUrl.value = row.picPath

  currentUpdateId.value = row.knowledgeId
  // formData.userName = row.userName
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<Knowledge.GetKnowledgeResponseData[] | null>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = ref<Knowledge.GetKnowledgeData | null>()
const getTableData = () => {
  loading.value = true
  getKnowledgeDataApi(searchData.value, {
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
const addKnowledge = () => {
  imageUrl.value = ""
  dialogVisible.value = true
  knowledgeData.value = {}
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

const imageUrl = ref("")
const handleHttpRequest = (params:any) => {
  uploadApi(params)
    .then((res) => {
      ElMessage({ type: "success", message: "上传成功" })
      params.onSuccess(res?.data.url)
    })
    .catch(() => {
      ElMessage({ type: "error", message: "上传失败" })
      params.onError()
    })
}
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  knowledgeData.value.picPath = response
}
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picPath size can not exceed 2MB!")
    return false
  }
  return true
}
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="ownName" label="用户名">
          <el-input v-model="searchData.ownName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="searchData.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input v-model="searchData.content" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="addKnowledge">新增农业知识</el-button>
          <el-button type="danger" :icon="Delete" @click="deleteKnowledges">批量删除</el-button>
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
          <el-table-column prop="picPath" label="头像">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.picPath" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column prop="ownName" label="创建人" align="center" />
          <el-table-column prop="content" label="内容" width="450" align="center">
            <template #default="scope">
              <el-text size="small">{{ scope.row.content }}</el-text>
            </template>
          </el-table-column>
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
      :title="currentUpdateId === undefined ? '新增农业知识' : '修改农业知识'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="knowledgeData" :rules="formRules" label-width="100px" label-position="left">
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
        <el-form-item prop="title" label="标题">
          <el-input v-model="knowledgeData.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input type="textarea" rows="5" v-model="knowledgeData.content" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
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
