<template>
  <div>
    <div class="goods-box5">
      <div class="goods" v-for="(item, index) in financeData" :key="index" @click="DetailBtn(item)">
        <img class="imgs" :src="item.icon" alt="" />
      </div>
    </div>
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
import { computed, onBeforeMount, ref, watch } from "vue"
import bank1001 from "@/assets/img/bank1001.jpg"
import bank1002 from "@/assets/img/bank1002.jpg"
import bank1003 from "@/assets/img/bank1003.jpg"
import bank1004 from "@/assets/img/bank1004.jpg"
import bank1005 from "@/assets/img/bank1005.jpg"
import bank1006 from "@/assets/img/bank1006.jpg"
import bank1007 from "@/assets/img/bank1007.jpg"
import bank1008 from "@/assets/img/bank1008.jpg"
import bank1009 from "@/assets/img/bank1009.jpg"
import bank1010 from "@/assets/img/bank1010.jpg"
import { getFinanceDataApi } from "@/api/finance"
import { usePagination } from "@/hooks/usePagination"
import { lowerFirst } from "lodash-es"
import { useRoute } from "vue-router"
import router from "@/router"

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const loading = ref(false)
const financeData = ref([])

const DetailBtn = (item) => {
  router.push("/financingDetails/" + item.bankId)
}

const getFinanceData = (): any => {
  loading.value = true
  getFinanceDataApi(
    {},
    {
      size: paginationData.pageSize,
      current: paginationData.currentPage
    }
  )
    .then((res) => {
      financeData.value = res.data.records
      paginationData.total = res.data.total

      financeData.value.forEach((item) => {
        imgArray.value.forEach((img) => {
          if (item.bankId == img.id) {
            item.icon = img.icon
          }
        })
      })
      console.log(financeData.value)
    })
    .catch(() => {
      financeData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const imgArray = ref([
  {
    id: "1001",
    icon: bank1001
  },
  {
    id: "1002",
    icon: bank1002
  },
  {
    id: "1003",
    icon: bank1003
  },
  {
    id: "1004",
    icon: bank1004
  },
  {
    id: "1005",
    icon: bank1005
  },
  {
    id: "1006",
    icon: bank1006
  },
  {
    id: "1007",
    icon: bank1007
  },
  {
    id: "1008",
    icon: bank1008
  },
  {
    id: "1009",
    icon: bank1009
  },
  {
    id: "1010",
    icon: bank1010
  }
])

const handleSearch = () => {
  paginationData.currentPage === 1 ? getFinanceData() : (paginationData.currentPage = 1)
}

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getFinanceData, { immediate: true })
</script>

<style lang="less" scoped>
.pager-wrapper {
  width: 90%;
  margin: 0 auto;
}

.goods-box5 {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  // justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;

  .goods {
    width: 200px;
    height: 180px;
    border-radius: 6px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .imgs {
      width: 150px;
      height: 140px;
      margin-right: 10px;
      border-radius: 6px;
    }
  }
}
</style>
