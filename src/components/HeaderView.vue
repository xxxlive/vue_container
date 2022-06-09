<template>
  <div style="line-height: 60px; display: flex;">
    <div style="flex: 1">
      <span
          style="cursor: pointer; font-size: 18px"
          @click="collapse"
      ><el-icon class="el-icon--left" >
        <component :is="collapseBtnClass"></component>
      </el-icon>
      </span>
      <el-breadcrumb
          separator="/"
          style="display: inline-block; margin-left: 10px"
      >
        <el-breadcrumb-item :to="'/'">HomePage</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
      <div style="display: inline-block">
        <span>{{ username }}</span
        ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu
          style="width: 100px; text-align: center"
      >
        <slot name="dropdown"></slot>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person">person Center</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/password"
          >change password
          </router-link
          >
        </el-dropdown-item
        >
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span @click="logout">logout</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.collapseBtnClass)
  },
  props: {
    collapseBtnClass: String,
    username: String,
  },
  methods: {
    collapse() {
      this.$emit("asideCollapse");
    },
    logout() {
      this.$store.commit("logout");
      this.$message.success("logout successfully");
    },
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;
    },
  },
};
</script>

<style>
</style>
