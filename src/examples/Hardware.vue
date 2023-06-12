<script lang="ts" setup>
import { ref, watch } from 'vue'
import request from '../utils/request'
import type { IHardware, TEdit, TUpdate } from './types'
import HardwareOption from './components/HardwareOption.vue'
// 分页数据
const pagesize = 20
const pagenum = ref(1)
const { data: { data: hardwareJSON } } = await request.get('/hardware')
const isLoading = ref(false)
const total = ref(hardwareJSON.length)
// 表格数据
const hardware = ref(hardwareJSON.slice(0, pagesize))
// 查询表单数据
const searchForm = ref({ name: '', type: '' })
// 修改弹出框的显示与隐藏
const visible = ref(false)
// 更新框数据
const updatedHardware = ref<IHardware>()
watch([pagenum, searchForm], (newValue) => {
  const filterHardware = hardwareJSON.filter((item: { name: string; type: string; }) => {
    const originName = item.name.toLowerCase()
    const findName = searchForm.value.name.toLowerCase()
    const originType = item.type.toLowerCase()
    const findType = searchForm.value.type.toLowerCase()
    if (searchForm.value.name === '')
      return originType.includes(findType)
    if (searchForm.value.type === '')
      return originName.includes(findName)
    return originName.includes(findName) && originType.includes(findType)
  })
  hardware.value = filterHardware.slice((newValue[0] - 1) * pagesize, newValue[0] * pagesize)
  total.value = filterHardware.length
}, { deep: true })

// 重新请求函数
async function reFetch() {
  try {
    isLoading.value = true
    const { data: { data: hardwareJSON }} = await request.get('/hardware')
    hardware.value = hardwareJSON
  } catch(error) {
    ElMessage.error('获取数据失败!')
  } finally {
    isLoading.value = false
  }
}
// 控制硬件操作按钮的函数
// type 为 update 表示要更新，type 为 delete 表示要删除
async function handlerEdit(rowData: IHardware, type: TEdit) {
  if (type === 'update') {
    updatedHardware.value = { ...rowData }
    visible.value = true
  } else if (type === 'delete') {
    // 删除操作
    try {
      isLoading.value = true
      const { data: { message } } = await request.delete(`/hardware/${rowData.id}`)
      ElMessage.success(message)
      await reFetch()
    } catch (error) {
      ElMessage.error('删除数据失败!')
    } finally {
      isLoading.value = false
    }
  }
}
// 搜索框的搜索函数
// 修改框的操作，type 为 submit 表示用户确认了修改，type 为 cancel 表示用户取消了修改
async function handleUpdateClose(type: TUpdate) {
  if (type === 'submit') {
    // TODO：put 请求数据
    const { id, name, type, row, col, box_num } = updatedHardware.value!
    try {
      isLoading.value = true
      await request.put(`/hardware/${id}`, {
        id, name, type, row, col, box_num
      })
      ElMessage.success('更新数据成功!')
      await reFetch()
    } catch (error) {
      ElMessage.error('更新数据失败!')
    } finally {
      isLoading.value = false
    }
  } else {
    ElMessage.info('用户关闭了修改框')
  }
  visible.value = false
}
</script>

<template>
  <div class="container" v-loading.fullscreen.lock="isLoading">
    <div class="form_container">
      <el-form :model="searchForm">
        <el-form-item label="器件名称">
          <el-input placeholder="请输入器件名称" v-model="searchForm.name" />
        </el-form-item>
        <el-form-item label="器件类型">
          <el-select style="padding: 0" v-model="searchForm.type">
            <HardwareOption />
          </el-select>
        </el-form-item>
      </el-form>
      <el-pagination
        @current-change="(newPagenum: number) => pagenum = newPagenum"
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
          <el-select style="padding: 0" v-model="searchForm.type">
            <HardwareOption />
          </el-select>
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
