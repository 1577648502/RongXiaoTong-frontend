<template>
  <div class="details-box2">
    <div class="title">
      <strong>{{ FinaceUserDetails?.bankName }}</strong>
    </div>
    <div class="introduce">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ FinaceUserDetails?.introduce }}</div>

    <div class="title">
      <br />
      <strong>请选择个人贷款还是组合贷款</strong><br />
      <el-button type="success" @click="individual" v-if="Already === false">个人贷款 </el-button>
      <el-button type="success" @click="combination" v-if="Already === false">组合贷款 </el-button>

      <el-button type="warning" v-if="Already" disabled>已申请贷款</el-button>
    </div>

    <!--单人贷款 -->
    <el-dialog :title="title" v-model="showIndividual" width="580px" :before-close="closeIndividual">
      <el-form v-model="FinaceUserDetails" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="FinaceUserDetails.name" />
        </el-form-item>
        <el-form-item label="融资额度：" prop="money">
          <el-input v-model="FinaceUserDetails.money" />
        </el-form-item>
        <el-form-item label="利息：" prop="rate">
          {{ FinaceUserDetails.rate }}
        </el-form-item>
        <el-form-item label="意向借款期：" prop="repayment">
          <el-select v-model="value" placeholder="意向借款期：">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="FinaceUserDetails.phone" />
        </el-form-item>
        <el-form-item label="身份证号：" prop="idNum">
          <el-input v-model="FinaceUserDetails.idNum" />
        </el-form-item>
        <el-form-item label="上传材料：" prop="photo">
          <el-upload
            :http-request="handleHttpRequest"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
            method="post"
            class="upload-demo"
            drag
            multiple
            :file-list="fileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="closeIndividual">取 消</el-button>
        <el-button type="success" @click="handleApplyOne">申请</el-button>
      </span>
    </el-dialog>

    <!-- 组合贷款 -->
    <el-dialog :title="title" v-model="showCombination" width="580px" :before-close="closeCombination">
      <el-form v-model="UserDetailsMulti" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 综合信息 -->
        <strong style="color: green">申请融资信息：</strong>
        <el-form-item label="融资额度：" prop="money">
          <el-input v-model="UserDetailsMulti.money" />
        </el-form-item>
        <el-form-item label="利息：" prop="rate">
          <!-- <el-input v-model="UserDetailsMulti.rate"></el-input> -->
          {{ UserDetailsMulti.rate }}
        </el-form-item>
        <el-form-item label="意向借款期：" prop="repaymentPeriod">
          <el-select v-model="value" placeholder="意向借款期：">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 用户1 -->
        <strong style="color: green">用户1：</strong>
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model="UserDetailsMulti.realName" />
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="UserDetailsMulti.phone" />
        </el-form-item>
        <el-form-item label="身份证号：" prop="idNum">
          <el-input v-model="UserDetailsMulti.idNum" />
        </el-form-item>
        <!-- 用户2 -->
        <strong style="color: green">用户2：</strong>
        <el-form-item label="姓名：" prop="combinationName1">
          <el-input v-model="UserDetailsMulti.combinationName1" />
        </el-form-item>
        <el-form-item label="联系方式：" prop="combinationPhone1">
          <el-input v-model="UserDetailsMulti.combinationPhone1" />
        </el-form-item>
        <el-form-item label="身份证号：" prop="combinationIdnum1">
          <el-input v-model="UserDetailsMulti.combinationIdnum1" />
        </el-form-item>

        <!-- 用户3 -->
        <strong style="color: green">用户3：</strong>
        <el-form-item label="姓名：" prop="combinationName2">
          <el-input v-model="UserDetailsMulti.combinationName2" />
        </el-form-item>
        <el-form-item label="联系方式：" prop="combinationPhone2">
          <el-input v-model="UserDetailsMulti.combinationPhone2" />
        </el-form-item>
        <el-form-item label="身份证号：" prop="combinationIdnum2">
          <el-input v-model="UserDetailsMulti.combinationIdnum2" />
        </el-form-item>
        <el-form-item label="上传材料：" prop="photo">
          <el-upload
            :http-request="handleHttpRequest"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
            method="post"
            class="upload-demo"
            drag
            multiple
            :file-list="fileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="closeCombination">取 消</el-button>
        <el-button type="success" @click="handleApplyMulti">申请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router"
import { createFinanceDataApi, getFinanceInfoApi } from "@/api/finance"
import { onMounted, ref } from "vue"
import { getBankInfoApi } from "@/api/bank"
import { ElMessage, UploadProps } from "element-plus"
import { uploadApi } from "@/api/user"
import { useUserStore } from "@/store/modules/user"

const loading = ref(false)
const title = ref("个人贷款信息")
const showIndividual = ref(false)
const showCombination = ref(false)
const bankId = ref<any>(router.currentRoute.value.params.bankId)
const Already = ref(false)
const imageUrl = ref<string[]>([])
const options = ref([
  {
    value: 6,
    label: "六个月"
  },
  {
    value: 12,
    label: "一年"
  },
  {
    value: 24,
    label: "两年"
  },
  {
    value: 36,
    label: "三年"
  }
])
const value = ref("")
const fileList = ref([])
const FinaceUserDetails = ref<any>()
const BankInfoData = ref<any>()
const UserDetailsMulti = ref<any>({})
const getFinaceUserDetails = () => {
  loading.value = true
  getBankInfoApi(bankId.value)
    .then((res) => {
      if (res.code == 200) {
        BankInfoData.value = res?.data
        select()
        loading.value = false
      }
    })
    .catch(() => {
      loading.value = false
    })
}

const individual = () => {
  title.value = "个人贷款信息"
  getFinanceInfoApi(bankId.value).then((res) => {
    showIndividual.value = true
    showCombination.value = false
    if (res.code == 200) {
      return
    } else {
      ElMessage.error("出错了")
    }
  })
}
const select = () => {
  getFinanceInfoApi(bankId.value).then((res) => {
    if (res.code == 200) {
      FinaceUserDetails.value = res.data
      console.log(res.data)
      if (res.data != null) {
        Already.value = true
      }
      FinaceUserDetails.value = { ...res.data, ...BankInfoData.value }
    } else {
      ElMessage.error("出错了")
    }
  })
}

const combination = () => {
  title.value = "组合贷款信息"
  // $store.state.mutiFile = "";
  getFinanceInfoApi(bankId.value).then((res) => {
    showCombination.value = true
    showIndividual.value = false
    if (res.code == 200) {
      return
    } else {
      ElMessage.error("出错了")
    }
  })
}

const closeIndividual = () => {
  showIndividual.value = false
  console.log(showIndividual.value)
  // $store.state.mutiFile = "";
}
const closeCombination = () => {
  showCombination.value = false
}

onMounted(() => {
  getFinaceUserDetails()
})

const handleApplyOne = () => {
  console.log("信息")
  console.log(FinaceUserDetails.value)
  if (FinaceUserDetails.value.name == "" || FinaceUserDetails.value.name == null) {
    alert("姓名不能为空")
    return
  }
  if (FinaceUserDetails.value.money == "" || FinaceUserDetails.value.money == null) {
    alert("融资额度不能为空")
    return
  }
  if (value.value == "" || value.value == null) {
    alert("意向借款期不能为空")
    return
  }
  if (FinaceUserDetails.value.phone == "" || FinaceUserDetails.value.phone == null) {
    alert("联系方式不能为空")
    return
  }
  if (FinaceUserDetails.value.idNum == "" || FinaceUserDetails.value.idNum == null) {
    alert("身份证号不能为空")
    return
  }
  let imgStr = ""
  imageUrl.value.filter((res) => {
    return (imgStr = imgStr + " " + res)
  })
  createFinanceDataApi({
    combinationIdnum1: null,
    combinationIdnum2: null,
    combinationName1: null,
    combinationName2: null,
    combinationPhone1: null,
    combinationPhone2: null,
    createTime: "",
    financeId: 0,
    remark: null,
    status: 0,
    updateTime: "",
    bankId: bankId.value,
    realName: FinaceUserDetails.value.name,
    money: FinaceUserDetails.value.money,
    rate: FinaceUserDetails.value.rate,
    repayment: value.value,
    phone: FinaceUserDetails.value.phone,
    idNum: FinaceUserDetails.value.idNum,
    fileInfo: imgStr,
    ownName: useUserStore().username
  })
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage.success(res.message)
        Already.value = true
        showIndividual.value = false
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error(err.message)
      // $store.state.mutiFile = "";
    })
}
const handleApplyMulti = () => {
  if (UserDetailsMulti.value.money == "" || UserDetailsMulti.value.money == null) {
    alert("融资额度不能为空")
    return
  }
  if (value.value == "" || value.value == null) {
    alert("意向借款期不能为空")
    return
  }
  if (UserDetailsMulti.value.realName == "" || UserDetailsMulti.value.realName == null) {
    alert("姓名不能为空")
    return
  }
  if (UserDetailsMulti.value.phone == "" || UserDetailsMulti.value.phone == null) {
    alert("联系方式不能为空")
    return
  }
  if (UserDetailsMulti.value.idNum == "" || UserDetailsMulti.value.idNum == null) {
    alert("身份证号不能为空")
    return
  }
  if (UserDetailsMulti.value.combinationName1 == "" || UserDetailsMulti.value.combinationName1 == null) {
    alert("用户2姓名不能为空")
    return
  }
  if (UserDetailsMulti.value.combinationPhone1 == "" || UserDetailsMulti.value.combinationPhone1 == null) {
    alert("用户2联系方式不能为空")
    return
  }
  if (UserDetailsMulti.value.combinationIdnum1 == "" || UserDetailsMulti.value.combinationIdnum1 == null) {
    alert("用户2身份证号不能为空")
    return
  }

  createFinanceDataApi({
    createTime: "",
    financeId: 0,
    ownName: "",
    remark: null,
    status: 0,
    updateTime: "",
    bankId: bankId.value,
    money: UserDetailsMulti.value.money,
    rate: UserDetailsMulti.value.rate,
    repayment: value.value,
    realName: UserDetailsMulti.value.realName,
    phone: UserDetailsMulti.value.phone,
    idNum: UserDetailsMulti.value.idNum,
    combinationName1: UserDetailsMulti.value.combinationName1,
    combinationPhone1: UserDetailsMulti.value.combinationPhone1,
    combinationIdnum1: UserDetailsMulti.value.combinationIdnum1,
    combinationName2: UserDetailsMulti.value.combinationName2,
    combinationPhone2: UserDetailsMulti.value.combinationPhone2,
    combinationIdnum2: UserDetailsMulti.value.combinationIdnum2,
    fileInfo: imageUrl.value.toString()
  })
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage.success(res.message)
        // $router.push("/home/financing").catch((err) => err);
        localStorage.removeItem("financeObj")
        Already.value = true
        showCombination.value = false
        // $store.state.mutiFile = "";
      } else {
        ElMessage.error(res.message)
        // $store.state.mutiFile = "";
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error(err.message)
      // $store.state.mutiFile = "";
    })
}

const handleHttpRequest = (params: any): any => {
  uploadApi(params)
    .then((res: any) => {
      ElMessage({ type: "success", message: "上传成功" })
      // userinfo.avatar.value = res.data
      params.onSuccess(res?.data.url)
    })
    .catch(() => {
      ElMessage({ type: "error", message: "上传失败" })
      params.onError()
    })
}

const handleAvatarSuccess: UploadProps["onSuccess"] = (response: string) => {
  imageUrl.value.push(response)
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!")
    return false
  }
  return true
}
</script>

<style lang="less" scoped>
.details-box2 {
  margin: 10px auto;
  min-height: 100%;
  height: auto;
  padding: 10px 20px;

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
      color: #999;

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

.btn-style {
  display: flex;
  justify-content: center;
}
</style>
