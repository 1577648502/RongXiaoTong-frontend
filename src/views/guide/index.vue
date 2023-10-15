<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {getExpertDataApi} from "@/api/expert";
import {getQuestionDataApi} from "@/api/question";
import {useUserStore} from "@/store/modules/user";

const {paginationData, handleCurrentChange, handleSizeChange} = usePagination()
import {watch} from "vue";
import {usePagination} from "@/hooks/usePagination";
import router from "@/router";


const userStore = useUserStore()
const loading = ref(true)
const expertData = ref([])
const questionData = ref([])
const searchData = ref({})
onBeforeMount(() => {
  getExpertData()
  getQuestionData()
})

const getExpertData = () => {
  loading.value = true
  getExpertDataApi({}, {
    size: 10,
    current: 1,
  }).then(res => {
    expertData.value = res.data.records
    loading.value = false
  }).catch(() => {
    expertData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}
const getQuestionData = () => {
  loading.value = true
  getQuestionDataApi(searchData.value, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  }).then(res => {
    questionData.value = res.data.records
    paginationData.total = res.data.total
    loading.value = false
  }).catch(() => {
    questionData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}


const handleQuestion = (item) => {
  router.push('/question/' + item.userName)

}
const handleReserve = (item) => {
  router.push('/reserve/'+ item.userName)

}
const toQuestionInfo = (questionId: number) => {
  router.push({path: "/guide/" + questionId})
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getQuestionData() : (paginationData.currentPage = 1)
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getQuestionData, {immediate: true})

</script>

<template>
  <div class="home-guide-container" v-loading="loading">
    <el-row>
      <el-col :span="10" :offset="2">
        <div class="left-guide">
          <el-form ref="searchFormRef" :inline="true" :model="searchData">
            <el-form-item>
              <el-input v-model="searchData.title" placeholder="请输入"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>

          <div style="color:#696969;font-size:12px;margin-top: 10px;">
            热门搜索：
            <a class="tag-item">苹果</a>
            <a class="tag-item">新疆哈密瓜</a>
            <a class="tag-item">樱桃</a>
          </div>
          <div  class="goods" v-for="(item, index) in questionData" :key="index" @click="toQuestionInfo(item.id)">
            <div class="info">
              <p class="content">
                <i class="question-text" style="" v-if="item.status == 0">[问]</i>
                <i class="question-text" v-else>[答]</i>
                <span class="question-content" @click="handleDetail(item)">{{ item.title }}</span>
              </p>
              <div class="person-contents">
                <span>提问者：{{ item.questioner }}</span>&nbsp;&nbsp;&nbsp;
                <span>专家：{{ item.expertName }}</span>
              </div>
            </div>

          </div>
          <el-divider/>
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
      </el-col>
      <el-col :span="10" :offset="2">

        <div class="right-guide">
          <div class="professioner-item">
            <div style="font-size:18px;display: flex;justify-content: space-between;">
              <strong>专家列表</strong>
              <a style="font-size:12px;cursor: pointer;">更多专家>></a>
            </div>
            <div class="epert" v-for="(item,index) in expertData" :key="index"
                 :style="index===expertData.length-1?'':'border-bottom: 1px dashed #f2f2f2;'">
              <img :src="userStore.userInfo.avatar" alt=""/>
              <div class="info">
                <div class="item-style">
                  <div class="content">专家姓名：{{ item.realName }}</div>
                  <div class="content">职称：{{ item.position }}</div>
                </div>
                <div class="item-style">
                  <div class="content">从事专业：{{ item.profession }}</div>
                  <div class="content">电话：{{ item.phone }}</div>
                </div>
                <div class="item-content">单位：{{ item.belong }}</div>
                <div class="item-btn">
                  <div class="btn-item" @click="handleQuestion(item)">去提问</div>
                  <div class="btn-item" @click="handleReserve(item)">去预约</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped lang="scss">
.goods {
  margin: 5px 0;
}

.home-guide-container {
  width: 1100px;
  margin: 0 auto;
  .left-guide {
    margin-top: 10px;
  }

  .right-guide {
    margin-top: 10px;
    .btn-content {
      font-size: 16px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      height: 40px;
      line-height: 40px;
    }

    .professioner-item {
      width: 450px;
      font-size: 12px;
      padding: 10px 20px;
      margin-top: 10px;
    }
  }
}


.epert {
  min-height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  // padding: 10px 10px;
  img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border-radius: 6px;
  }

  .item-style {
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  p {
    margin: 5px;
  }

  .content {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    width: 120px;
    line-height: 25px;
  }

  .item-content {
    width: 320px;
    line-height: 25px;
    /*超出的部分隐藏*/
    overflow: hidden;
    /*文字用省略号替代超出的部分*/
    text-overflow: ellipsis;
    word-break: break-all;
    /*弹性伸缩盒子模型显示*/
    display: -webkit-box;
    /*限制在一个块元素显示文本的行数*/
    -webkit-line-clamp: 2;
    /*设置或检索伸缩盒对象的子元素排列方式*/
    -webkit-box-orient: vertical;
  }

  .item-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 10px;
    color: #67C23A;

    .btn-item {
      margin-left: 10px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: #035D1C;
      }
    }
  }
}
</style>
