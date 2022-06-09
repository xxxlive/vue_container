<template>
  <el-container style="min-height: 100vh">
    <el-aside
      :width="sideWidth + 'px'"
      style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%)"
    >
      <AsideView :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc">
        <HeaderView
          :collapseBtnClass="collapseBtnClass"
          @asideCollapse="collapse"
          :username = username
        />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AsideView from "@/components/AsideView.vue";
import HeaderView from "@/components/HeaderView.vue";
export default {
  components: {
    AsideView,
    HeaderView,
  },
  created() {
    this.getUser();
  },
  data() {
    return {
      collapseBtnClass: "Fold",
      isCollapse: false,
      logoTextShow: true,
      sideWidth: 200,
      username: "",
    };
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapseBtnClass = "FolderOpened";
        this.logoTextShow = false;
        this.sideWidth = 60;
      } else {
        this.collapseBtnClass = "Fold";
        this.logoTextShow = true;
        this.sideWidth = 200;
      }
    },
    getUser() {
      let username = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).username
        : "";
      this.username = username;
    },
  },
};
</script>


<style>
</style>
