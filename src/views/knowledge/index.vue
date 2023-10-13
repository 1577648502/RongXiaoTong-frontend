<template>
  <div>
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item>
          <el-input v-model="searchData.ownName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="color:#696969;font-size:12px;margin-top: 10px;">
        热门搜索：
        <a class="tag-item" @click="handleTopicDetail('苹果')">苹果</a>
        <a class="tag-item" @click="handleTopicDetail('新疆哈密瓜')">新疆哈密瓜</a>
        <a class="tag-item" @click="handleTopicDetail('樱桃')">樱桃</a>
      </div>
      <el-row :gutter="20">
        <el-col v-for="knowledge in knowledgeData" :span="12" @click="toKnowledgeInfo(knowledge.knowledgeId)">
          <el-card style="margin-top: 20px" >
            <el-row :gutter="20">
              <el-col :span="8" >
                <img style="width: 200px"
                     :src="'http://127.0.0.1:8080'+knowledge.picPath"
                     class="image"

                />
              </el-col>
              <el-col :span="16" style="padding: 15px">
                <div style="padding: 5px">
                  <span>{{ knowledge.title }}</span>
                </div>
                <div style="padding: 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;">
                  <span class="hidden-text">{{ knowledge.content }}</span>
                </div>
                <div style="padding: 5px">
                  <span>{{ knowledge.ownName }}</span>
                </div>

              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
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
import {ref, watch} from "vue"
import {Search} from "@element-plus/icons-vue";
import {getKnowledgeDataApi} from "@/api/knowledge";
import {usePagination} from "@/hooks/usePagination";
import router from "@/router";

const {paginationData, handleCurrentChange, handleSizeChange} = usePagination()
const loading = ref<boolean>(false)
const knowledgeData = ref([])
const searchData = ref({
  ownName: ""
})
const getKnowledgeData = () => {
  loading.value = true
  getKnowledgeDataApi(searchData, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  }).then(res => {
    knowledgeData.value = res.data.records
    paginationData.total = res.data.total
    loading.value = false
  }).catch(() => {
    tableData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}
const toKnowledgeInfo = (knowledgeId: number) => {
  router.push({path: "/knowledge/" + knowledgeId})
}


const handleSearch = () => {
  paginationData.currentPage === 1 ? getKnowledgeData() : (paginationData.currentPage = 1)
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getKnowledgeData, {immediate: true})


</script>

<style scoped>


</style>
