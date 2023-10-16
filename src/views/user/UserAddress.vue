<template>
  <div class="add-address">
    <div class="title">我的收货地址</div>
    <el-button type="success" style="margin-top:10px;" @click="handleAdd">添加</el-button>
    <div v-for="(item,index) in allAddressData" :key="index" class="default-address-container">
      <div>
        <div class="address-item">收货人：{{ item.consignee }}</div>
        <div class="address-item">收货地址：{{ item.addressDetail }}</div>
        <div class="address-item">收货手机号：{{ item.phone }}</div>
      </div>
      <div class="right-btn">
        <el-tag style="position:relative;top:-40px;right:-138px;margin-right: 20px;" v-if="item.isDefault===1"
                type="success">默认收货地址
        </el-tag>
        <!-- <div class="marginR20" @click="handleDetail(item)">详情</div>   -->
        <div class="marginR20" @click="handleEdit(item)">编辑</div>
        <div class="marginR20" @click="handleDel(item)">删除</div>
      </div>
    </div>
    <el-dialog title="更换地址" :visible.sync="dialogVisible" width="580px" :before-close="handleClose">
      <el-table ref="multipleTable" :data="allAddressData" tooltip-effect="dark" style="width: 100%"
                @select="handleSelectionChange">
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
    <el-dialog :title="title" v-model="showAdd" width="580px" :before-close="closeAdd">
      <el-form :model="addressData" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收货人：" prop="consignee">
          <el-input v-model="addressData.consignee"></el-input>
        </el-form-item>
        <el-form-item label="收货地址：" prop="addressDetail">
          <el-input v-model="addressData.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="收货手机号：" prop="phone">
          <el-input v-model="addressData.phone"></el-input>
        </el-form-item>
        <el-checkbox true-label="1" false-label="0" style="float:right;" v-model="addressData.isDefault">设为默认地址
        </el-checkbox>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="success" @click="updateAddress">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import {
  createAddressDataApi,
  deleteAddressDataApi,
  getAddressDataApi,
  setDefaultAddressApi,
  updateAddressDataApi
} from "@/api/address";
import {useUserStore} from "@/store/modules/user";
import {onBeforeMount, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

const ownName = useUserStore().username
const loading = ref(false)
const addressData = ref({
  consignee: "",
  phone: '',
  addressDetail: '',
  isDefault: 0
})
const allAddressData = ref([])
const dialogVisible = ref(false)
const showAdd = ref(false)
const title = ref('添加地址')

const defaultAddress = ref('')
const newAddress = ref('')

onBeforeMount(() => {
  getAllAdress()

})

const getAddressData = () => {
  loading.value = true
  getAddressDataApi({ownName: useUserStore().username, isDefault: 1}).then(res => {
    addressData.value = res.data[0]
    defaultAddress.value = addressData.value.id
  }).catch(() => {
    addressData.value = []
  })
    .finally(() => {
      loading.value = false
    })
}
const getAllAdress = () => {
  loading.value = true
  getAddressDataApi({ownName: ownName}).then(res => {
    loading.value = false
    allAddressData.value = res.data
    console.log(allAddressData.value)
    getAddressData()
  }).catch(err => {
    ElMessage.error("获取地址失败")
  }).finally(() => {
    loading.value = false
  })
}

const handleChange = () => {
  dialogVisible.value = true
}

const submitChange = () => {
  dialogVisible.value = false
}

const handleClose = () => {
  dialogVisible.value = false
}

const handleSelectionChange = (row, column) => {
  addressData.value = [...row]
}

const handleAdd = () => {
  showAdd.value = true
  title.value = '添加地址'
  addressData.value = {}
}

const closeAdd = () => {
  showAdd.value = false
  addressData.value = {}
}

const updateAddress = () => {
  if (addressData.value.consignee == "") {
    alert("收货人不能为空");
    return;
  } else if (addressData.value.phone == "") {
    alert("手机号不能为空");
    return;
  } else if (addressData.value.addressDetail == "") {
    alert("收货地址不能为空");
    return;
  }
  if (title.value === '编辑地址') {
    updateAddressDataApi({
      id: addressData.value.id,
      consignee: addressData.value.consignee,
      phone: addressData.value.phone,
      addressDetail: addressData.value.addressDetail,
      isDefault: addressData.value.isDefault,
    }).then((res) => {
      if (res.code == 200) {
        if (addressData.value.isDefault == "1") {
          newAddress.value = addressData.value.id
          setDefaultAddressApi({
            defaultAddress: defaultAddress.value,
            newAddress: newAddress.value,
          }).then(res => {
            if (res.code == 200) {
              getAllAdress()
              ElMessage.success(res.data)
              showAdd.value = false
            }
          })
        }

      } else {
        showAdd.value = false
        ElMessage.error(res.data)
      }
    })
  } else {
    getAddressData()
    createAddressDataApi({
      consignee: addressData.value.consignee,
      phone: addressData.value.phone,
      addressDetail: addressData.value.addressDetail,
      isDefault: addressData.value.isDefault,
    }).then((res) => {
      if (res.code == 200) {
        if (addressData.value.isDefault == "1") {
          newAddress.value = ' '
          setDefaultAddressApi({
            defaultAddress: defaultAddress.value,
            newAddress: newAddress.value,
          }).then(res => {
            if (res.code == 200) {
              getAllAdress()
              ElMessage.success(res.data)
              showAdd.value = false
            }
          })
        }
      } else {
        showAdd.value = false
        ElMessage.error(res.data)
      }
    });
  }
}

const handleDetail = (item) => {

}

const handleEdit = (item) => {
  showAdd.value = true
  title.value = '编辑地址'
  addressData.value = Object.assign({}, {...item})
}

const handleDel = (item) => {
  console.log(item.id)
  ElMessageBox.confirm('确认删除该信息?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    // type: 'warning'
  }).then(() => {
    deleteAddressDataApi(item.id).then(res => {
      if (res.code == 200) {
        getAllAdress()
        ElMessage({
          type: 'success',
          message: '删除成功!'
        });
      } else {
        ElMessage({type: 'error', message: res.data});
      }
    }).catch(err => {
      ElMessage({
        type: 'error',
        message: '删除失败!'
      });
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });
}


</script>

<style lang="less" scoped>
.add-address {
  width: 900px;
  float: left;
  padding: 20px;
  min-height: 100%;

  .title {
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 0px;
    font-size: 18px;
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
      color: #67C23A;

      &:hover {
        color: #035D1C;
        text-decoration: underline;
      }
    }
  }
}
</style>
