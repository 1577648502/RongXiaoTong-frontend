<template>
  <div class="appointment-container">
    <el-form :model="reserveData" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="地址" prop="address">
        <el-input v-model="reserveData.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="种植作物" prop="plantName">
        <el-input v-model="reserveData.plantName" placeholder="请输入种植的作物"></el-input>
      </el-form-item>
      <el-form-item label="作物详细信息" prop="plantDetail">
        <el-input v-model="reserveData.plantDetail" placeholder="请输入作物详细信息"></el-input>
      </el-form-item>
      <el-form-item label="作物条件" prop="plantCondition">
        <el-input v-model="reserveData.plantCondition" placeholder="请输入作物生长状况"></el-input>
      </el-form-item>
      <el-form-item label="土壤条件" prop="soilCondition">
        <el-input v-model="reserveData.soilCondition" placeholder="请输入土壤状况"></el-input>
      </el-form-item>
      <el-form-item label="面积" prop="area">
        <el-input v-model="reserveData.area" placeholder="请输入面积"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="reserveData.phone" placeholder="请输入电话"></el-input>
      </el-form-item>

      <el-form-item style="float:right;">
        <el-button type="success" @click="onSubmit">去预约</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useUserStore} from "@/store/modules/user";
import {createReserveDataApi} from "@/api/reserve";
const reserveData = ref({})
const expertName = router.currentRoute.value.params.expertName
const userName = useUserStore().username
const rules = ref({
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  soilCondition: [{ required: true, message: '请输入土壤状况', trigger: 'blur' }],
  plantCondition: [{ required: true, message: '请输入作物生长状况', trigger: 'blur' }],
  plantDetail: [{ required: true, message: '请输入作物详细信息', trigger: 'blur' }],
  plantName: [{ required: true, message: '请输入种植的作物', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  area: [{ required: true, message: '请输入面积', trigger: 'blur' }],
})
const onSubmit = () => {
  reserveData.value.expertName = expertName
  reserveData.value.questioner = userName
  reserveData.value.status = 0
  createReserveDataApi(reserveData.value).then(res => {
    reserveData.value = res.data
    ElMessage.success('提问成功！')
    router.push("/guide").catch((err) => err);
  }).catch(err => {
    console.log(err)
  })
}
</script>

<style lang="less" scoped>
.appointment-container{
  width: 1100px;
  height: 100%;
  margin: 10px auto;
  padding: 10px 20px;
}
</style>
