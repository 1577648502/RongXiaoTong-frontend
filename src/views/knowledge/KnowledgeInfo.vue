<template>
  <div class="knowlege-detail-container">
    <div key="title" class="title">{{ knowledgeInfo.title }}</div>
    <div class="tips">
      <span>作者：</span>
      <span style="margin-right: 20px">{{ knowledgeInfo.ownName }}</span>
      <span>日期：</span>
      <span>{{ knowledgeInfo.updateTime }}</span>
    </div>
    <div class="detail-img" style="margin: 10px">
      <img :src="knowledgeInfo.picPath" alt="" />
    </div>
    <el-card style="margin: 10px 0">
      {{ knowledgeInfo.content }}
    </el-card>
    <el-input type="textarea" v-model="content" :rows="5" />
    <div style="margin-top: 20px; display: flex; flex-direction: row; justify-content: flex-end">
      <el-button type="success" @click="handleComment">添加评论</el-button>
    </div>
    <div class="comment-container">
      <div class="comment-item" v-for="(item, index) in commentArray" :key="index">
        <div>{{ item.content }}</div>
        <div class="comment-tips">
          <div style="margin-right: 40px">
            评论人：<span class="color6">{{ item.ownName }}</span>
          </div>
          <div>
            评论时间：<span class="color6">{{ item.createTime }}</span>
          </div>
        </div>
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

<script setup>
import { getKnowledgeInfoApi } from "@/api/knowledge"
import router from "@/router"
import { onBeforeMount, ref, watch } from "vue"
import { ElMessage } from "element-plus"
import { createDiscussDataApi, getDiscussDataApi } from "@/api/discuss"
import { usePagination } from "@/hooks/usePagination"
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const loading = ref(true)
const knowledgeInfo = ref({})
const content = ref()
const commentArray = ref([])
const knowledgeId = router.currentRoute.value.params.knowledgeId

onBeforeMount(() => {
  getKnowledgeData()
  // getCommentData()
})
const getKnowledgeData = () => {
  loading.value = true
  getKnowledgeInfoApi(knowledgeId)
    .then((res) => {
      knowledgeInfo.value = res.data
      loading.value = false
    })
    .catch(() => {
      knowledgeInfo.value = {}
    })
    .finally(() => {
      loading.value = false
    })
}
// 查询评论
const getCommentData = () => {
  getDiscussDataApi(
    { knowledgeId: knowledgeId },
    {
      size: paginationData.pageSize,
      current: paginationData.currentPage
    }
  )
    .then((res) => {
      commentArray.value = res.data.records
      paginationData.total = res.data.total
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getCommentData() : (paginationData.currentPage = 1)
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getCommentData, { immediate: true })

const handleComment = () => {
  if (content.value === "") {
    ElMessage.error("评论内容不能为空！")
    return
  }
  createDiscussDataApi({ content: content.value, knowledgeId: knowledgeId })
    .then((res) => {
      content.value = ""
      ElMessage.success("评论成功！")
      getCommentData(knowledgeId)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="less" scoped>
.knowlege-detail-container {
  color: #fff;
  width: 1100px;
  margin: 0 auto;
  min-height: 100%;
  padding: 10px 20px;
  margin-top: 10px;

  .title {
    font-size: 18px;
    text-align: center;
  }

  .tips {
    color: #fff;
    display: flex;
    justify-content: flex-end;
    height: 30px;
    align-items: center;
  }

  .detail-img {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    video {
      border: 1px solid #f2f2f2;
    }

    img {
      border-radius: 6px;
    }
  }

  .detail-content {
  }

  .comment-container {
    clear: both;
    margin-top: 10px;

    .comment-num {
      font-weight: bold;
    }

    .comment-item {
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 20px;
      margin: 20px 0;
      word-break: break-all;

      .comment-tips {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        .color6 {
          color: #fff;
        }
      }
    }
  }
}
</style>
