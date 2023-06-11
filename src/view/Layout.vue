<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-container>
      <el-header>
        <span class="logo">孵化器硬件管理系统</span>
        <div class="toolbar">
          <ElButton>登录</ElButton>
          <span>用户名</span>
        </div>
      </el-header>
      <el-main style="display: flex">
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu router :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><icon-menu /></el-icon>成员操作
                </template>
                <el-menu-item index="1-2">
                  <template #title>
                    <el-icon><User /></el-icon>用户管理
                  </template>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <template #title>
                    <el-icon><message /></el-icon>评论系统
                  </template>
                </el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>硬件管理
                </template>
                <el-menu-item index="2-1">
                  <template #title>
                    <el-icon><Files /></el-icon>硬件表格
                  </template>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <template #title>
                    <el-icon><CopyDocument /></el-icon>批量导入
                  </template>
                </el-menu-item>
                <el-menu-item index="2-3">
                  <template #title>
                    <el-icon><Finished /></el-icon>.......
                  </template>
                </el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><icon-menu /></el-icon>例子
                </template>
                <el-menu-item index="/examples/login">
                  <template #title>
                    <el-icon><Reading /></el-icon>登录
                  </template>
                </el-menu-item>
                <el-menu-item index="/examples/hardware">
                  <template #title>
                    <el-icon><Reading /></el-icon>硬件管理表
                  </template>
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-scrollbar style="flex: 1">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {
  CopyDocument,
  Files,
  Finished,
  Menu as IconMenu,
  Message,
  Reading,
  User,
} from '@element-plus/icons-vue'
</script>

<style scoped>
.layout-container-demo .el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: var(--el-color-primary-dark-2);
  color: var(--el-text-color-primary);
  font-size: 12px;
}
.layout-container-demo .logo {
  font-size: 26px;
  color: white;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  border-right: 1px solid #ccc;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  gap: 20px;
}
</style>
