<script lang="ts" setup>
import { ref, watch } from 'vue'
import request from '../utils/request'
import type { IHardware } from './types'
// 分页数据
const pagesize = 35
const pagenum = ref(1)
const { data: { data: hardwareJSON } } = await request.get('/')
const isLoading = ref(false)
const total = ref(hardwareJSON.length)
// 表格数据
const hardware = ref(hardwareJSON.slice(0, pagesize))
// 查询表单数据
const searchForm = ref({ name: '', type: '' })
watch([pagenum, searchForm], (newValue) => {
  const filterHardware = hardwareJSON.filter((item: { name: string; type: string; }) => {
    const originName = item.name.toLowerCase()
    const findName = searchForm.value.name.toLowerCase()
    const originType = item.type.toLowerCase()
    const findType = searchForm.value.type.toLowerCase()
    if (searchForm.value.name === '') {
      return originType.includes(findType)
    }
    if (searchForm.value.type === '') {
      return originName.includes(findName)
    }
    return originName.includes(findName) && originType.includes(findType)
  })
  hardware.value = filterHardware.slice((newValue[0] - 1) * pagesize, newValue[0] * pagesize)
  total.value = filterHardware.length
}, { deep: true })
// 修改弹出框的显示与隐藏
const visible = ref(false)
// 更新框数据
const updatedHardware = ref<IHardware>()
function currentChangeHandler(newPagenum: number) {
  pagenum.value = newPagenum
}
// 重新请求函数
async function reFetch() {
  const { data: { data: hardwareJSON }} = await request.get('/')
  hardware.value = hardwareJSON
}
// 控制硬件操作按钮的函数
// type 为 update 表示要更新，type 为 delete 表示要删除
async function handlerEdit(rowData: any, type: 'update' | 'delete') {
  if (type === 'update') {
    updatedHardware.value = { ...rowData }
    visible.value = true
  } else if (type === 'delete') {
    // 删除操作
    try {
      isLoading.value = true
      const { data: { message } } = await request.delete(`/${rowData.id}`)
      ElMessage.success(message)
      await reFetch()
    } catch (error) {
      console.log('err')
    } finally {
      isLoading.value = false
    }
  }
}
// 搜索框的搜索函数
// 修改框的操作，type 为 submit 表示用户确认了修改，type 为 cancel 表示用户取消了修改
async function handleUpdateClose(type: 'submit' | 'cancel') {
  if (type === 'submit') {
    // TODO：put 请求数据
    const { id, name, type, row, col, box_num } = updatedHardware.value!
    try {
      await request.put(`/${id}`, {
        id, name, type, row, col, box_num
      })
      await reFetch()
    } catch (error) {
      console.log('error')
    }
  } else {
    ElMessage.info('用户关闭了修改框')
  }
  visible.value = false
}
</script>

<template>
  <div class="container">
    <div class="form_container">
      <el-form :model="searchForm">
        <el-form-item label="器件名称">
          <el-input placeholder="请输入器件名称" v-model="searchForm.name" />
        </el-form-item>
        <el-form-item label="器件类型">
          <el-select style="padding: 0" v-model="searchForm.type">
            <el-option label="全部" value="" />
            <el-option label="IC" value="IC" />
            <el-option label="5A" value="5A" />
            <el-option label="钽电容" value="钽电容" />
            <el-option label="电解电容" value="电解电容" />
            <el-option label="接口" value="接口" />
            <el-option label="PNP" value="PNP" />
            <el-option label="晶振" value="晶振" />
            <el-option label="1117" value="1117" />
            <el-option label="CAP" value="CAP" />
            <el-option label="FET" value="FET" />
            <el-option label="IND" value="IND" />
            <el-option label="LED" value="LED" />
            <el-option label="MOS管" value="MOS管" />
            <el-option label="NPN" value="NPN" />
            <el-option label="PNP" value="PNP" />
            <el-option label="RES" value="RES" />
            <el-option label="SNAP MAKER" value="SNAP MAKER" />
            <el-option label="TF卡座" value="TF卡座" />
            <el-option label="USB" value="USB" />
            <el-option label="XTAL" value="XTAL" />
            <el-option label="按钮" value="按钮" />
            <el-option label="保险丝" value="保险丝" />
            <el-option label="插头" value="插头" />
            <el-option label="插座" value="插座" />
            <el-option label="传感器" value="传感器" />
            <el-option label="串口通信模块" value="串口通信模块" />
            <el-option label="磁铁" value="磁铁" />
            <el-option label="磁珠" value="磁珠" />
            <el-option label="底座" value="底座" />
            <el-option label="电感" value="电感" />
            <el-option label="电机" value="电机" />
            <el-option label="电容" value="电容" />
            <el-option label="电位器" value="电位器" />
            <el-option label="电阻" value="电阻" />
            <el-option label="垫圈" value="垫圈" />
            <el-option label="顶针" value="顶针" />
            <el-option label="端子" value="端子" />
            <el-option label="舵机" value="舵机" />
            <el-option label="耳机插座" value="耳机插座" />
            <el-option label="二极管" value="二极管" />
            <el-option label="干电池" value="干电池" />
            <el-option label="基本元器件" value="基本元器件" />
            <el-option label="继电器" value="继电器" />
            <el-option label="接口" value="接口" />
            <el-option label="接头" value="接头" />
            <el-option label="接线柱" value="接线柱" />
            <el-option label="镜头" value="镜头" />
            <el-option label="卡座" value="卡座" />
            <el-option label="开关" value="开关" />
            <el-option label="密封圈" value="密封圈" />
            <el-option label="模块" value="模块" />
            <el-option label="排母" value="排母" />
            <el-option label="排针" value="排针" />
            <el-option label="三极管" value="三极管" />
            <el-option label="摄像头" value="摄像头" />
            <el-option label="弯折铝管" value="弯折铝管" />
            <el-option label="无线仿真器" value="无线仿真器" />
            <el-option label="扬声器" value="扬声器" />
            <el-option label="语音合成模块" value="语音合成模块" />
            <el-option label="直插式电解电容" value="直插式电解电容" />
            <el-option label="直插式铝电解电容" value="直插式铝电解电容" />
            <el-option label="钻头" value="钻头" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-pagination
        @current-change="currentChangeHandler"
        small
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="total"
      />
    </div>
    <el-table
      stripe
      border
      fit
      :data="hardware"
      style="flex: 1; margin-bottom: 25px"
    >
      <el-table-column
        align="center"
        prop="box_num"
        label="盒子序号"
        width="100"
      />
      <el-table-column prop="name" label="器件名称" />
      <el-table-column prop="type" label="器件类型" />
      <el-table-column prop="row" label="器件位置(行)" />
      <el-table-column prop="col" label="器件位置(列)" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handlerEdit(scope.row, 'update')"
            >更新</el-button
          >
          <el-popconfirm
            @confirm="handlerEdit(scope.row, 'delete')"
            title="你确定要删除此元件吗"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Teleport to="body">
    <el-dialog width="450" v-model="visible" :show-close="false">
      <h2>修改器件</h2>
      <el-form :model="updatedHardware">
        <el-form-item label="器件名称" prop="name">
          <el-input
            v-model="updatedHardware!.name"
            :placeholder="updatedHardware?.name"
          />
        </el-form-item>
        <el-form-item label="盒子序号" prop="box_num">
          <el-input
            v-model="updatedHardware!.box_num"
            :placeholder="String(updatedHardware?.box_num)"
          />
        </el-form-item>
        <el-form-item label="器件类型" prop="type">
          <el-input
            v-model="updatedHardware!.type"
            :placeholder="updatedHardware?.type"
          />
        </el-form-item>
        <el-form-item label="器件位置(行)" prop="row">
          <el-input
            v-model="updatedHardware!.row"
            :placeholder="updatedHardware?.row"
          />
        </el-form-item>
        <el-form-item label="器件位置(列)" prop="col">
          <el-input
            v-model="updatedHardware!.col"
            :placeholder="updatedHardware?.col"
          />
        </el-form-item>
      </el-form>
      <el-button type="info" @click="handleUpdateClose('cancel')"
        >取消</el-button
      >
      <el-button type="primary" @click="handleUpdateClose('submit')">
        确认
      </el-button>
    </el-dialog>
  </Teleport>
</template>

<style scoped>
.el-form {
  margin: 20px;
}
.el-form-item {
  width: 280px;
}
.container {
  position: relative;
  display: flex;
  width: 100%;
}
.form_container {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}
</style>

<style>
.el-dialog__header {
  padding-top: 0 !important;
}
</style>
