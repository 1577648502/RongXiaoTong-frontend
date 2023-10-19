<script setup lang="ts"></script>

<template>
  <el-row>
    <el-col v-for="(o, index) in 10" :key="o" :span="5" @click="toGoodsInfo(o.orderId)">
      <el-card style="width: 100%">
        <img
          width="100%"
          :src="'http://127.0.0.1:9000/public/W4CKZ3ZW-u%3D201511376%2C641538154%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20231014%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231014T121657Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a8ac3cfeb5282ac82b22b7be93031e0c94bb66bda748aed7c4262171408a031b'"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-col-5 {
  max-width: 20%;
}
</style>
