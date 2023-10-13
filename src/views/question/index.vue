<template>
  <div class="question-container">
    <el-form ref="form" :model="questionData" :rules="ruleForm" label-width="110px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="questionData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="question">
        <el-input type="textarea" v-model="questionData.question"></el-input>
      </el-form-item>
      <el-form-item label="农作物名称：" prop="plantName">
        <el-input type="textarea" v-model="questionData.plantName"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input type="text" v-model="questionData.phone"></el-input>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="success" @click="onSubmit">去提问</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router";
import {createQuestionDataApi} from "@/api/question";
import {useUserStore} from "@/store/modules/user";
const questionData = ref({})
const expertName = router.currentRoute.value.params.expertName
const userName = useUserStore().username
const ruleForm = ref({
  title: [{required: true, message: '请输入标题', trigger: 'blur'}],
  plantName: [{required: true, message: '请输入农作物名称', trigger: 'blur'}],
  phone: [{required: true, message: '请输入手机号', trigger: 'blur'}],
  question: [{required: true, message: '请输入内容', trigger: 'blur'}],
})
const onSubmit = () => {
  questionData.value.expertName = expertName
  questionData.value.questioner = userName
  questionData.value.status = 0
  createQuestionDataApi(questionData.value).then(res => {
    questionData.value = res.data
    ElMessage.success('提问成功！')
    router.push("/guide").catch((err) => err);
  }).catch(err => {
    console.log(err)
  })
}
</script>

<style lang="less" scoped>
.question-container {
  width: 1100px;
  height: 100%;
  margin: 10px auto;
  padding: 20px;
}
</style>
