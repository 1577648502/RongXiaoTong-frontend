<template>
  <div>
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item>
          <el-input v-model="searchData.ownName" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="color: #696969; font-size: 12px; margin-top: 10px">
        热门搜索：
        <a class="tag-item">苹果</a>
        <a class="tag-item">新疆哈密瓜</a>
        <a class="tag-item">樱桃</a>
      </div>
      <el-row v-for="order in orderData" :key="order.orderId">
        <el-col @click="toGoodsInfo(order.orderId)">
          <el-card style="margin-top: 20px">
            <el-row>
              <el-col :span="4">
                <img style="width: 200px" :src="order.picture" class="image" />
              </el-col>
              <el-col :span="14" style="padding: 15px">
                <div style="padding: 14px">
                  <span>{{ order.title }}</span>
                </div>
                <div style="padding: 14px; font-size: 19px">
                  <span style="color: red">￥{{ order.price }}</span>
                </div>
                <div style="padding: 14px">
                  <span
                    >{{ order.ownName }}|{{
                      new Date(order.createTime).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
                    }}</span
                  >
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
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
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue"
import { Search } from "@element-plus/icons-vue"
import { getOrderDataApi } from "@/api/order"
import { usePagination } from "@/hooks/usePagination"
import router from "@/router"
import * as Order from "@/api/order/types/table"

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const loading = ref<boolean>(false)
const orderData = ref<Order.GetOrderData>([])
const searchData = ref<Order.GetOrderData>({})
const getOrderData = () => {
  loading.value = true
  getOrderDataApi(searchData.value, {
    size: paginationData.pageSize,
    current: paginationData.currentPage
  })
    .then((res) => {
      orderData.value = res.data.records
      paginationData.total = res.data.total
      loading.value = false
    })
    .catch(() => {
      orderData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const toGoodsInfo = (orderId: number) => {
  router.push({ path: "/goods/goods-info/" + orderId })
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getOrderData() : (paginationData.currentPage = 1)
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getOrderData, { immediate: true })
</script>
