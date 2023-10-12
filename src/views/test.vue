<script setup lang="ts">

</script>

<template>
  <el-row >
    <el-col
      v-for="(o, index) in 10"
      :key="o"
      :span="5"
      @click="toGoodsInfo(o.orderId)"
    >
      <el-card style="width: 100%;">
        <img width="100%"
          :src="'http://127.0.0.1:8080/profilePhoto/ef201eda-d3c8-43f2-8773-c788fde83c1c.jpg'"
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
