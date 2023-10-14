<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {getOrderDataApi, getOrderInfoApi} from "@/api/order";
import router from "@/router";
import {createShoppingCartDataApi} from "@/api/shopCart";
import {ElMessage} from "element-plus";

const loading = ref<boolean>(false)
const orderId = router.currentRoute.value.params.orderId
let data = ref({
  "orderId": null,
  "title": "",
  "price": null,
  "content": "",
  "orderStatus": null,
  "type": "",
  "picture": ".jpg",
  "ownName": "",
  "cooperationName": null,
  "createTime": "",
  "updateTime": "",
  "address": "",
  "isDelete": 0
})
const getOrderInfo = (id) => {
  loading.value = true
  getOrderInfoApi({
    id: id
  })
    .then((res) => {
      data = res.data
    })
    .catch(() => {
      data.value = {}
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
  })
    .then((res) => {
      console.log(res);
      ElMessage.success("添加成功")
    })
    .catch((err) => {
      ElMessage.error("添加失败")
    });
}

</script>

<template>
  <div class="details-box" v-loading="loading">
    <img v-if="data.picture" :src="data.picture" alt=""/>
    <img v-else src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" alt=""
         style="border:1px solid #f2f2f2;"/>
    <div class="info">
      <h4 class="title">{{ data.title }}</h4>
      <div class="content" :title="data.content">{{ data.content }}</div>
      <span class="price">￥{{ data.price }}</span>
      <div class="time">
        <span style="margin-right:30px;">发布时间：{{ data.createTime }}</span>
        <span>最近修改时间：{{ data.updateTime }}</span>
      </div>
      <div class="item-style">
        <div class="operation">
          <div class="operation-item"><img src="@/assets/img/good.png" class="operation-img" alt=""/> 点赞</div>
          <div class="operation-item"><img src="@/assets/img/no-star.png" class="operation-img" alt=""/> 收藏</div>
          <div class="operation-item"><img src="@/assets/img/fill-in.png" class="operation-img" alt=""/>评论</div>
        </div>
        <div class="btn-content">
          <el-button type="danger" @click="addShopcartClick" v-if="data.type == 1">加入购物车</el-button>
          <el-popover placement="right" width="320" trigger="hover">
            <div>
              <div class="item-sales">卖家姓名：<span class="sales-text">{{ data.price }}</span></div>
              <div class="item-sales">卖家地址：<span class="sales-text">{{ data.price }}</span></div>
              <div class="item-sales">卖家手机号码：<span class="sales-text">{{ data.price }}</span></div>
              <div class="item-sales">更新时间：<span class="sales-text">{{ data.updateTime | price }}</span></div>
            </div>
            <el-button type="danger" slot="reference" @click.once="" v-show="data.type == 'needs'">联系买家</el-button>
          </el-popover>
        </div>
      </div>
    </div>
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
