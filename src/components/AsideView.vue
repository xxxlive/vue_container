<template>
  <el-menu
    :default-openeds="opens"
    :collapse="isCollapse"
    style="min-height: 100%; overflow: hidden"
    text-color="#000"
    :collapse-transition="false"
    router
  >
    <div>
      <b v-show="logoTextShow">Video Management System</b>
    </div>
    <el-submenu index="1">
      <template #title
        ><i class="el-icon-message"></i>Navigator One</template
      >
      <el-menu-item-group>
        <template #title>Group 1</template>
        <el-menu-item index="1-1">Option 1</el-menu-item>
        <el-menu-item index="1-2">Option 2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group 2">
        <el-menu-item index="1-3">Option 3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template #title>Option4</template>
        <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template #title
        ><i class="el-icon-menu"></i>Navigator Two</template
      >
      <el-menu-item-group>
        <template #title>Group 1</template>
        <el-menu-item index="2-1">Option 1</el-menu-item>
        <el-menu-item index="2-2">Option 2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group 2">
        <el-menu-item index="2-3">Option 3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="2-4">
        <template #title>Option 4</template>
        <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
};
</script>

<style>
</style>
