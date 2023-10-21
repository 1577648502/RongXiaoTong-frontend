<template>
  <div>
    <el-card v-loading="loading" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="orderData.ownName" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-row :gutter="20" v-loading="loading">
        <el-col v-for="o in searchData" :key="o" :span="5" @click="toGoodsInfo(o.orderId)">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.picture" class="image" />
            <div style="padding: 14px">
              <span>{{ o.ownName }}</span>
              <div class="bottom">
                <time style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis" class="time">{{
                  o.content
                }}</time>
              </div>
              <div style="padding-top: 14px">
                <span style="color: red">{{ "￥" + o.price }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { Search } from "@element-plus/icons-vue"
import { getOrderDataApi } from "@/api/order"
import { usePagination } from "@/hooks/usePagination"
import router from "@/router"
import { GetOrderData } from "@/api/order/types/order"

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const searchData = ref<any[]>()
const orderData = ref<GetOrderData>({ createTime: 0, updateTime: 0 })
const loading = ref<boolean>(false)

const toGoodsInfo = (orderId: number) => {
  router.push({ path: "/goods/goods-info/" + orderId })
}

const getOrderData = () => {
  loading.value = true
  getOrderDataApi(orderData.value, {
    size: paginationData.pageSize,
    current: paginationData.currentPage
  })
    .then((res) => {
      paginationData.total = res.data.total
      searchData.value = res.data.records
    })
    .catch(() => {
      searchData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getOrderData() : (paginationData.currentPage = 1)
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getOrderData, { immediate: true })
</script>

<style>
.el-col-5 {
  max-width: 20%;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
