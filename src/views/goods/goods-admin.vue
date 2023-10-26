<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type GetTableData } from "@/api/table/types/table"
import { ElMessage, ElMessageBox, type FormInstance, type FormRules, UploadProps } from "element-plus"
import { CirclePlus, Delete, Download, Plus, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { createOrderDataApi, deleteOrderDataApi, getOrderDataApi, updateOrderDataApi } from "@/api/order"
import { uploadApi } from "@/api/user"
import * as Order from "@/api/order/types/table"

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const orderIds = ref<string[]>([])
const formRef = ref<FormInstance | null>(null)
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
        createOrderDataApi(orderData.value)
          .then(() => {
            ElMessage.success("新增成功")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateOrderDataApi(orderData.value)
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

const handleShopSelectionChange = (val: User[]) => {
  console.log(val)
  orderIds.value = val.filter((item) => item.orderId !== undefined).map((item) => item.orderId)
}

const deleteOrders = () => {
  ElMessageBox.confirm(`正在批量删除商品，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteOrderDataApi(orderIds.value).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}

//#region 删
const handleDelete = (row: GetTableData) => {
  ElMessageBox.confirm(`正在删除商品：${row.userName}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteOrderDataApi([row.orderId]).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetTableData) => {
  console.log(row)
  orderData.value = row
  imageUrl.value = row.picture

  currentUpdateId.value = row.orderId
  // formData.userName = row.userName
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<Order.GetOrderData>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = ref<any>({ ownName: "" })
const getTableData = () => {
  loading.value = true
  getOrderDataApi(searchData.value, {
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
  searchData.value = { ownName: "" }
  handleSearch()
}
const addOrder = () => {
  imageUrl.value = ""
  dialogVisible.value = true
  orderData.value = {}
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

const imageUrl = ref("")
const orderData = ref({})
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
  imageUrl.value = response
  orderData.value.picture = response
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
        <el-form-item prop="ownName" label="用户名">
          <el-input v-model="searchData.ownName" placeholder="请输入" />
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
          <el-button type="primary" :icon="CirclePlus" @click="addOrder">新增商品</el-button>
          <el-button type="danger" :icon="Delete" @click="deleteOrders">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" @selection-change="handleShopSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="picture" label="头像">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.picture" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center" />
          <el-table-column prop="ownName" label="发起人" align="center" />
          <el-table-column prop="type" label="类型" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.type === '1'" type="success" effect="plain">销售订单</el-tag>
              <el-tag v-else type="danger" effect="plain">需求订单</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" align="center" />
          <el-table-column prop="price" label="价格" align="center" />
          <el-table-column prop="orderStatus" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.orderStatus === 0" type="danger" effect="plain">待合作</el-tag>
              <el-tag v-if="scope.row.orderStatus === 1" type="danger" effect="plain">待发货</el-tag>
              <el-tag v-if="scope.row.orderStatus === 2" type="success" effect="plain">完成</el-tag>
              <el-tag v-if="scope.row.orderStatus === 3" type="danger" effect="plain">完成但未评价</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
              <!--              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">下架</el-button>-->
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
      :title="currentUpdateId === undefined ? '新增商品' : '修改商品'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="orderData" :rules="formRules" label-width="100px" label-position="left">
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
          <el-input v-model="orderData.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="type" label="类型">
          <el-select v-model="orderData.type" placeholder="选择类型" clearable>
            <el-option label="销售订单" value="1" />
            <el-option label="需求订单" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <el-input v-model="orderData.content" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="price" label="价格">
          <el-input type="number" v-model="orderData.price" placeholder="请输入" />
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

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
