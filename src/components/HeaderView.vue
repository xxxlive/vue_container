<template>
  <div style="line-height: 60px; display: flex">
    <span
      :class="collapseBtnClass"
      style="cursor: pointer; font-size: 18px"
      @click="collapse"
    ></span>
    <el-breadcrumb
      separator="/"
      style="display: inline-block; margin-left: 10px"
    >
      <el-breadcrumb-item :to="'/'">HomePage</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu>
        <el-dropdown-item>View</el-dropdown-item>
        <el-dropdown-item>Add</el-dropdown-item>
        <el-dropdown-item>Delete</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>Tom</span>
  </div>
</template>

<script>
export default {
  props: {
    collapseBtnClass: String,
  },
  methods: {
    collapse() {
      this.$emit('asideCollapse')
    },
  },
};
</script>

<style>
</style>
