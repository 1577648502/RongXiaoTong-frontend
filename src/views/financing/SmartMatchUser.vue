<template>
  <div class="add-address">
    <div class="title">
      <el-button
        type="success"
        style="margin-top: 10px"
        v-if="allIntentionData.length!=0"
        @click="lookIntention"
      >我的融资意向
      </el-button
      >
    </div>
    <div v-if="look === true">
      <div
        v-for="(item, index) in allIntentionData"
        :key="index"
        class="default-address-container"
      >
        <div>
          <div class="address-item">姓名：{{ item.realName }}</div>
          <div class="address-item">地址：{{ item.address }}</div>
          <div class="address-item">联系方式：{{ item.phone }}</div>
          <div class="address-item">金额：{{ item.amount }} (单位：元)</div>
          <div class="address-item">用途：{{ item.application }}</div>
          <div class="address-item">农作物名称：{{ item.item }}</div>
          <div class="address-item">种植面积：{{ item.area }} (单位：亩)</div>
          <div class="address-item">
            意向借款期：{{ item.repaymentPeriod }} (单位：月)
          </div>
        </div>
        <div class="right-btn">
          <div
            class="marginR20"
            v-if="allIntentionData"
            @click="handleEdit(item)"
          >
            编辑
          </div>
          <div
            class="marginR20"
            v-if="allIntentionData"
            @click="handleDel(item)"
          >
            删除
          </div>
        </div>
      </div>
    </div>

    <el-button
      type="success"
      style="margin-top: 10px"
      v-if="allIntentionData.length==0"
      @click="handleAdd"
    >添加融资意向
    </el-button
    >

    <el-dialog
      :title="title"
      v-model="showAdd"
      width="580px"
      :before-close="closeAdd"
    >
      <el-form
        :model="intentionData"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model="intentionData.realName"></el-input>
        </el-form-item>
        <el-form-item label="金额(单位：元)：" prop="amount">
          <el-input v-model="intentionData.amount"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="intentionData.phone"></el-input>
        </el-form-item>
        <el-form-item label="用途：" prop="application">
          <el-input v-model="intentionData.application"></el-input>
        </el-form-item>
        <el-form-item label="农作物名称：" prop="item">
          <el-input v-model="intentionData.item"></el-input>
        </el-form-item>
        <el-form-item label="种植面积(单位：亩)：" prop="area">
          <el-input v-model="intentionData.area"></el-input>
        </el-form-item>

        <el-form-item label="意向借款期：" prop="repaymentPeriod">
          <el-select v-model="value" placeholder="意向借款期：">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="住址：" prop="address">
          <el-input v-model="intentionData.address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="success" @click="updateIntention">确 定</el-button>
      </span>
    </el-dialog>

    <div class="title">
      <br/>
      <strong>推荐融资人</strong>
    </div>

    <div class="goods-box">
      <div
        class="goods"
        v-for="(item, index) in allRecommendData"
        :key="index"
        @click="detailsClick(item.userName)"
        :style="'margin-right:10px;'"
      >
        <img
          class="goods-img"
          v-if="item.avatar"
          :src="item.avatar"
          alt=""
        />
        <img
          class="goods-img"
          v-else
          src="@/assets/img/wutu.gif"
          style="border: 1px solid #f2f2f2"
        />

        <div class="info" style="margin-top: 80px">
          <span class="initiator1" @click="detailsClick(item.userName)"
          >姓名：{{ item.realName }}</span
          ><br/>
          <span class="initiator2" @click="detailsClick(item.userName)"
          >联系方式：{{ item.phone }}</span
          ><br/>
          <span class="initiator3" @click="detailsClick(item.userName)"
          >地址：{{ item.address }}</span
          ><br/>
          <span class="initiator4" @click="detailsClick(item.userName)"
          >农作物：{{ item.item }}</span
          ><br/>
          <span class="initiator4" @click="detailsClick(item.userName)" v-if="item.amount!=-1">金额：{{
              item.amount
            }}元</span>
          <span class="initiator4" @click="detailsClick(item.userName)" v-else>金额：- 元</span><br/>
          <!-- <span v-if="item.amount!=-1">金额：{{ item.amount }}元</span>
          <span v-else>金额：-元</span><br /> -->
          <span class="initiator4" @click="detailsClick(item.userName)" v-if="item.area!=-1"
          >种植面积：{{ item.area }} 亩</span
          >
          <span class="initiator4" @click="detailsClick(item.userName)" v-else
          >种植面积：- 亩</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref, reactive, onMounted, onUnmounted, computed} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  createFinancingIntentionDataApi, deleteFinancingIntentionDataApi,
  getFinancingIntentionDataApi,
  updateFinancingIntentionDataApi
} from "@/api/financingIntention";
import {usePagination} from "@/hooks/usePagination";
import {useUserStore} from "@/store/modules/user";
import {getBankUserDataApi} from "@/api/bankUser";
import {getUserDataApi, getUserImgApi, getUserInfoApi} from "@/api/user";

const {paginationData, handleCurrentChange, handleSizeChange} = usePagination()
const options = ref([
  {
    value: 6,
    label: "六个月",
  },
  {
    value: 12,
    label: "一年",
  },
  {
    value: 24,
    label: "两年",
  },
  {
    value: 36,
    label: "三年",
  }
])
const value = ref("")
const intentionData = ref({
  realName: "",
  amount: "",
  application: "",
  item: "",
  repaymentPeriod: "",
  address: "",
  area: "",
  phone: "",
})
const allIntentionData = ref([])
const allRecommendData = ref([])
const showAdd = ref(false)
const look = ref(false)
const title = ref("添加融资意向")
const getAllRecommned = () => {
  getFinancingIntentionDataApi({}, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  })
    .then((res) => {
      console.log("ressss", res);
      allRecommendData.value = res.data.records;
      allRecommendData.value.forEach(res => {
        getUserImgApi(res.userName).then((r) => {
          res.avatar = r.data
        })
      })
    })
    .catch((err) => {
      console.log(err);
    });
}
const getAllIntention = () => {
  getFinancingIntentionDataApi({userName: useUserStore().username}, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  })
    .then((res) => {
      console.log("ressss", res);
      allIntentionData.value = res.data.records;
    })
    .catch((err) => {
      console.log(err);
    });
}
const handleAdd = () => {
    showAdd.value = true;
  },
  lookIntention = () => {
    if (look.value === true) {
      look.value = false;
    } else {
      look.value = true;
    }
  }
const closeAdd = () => {
  showAdd.value = false;
  intentionData.value = {};
}
const updateIntention = () => {
  console.log(title.value)
  if (intentionData.value.amount == "") {
    alert("金额不能为空");
    return;
  } else if (intentionData.value.application == "") {
    alert("用途不能为空");
    return;
  } else if (intentionData.value.phone == "") {
    alert("联系方式不能为空");
    return;
  } else if (intentionData.value.item == "") {
    alert("农作物名称不能为空");
    return;
  } else if (intentionData.value.area == "") {
    alert("种植面积不能为空");
    return;
  } else if (value.value == "") {
    alert("意向借款期不能为空");
    return;
  } else if (intentionData.value.address == "") {
    alert("住址不能为空");
    return;
  }
  if (title.value === "编辑意向") {
    updateFinancingIntentionDataApi({...intentionData.value, repaymentPeriod: value.value}).then((res) => {
      if (res.code == 200) {
        getAllIntention();
        ElMessage.success(res.message);
        showAdd.value = false;
        getAllRecommned();
      } else {
        showAdd.value = false;
        ElMessage.error(res.data);
      }
    });
  } else {
    createFinancingIntentionDataApi({
      realName: intentionData.value.realName,
      amount: intentionData.value.amount,
      application: intentionData.value.application,
      item: intentionData.value.item,
      repaymentPeriod: value.value,
      address: intentionData.value.address,
      area: intentionData.value.area,
      phone: intentionData.value.phone,
    }).then((res) => {
      if (res.code == 200) {
        getAllIntention();
        ElMessage.success(res.message);
        getAllRecommned();
        showAdd.value = false;
      } else {
        showAdd.value = false;
        ElMessage.error(res.data);
      }
    });
  }
}
const handleEdit = (item) => {
  console.log(item)
  showAdd.value = true;
  title.value = "编辑意向";
  intentionData.value = item
  value.value = item.repaymentPeriod
}
const handleDel = (item) => {
  ElMessageBox.confirm("确认删除该信息?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    // type: 'warning'
  })
    .then(() => {
      deleteFinancingIntentionDataApi(item.id)
        .then((res) => {
          if (res.code == 200) {
            // reload();
            getAllIntention();
            getAllRecommned();
            // intentionData=
            ElMessage({
              type: "success",
              message: "删除成功!",
            });

            // $router.push("/home/smartMatch").catch((err) => err);
          } else {
            ElMessage({type: "error", message: res.message});
          }
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "删除失败!",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
}
onMounted(() => {
  getAllIntention();
  getAllRecommned();
})

</script>

<style lang="less" scoped>

.add-address {
  width: 1100px;
  float: left;
  padding: 20px;
  //background: #fff;
  height: auto;
  min-height: 100%;

  .title {
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 0px;
    font-size: 18px;
  }

  .goods-box {
    //background-color: #f9f9f9;
    width: 1100px;
    margin: 0 auto;

    .goods {
      float: left;
      text-align: center;
      width: 200px;
      height: 220px;
      margin-top: 15px;
      border-radius: 20%;
      padding: 15px;
      //background-color: rgb(255, 255, 255);
      border: 1px solid #d3d3d3;
      position: relative;
      // margin: 0 auto;
      cursor: pointer;

      .goods-img {
        float: left;
        width: 80px;
        height: 80px;
        margin-right: 10px;
        border-radius: 100%;
        position: absolute;
        top: 10px;
        left: 60px;
      }

      .info {
        width: 180px;
        top: 180px;
        float: left;

        .initiator1 {
          // position: absolute;top:80px;
        }
      }
    }
  }

  .default-address-container {
    border: 1px dashed #ccc;
    border-radius: 6px;
    padding: 10px 20px;
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;

    .address-item {
      line-height: 30px;
      height: 30px;
      margin-right: 50px;
    }

    .right-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .marginR20 {
        margin-right: 20px;
        cursor: pointer;
        color: #67c23a;

        &:hover {
          color: #035d1c;
          text-decoration: underline;
        }
      }
    }
  }
}

.details-box2 {
  width: 1100px;
  margin: 10px auto;
  //background: #fff;
  min-height: 100%;
  height: auto;

  img {
    width: 300px;
    height: 300px;
    float: left;
    margin-right: 20px;
  }

  .title {
    font-size: 18px;
    line-height: 40px;
  }

  .introduce {
    line-height: 25px;
    max-height: 100px;
  }

  .item-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
    line-height: 30px;

    .item-title {
      font-weight: bold;
    }

    .item-text {
    }
  }

  .info {
    position: relative;
    width: 340px;
    height: 300px;
    float: left;

    .title {
      font-size: 22px;
      font-weight: bold;
    }

    .content {
      height: 100px;
    }

    .price {
      color: red;
      font-size: 25px;
      font-weight: bold;
    }

    .time {
      margin-top: 10px;

      .createtime {
        float: left;
      }

      .updatetime {
        float: right;
      }
    }
  }

  .operation {
    position: absolute;
    bottom: 0;
    margin-top: 20px;

    .like,
    .collection,
    .comment {
      display: inline-block;
      width: 30px;
      margin-right: 30px;

      img {
        margin: 0;
        width: 20px;
        height: 20px;
        border-radius: 6px;
      }
    }
  }

  .add-shopcart {
    position: absolute;
    right: 20px;
    bottom: 5px;
  }
}
</style>
