<template>
  <el-menu
      :default-openeds="opens"
      style="min-height: 100%; overflow: hidden"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :collapse="isCollapse"
      router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
          src="../assets/logo.png"
          alt=""
          style="width: 20px; position: relative; top: 5px"
      />
      <b style="color: white; margin-left: 5px" v-show="logoTextShow">VMS</b>
    </div>
    <div v-for="item in menus" :key="item.id">
      <div v-if="item.path">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span>
            <slot name="title"></slot>
            {{ item.name }}
          </span>
        </el-menu-item>
      </div>
      <div v-else>
        <el-submenu :index="item.id + ''">
          <template>
            <slot name="title"></slot>
            <i :class="item.icon"></i>
            <span>
              <slot name="title"></slot>
              {{ item.name }}
            </span>
          </template>
          <div v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path">
              <i :class="subItem.icon"></i>
              <span>
                <slot name="title"></slot>
                {{ subItem.name }}
              </span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
  data() {
    return {
      menus: localStorage.getItem("menus")
          ? JSON.parse(localStorage.getItem("menus"))
          : [],
      opens: localStorage.getItem("menus")
          ? JSON.parse(localStorage.getItem("menus")).map((v) => v.id + "")
          : [],
    };
  },
};
</script>

<style>
.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}

.el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-submenu__title:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-menu--collapse span {
  visibility: hidden;
}
</style>
