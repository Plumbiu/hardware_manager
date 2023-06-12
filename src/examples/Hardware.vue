<script lang="ts" setup>
import { ref, watch } from 'vue'
import request from '../utils/request'
import type { IHardware, TEdit, TModify } from './types'
import HardwareOption from './components/HardwareOption.vue'
// 分页数据
const pagesize = 20
const pagenum = ref(1)
let {
  data: { data: hardwareJSON },
} = await request.get('/hardware')
const isLoading = ref(false)
const total = ref(hardwareJSON.length)
// 表格数据
const hardware = ref(hardwareJSON.slice(0, pagesize))
// 查询表单数据
const searchForm = ref({ name: '', type: '' })
// 修改弹出框的显示与隐藏
const updateVisible = ref(false)
// 增加弹出框的显示与隐藏
const addVisible = ref(false)
// 更新框数据
const modifiedHardware = ref<IHardware>()
watch([pagenum, searchForm], (newValue) => {
  hardware.value = filterHardware(newValue)
}, { deep: true })
function filterHardware(newValue: any) {
  const temp = hardwareJSON.filter((item: { name: string; type: string }) => {
    const originName = item.name.toLowerCase()
    const findName = newValue[1].name.toLowerCase()
    const originType = item.type.toLowerCase()
    const findType = newValue[1].type.toLowerCase()
    if (newValue[1].name === '') return originType.includes(findType)
    if (newValue[1].type === '') return originName.includes(findName)
    return originName.includes(findName) && originType.includes(findType)
  })
  total.value = temp.length
  return temp.slice((newValue[0] - 1) * pagesize, newValue[0] * pagesize)
}
function handlerAdd(rowData: IHardware) {
  addVisible.value = true
  modifiedHardware.value = { ...rowData }
}
// 重新请求函数
async function reFetch() {
  try {
    isLoading.value = true
    const {
      data: { data },
    } = await request.get('/hardware')
    hardwareJSON = data
    hardware.value = filterHardware([pagenum.value, searchForm.value])
  } catch (error) {
    ElMessage.error('获取数据失败!')
  } finally {
    isLoading.value = false
  }
}
// 控制硬件操作按钮的函数
// type 为 update 表示要更新，type 为 delete 表示要删除
async function handlerEdit(rowData: IHardware, type: TEdit) {
  if (type === 'update') {
    modifiedHardware.value = { ...rowData }
    updateVisible.value = true
  } else if (type === 'delete') {
    // 删除操作
    try {
      isLoading.value = true
      const {
        data: { message },
      } = await request.delete(`/hardware/${rowData.id}`)
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
async function handleAddUpdate(ModifyType: TModify) {
  const { id, name, type, row, col, box_num } = modifiedHardware.value!
  if (ModifyType === 'update') {
    // TODO：put 请求数据
    try {
      const updateData = { id, name, type, row, col, box_num }
      isLoading.value = true
      await request.put(`/hardware/${id}`, updateData)
      ElMessage.success('更新数据成功!')
      await reFetch()
    } catch (error) {
      ElMessage.error('更新数据失败!')
    } finally {
      updateVisible.value = false
      isLoading.value = false
    }
  } else if (ModifyType === 'add') {
    try {
      const addData = { name, type, row, col, box_num }
      isLoading.value = true
      await request.post('/hardware', addData)
      ElMessage.success('添加数据成功!')
      await reFetch()
    } catch(error) {
      ElMessage.error('更新数据失败!')
    } finally {
      isLoading.value = false
      addVisible.value = false
    }
  } else {
    updateVisible.value = false
    isLoading.value = false
    ElMessage.info('用户关闭了修改框')
  }
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
        label="盒子类型-序号"
        width="150"
      >
        <template #default="scope">
          <span>{{ scope.row.box_num }}</span>
          <el-button type="primary" size="small" @click="handlerAdd(scope.row)"
            >添加硬件</el-button
          >
        </template>
      </el-table-column>
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
    <el-dialog width="450" v-model="updateVisible" :show-close="false">
      <h2>修改器件</h2>
      <el-form :model="modifiedHardware">
        <el-form-item label="器件名称" prop="name">
          <el-input
            v-model="modifiedHardware!.name"
            :placeholder="modifiedHardware?.name"
          />
        </el-form-item>
        <el-form-item label="盒子序号" prop="box_num">
          <el-input
            v-model="modifiedHardware!.box_num"
            :placeholder="String(modifiedHardware?.box_num)"
          />
        </el-form-item>
        <el-form-item label="器件类型" prop="type">
          <el-input
            v-model="modifiedHardware!.type"
            :placeholder="String(modifiedHardware?.type)"
          />
        </el-form-item>
        <el-form-item label="器件位置(行)" prop="row">
          <el-input
            v-model="modifiedHardware!.row"
            :placeholder="modifiedHardware?.row"
          />
        </el-form-item>
        <el-form-item label="器件位置(列)" prop="col">
          <el-input
            v-model="modifiedHardware!.col"
            :placeholder="modifiedHardware?.col"
          />
        </el-form-item>
      </el-form>
      <el-button type="info" @click="updateVisible = false"
        >取消</el-button
      >
      <el-button type="primary" @click="handleAddUpdate('update')">
        确认
      </el-button>
    </el-dialog>
  </Teleport>
  <Teleport to="body">
    <el-dialog width="450" v-model="addVisible" :show-close="false">
      <h2>添加器件</h2>
      <el-form :model="modifiedHardware">
        <el-form-item label="器件名称" prop="name">
          <el-input
            v-model="modifiedHardware!.name"
            :placeholder="modifiedHardware?.name"
          />
        </el-form-item>
        <el-form-item label="盒子序号" prop="box_num">
          <el-input
            v-model="modifiedHardware!.box_num"
            :placeholder="String(modifiedHardware?.box_num)"
          />
        </el-form-item>
        <el-form-item label="器件类型" prop="type">
          <el-input
            v-model="modifiedHardware!.type"
            :placeholder="String(modifiedHardware?.type)"
          />
        </el-form-item>
        <el-form-item label="器件位置(行)" prop="row">
          <el-input
            v-model="modifiedHardware!.row"
            :placeholder="modifiedHardware?.row"
          />
        </el-form-item>
        <el-form-item label="器件位置(列)" prop="col">
          <el-input
            v-model="modifiedHardware!.col"
            :placeholder="modifiedHardware?.col"
          />
        </el-form-item>
      </el-form>
      <el-button type="info" @click="addVisible = false"
        >取消</el-button
      >
      <el-button type="primary" @click="handleAddUpdate('add')">
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
  margin: 0 25px;
}
</style>

<style>
.el-dialog__header {
  padding-top: 0 !important;
}
</style>
