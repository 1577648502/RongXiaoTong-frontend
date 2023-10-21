<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { getOrderInfoApi } from "@/api/order"
import router from "@/router"
import { createShoppingCartDataApi } from "@/api/shopCart"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/modules/user"
import * as Order from "@/api/order/types/order"

const loading = ref<boolean>(false)
const orderId = router.currentRoute.value.params.orderId
const ownName = useUserStore().username
const goodsData = ref<Order.GetOrderData>({
  createTime: 0,
  updateTime: 0
})

const getOrderInfo = (id: any): any => {
  loading.value = true
  getOrderInfoApi({
    orderId: id
  })
    .then((res: any) => {
      if (res.code == 200) {
        goodsData.value = res.data
      }
    })
    .finally(() => {
      loading.value = false
    })
}
onBeforeMount(() => {
  getOrderInfo(orderId)
})
const addShopcartClick = () => {
  createShoppingCartDataApi({
    orderId: orderId,
    ownName: ownName
  })
    .then((res) => {
      console.log(res)
      ElMessage.success("添加成功")
    })
    .catch(() => {
      ElMessage.error("添加失败")
    })
}

const changeInfo = () => {
  getOrderInfoApi({
    orderId: orderId
  })
    .then(() => {
      // updateGoodInfo = res.data;
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="details-box">
    <el-row v-loading="loading">
      <el-col :span="8" :offset="4">
        <img :src="goodsData?.picture" alt="" />
      </el-col>
      <el-col :span="8" :offset="4">
        <div class="info">
          <h4 class="title">{{ goodsData?.title }}</h4>
          <div class="content" :title="goodsData?.content">{{ goodsData?.content }}</div>
          <span class="price">￥{{ goodsData?.price }}</span>
          <div class="time">
            <span style="margin-right: 30px"
              >发布时间：{{
                new Date(goodsData.createTime).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
              }}</span
            >
            <span
              >最近修改时间：{{
                new Date(goodsData.updateTime).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
              }}</span
            >
          </div>
          <div class="item-style">
            <div class="operation">
              <div class="operation-item"><img src="@/assets/img/good.png" class="operation-img" alt="" /> 点赞</div>
              <div class="operation-item"><img src="@/assets/img/no-star.png" class="operation-img" alt="" /> 收藏</div>
              <div class="operation-item"><img src="@/assets/img/fill-in.png" class="operation-img" alt="" />评论</div>
            </div>
            <div class="btn-content">
              <el-button type="danger" @click="addShopcartClick" v-show="goodsData?.type === '1'">加入购物车</el-button>

              <el-popover placement="right" width="320" trigger="hover">
                <div>
                  <div class="item-sales">
                    卖家姓名：<span class="sales-text">{{ goodsData?.price }}</span>
                  </div>
                  <div class="item-sales">
                    卖家地址：<span class="sales-text">{{ goodsData?.price }}</span>
                  </div>
                  <div class="item-sales">
                    卖家手机号码：<span class="sales-text">{{ goodsData?.price }}</span>
                  </div>
                  <div class="item-sales">
                    更新时间：<span class="sales-text">{{
                      new Date(goodsData?.updateTime).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
                    }}</span>
                  </div>
                </div>
                <template #reference>
                  <el-button type="danger" @click="changeInfo" v-show="goodsData?.type === '2'">联系买家 </el-button>
                </template>
              </el-popover>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.details-box {
  width: 1100px;
  height: 100%;
  margin: 20px auto;
  padding: 20px;
  //background: #fff;
  display: flex;
  justify-content: space-between;

  img {
    width: 360px;
    height: 300px;
    border-radius: 6px;
  }

  .info {
    position: relative;
    width: 680px;
    height: 300px;
    //border: 1px solid #f2f2f2;
    // box-shadow: 3px 3px 3px rgba(3, 0, 0, 0.07);
    border-radius: 6px;
    padding: 10px 20px;

    .title {
      font-size: 22px;
      font-weight: bold;
    }

    .content {
      height: 100px;
      //border: 1px dashed #f2f2f2;
      line-height: 23px;
      padding: 5px 10px;
      /*超出的部分隐藏*/
      overflow: hidden;
      /*文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
      /*弹性伸缩盒子模型显示*/
      display: -webkit-box;
      /*限制在一个块元素显示文本的行数*/
      -webkit-line-clamp: 4;
      /*设置或检索伸缩盒对象的子元素排列方式*/
      -webkit-box-orient: vertical;
    }

    .price {
      color: red;
      font-size: 25px;
      font-weight: bold;
    }

    .time {
      margin-top: 5px;
      color: #999;
      display: flex;
      justify-content: flex-start;
    }

    .item-style {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 5px;
      align-items: center;
    }
  }

  .operation {
    display: flex;
    margin-top: 10px;
    margin-right: 150px;

    .operation-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;

      .operation-img {
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
        border-radius: 6px;
      }
    }
  }

  .btn-content {
    margin-top: 10px;
  }

  .item-sales {
    color: #333 !important;
    line-height: 30px;
    max-height: 30px;

    .sales-text {
      color: #666;
    }
  }
}
</style>
