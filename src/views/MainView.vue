<template>
  <el-container style="min-height: 100vh">
    <el-aside
      :width="sideWidth + 'px'"
      style="background-color: rgb(238, 241, 246)"
    >
      <AsideView :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <HeaderView
          :collapseBtnClass="collapseBtnClass"
          @asideCollapse="collapse"
        />
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="Date" width="140">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="120">
          </el-table-column>
          <el-table-column prop="address" label="Address"> </el-table-column>
        </el-table>
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
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      logoTextShow: true,
      sideWidth: 200,
    };
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapseBtnClass = "el-icon-s-unfold";
        this.logoTextShow = false;
        this.sideWidth = 60
      } else {
        this.collapseBtnClass = "el-icon-s-fold";
        this.logoTextShow = true;
        this.sideWidth = 200
      }
    },
  },
};
</script>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
