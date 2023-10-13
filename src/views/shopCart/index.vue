<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from "vue";
import {CirclePlus, Delete, Download, Refresh, RefreshRight, Search} from "@element-plus/icons-vue";
import {usePagination} from "@/hooks/usePagination";
import {getQuestionDataApi} from "@/api/question";
import {getShoppingCartDataApi} from "@/api/shopCart";
import {getOrderInfoApi} from "@/api/order";
import {getAddressDataApi, setDefaultAddressApi, updateAddressDataApi} from "@/api/address";
import {useUserStore} from "@/store/modules/user";
import {ElMessage} from "element-plus";

const {paginationData, handleCurrentChange, handleSizeChange} = usePagination()
const dialogVisible = ref(false);
const loading = ref(false)
const shopCartData = ref([])
const sums = ref()
const listTable = ref()

const defaultAddress = ref('')
const newAddress = ref('')

onBeforeMount(() => {
  getAddressDataAll()
  getAddressData()
})
const NumberHandleChange = (value: number) => {
  console.log(value)
}
const addressData = ref({})
const addressDataAll = ref([])

const getAddressDataAll = () => {
  loading.value = true
  getAddressDataApi({ownName: useUserStore().username}, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  }).then(res => {
    addressDataAll.value = res.data.records
    paginationData.total = res.data.total
  }).catch(() => {
    addressDataAll.value = []
  })
    .finally(() => {
      loading.value = false
    })
}
const getAddressData = () => {
  loading.value = true
  getAddressDataApi({ownName: useUserStore().username, isDefault: 1}, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  }).then(res => {
    addressData.value = res.data.records[0]
    defaultAddress.value = addressData.value.id
  }).catch(() => {
    addressData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}
const handleSelectionChange = (row, column) => {
  //只能选择一行，选择其他，清除上一行
  if (row.length > 1) {
    let del_row = row.shift()
    listTable.value.toggleRowSelection(del_row, false) //设置这一行取消选中
    addressData.value = Object.assign({}, {...row[0]})
  } else {
    addressData.value = Object.assign({}, {...row[0]})
  }
}
const submitChange = () => {
  loading.value = true
  newAddress.value = addressData.value.id
  setDefaultAddressApi({"defaultAddress":defaultAddress.value,"newAddress":newAddress.value}).then(res => {
    ElMessage.success('修改成功')
    dialogVisible.value = false
    getAddressData()
  }).catch(() => {
    addressData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}
const getShopCartData = () => {
  loading.value = true
  getShoppingCartDataApi({}, {
    size: paginationData.pageSize,
    current: paginationData.currentPage,
  }).then(res => {
    // console.log(res.data.records)
    // shopCartData.value = res.data.records
    paginationData.total = res.data.total
    res.data.records.forEach(item => {
      getOrderInfoApi({id: item.shoppingId}).then(res => {
        shopCartData.value.push({...item, ...res.data})
      })
    })
    loading.value = false
    console.log(shopCartData.value)
  }).catch(() => {
    shopCartData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}

sums.value = computed(() => {
  let sums = 0
  shopCartData.value.forEach(
    item => {
      sums += item.price * item.count
    }
  )
  return sums.toFixed(2)
})
const handleChange = () => {
  dialogVisible.value = true
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getShopCartData() : (paginationData.currentPage = 1)
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getShopCartData, {immediate: true})

</script>

<template>
  <div class="home-guide-container">
    <el-card style="margin: 10px 0">
      <div class="receiving-address">
        <div class="title">我的收货地址</div>
        <div class="default-address-container">
          <div>
            <div class="address-item">收货人：{{ addressData.consignee }}</div>
            <div class="address-item">收货地址：{{ addressData.addressDetail }}</div>
            <div class="address-item">收货手机号：{{ addressData.phone }}</div>
          </div>

          <el-button type="success" @click="handleChange">更换地址</el-button>
        </div>
        <el-dialog title="更换地址" v-model="dialogVisible" width="580px">
          <el-table :data="addressDataAll" tooltip-effect="dark" style="width: 100%"
                    @select="handleSelectionChange" ref="listTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="收货人" prop="consignee" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="addressDetail" label="收获地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phone" label="收获手机号" width="120" show-overflow-tooltip></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="success" @click="submitChange">确 定</el-button>
      </span>
        </el-dialog>
      </div>
    </el-card>

    <div class="toolbar-wrapper" style="margin: 10px 0">
      <el-button type="danger" :icon="Delete">批量删除</el-button>
      <el-tooltip content="刷新当前页">
        <el-button type="primary" :icon="RefreshRight" circle @click="getTableData"/>
      </el-tooltip>
    </div>
    <div>
      <el-table :data="shopCartData">
        <el-table-column type="selection" width="50" align="center"/>
        <el-table-column prop="good" label="商品" width="700">
          <template #default="scope">
            <el-row :gutter="20">
              <el-col :span="8">
                <img style="width: 200px"
                     :src="'http://127.0.0.1:8080'+scope.row.picture"
                     class="image"
                />
              </el-col>
              <el-col :span="16" style="padding: 15px">
                <div style="padding: 5px">
                  <span>{{ scope.row.title }}</span>
                </div>
                <div
                  style="padding: 5px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;">
                  <span class="hidden-text">{{ scope.row.content }}</span>
                </div>
              </el-col>
            </el-row>
          </template>

        </el-table-column>
        <el-table-column prop="" label="单价" align="center">
          <template #default="scope">
            <span style="color: red">   ￥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" align="center">
          <template #default="scope">
            <el-input-number v-model="scope.row.count" :min="1" @change="NumberHandleChange"/>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template #default="scope">
            <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin: 20px 0">
        <el-col :offset="20" :span="2" style="padding: 5px 0">
          <el-text size="large" style="color: red;font-size: 20px;">总价 ￥{{ sums.value }}</el-text>
        </el-col>
        <el-col :span="2">
          <el-button style="" type="danger">提交订单</el-button>
        </el-col>
      </el-row>

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
<style lang="less" scoped>
.receiving-address {
  position: relative;

  .title {
    border-bottom: 2px solid #656464;
    padding: 10px 0px;
    font-size: 18px;
  }
}

.default-address-container {
  border: 1px dashed #516551;
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
}

.goods {
  margin: 5px 0;
}

.home-guide-container {
  width: 90%;
  margin: 0 auto;


}
</style>
