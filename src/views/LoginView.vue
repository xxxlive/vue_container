<template>
  <div
    style="
      margin: 100px auto;
      width: 400px;
      height: 300px;
      padding: 20px;
      border-radius: 10px;
    "
  >
    <div style="margin: 20px 0"><b>User Login</b></div>
    <el-form ref="userForm" :model="user" :rules="rules" label-width="120px">
      <el-form-item label="userid" prop="userid">
        <el-input
          v-model="user.userid"
          placeholder="please enter your userid"
        ></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model="user.password"
          type="password"
          placeholder="please enter your password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Usertype" prop="usertypeid">
        <el-select
          v-model="user.usertypeid"
          placeholder="please select your type"
        >
          <el-option label="graduate" value="1" selected="selected"></el-option>
          <el-option label="postgraducate" value="2"></el-option>
          <el-option label="tutor" value="3"></el-option>
          <el-option label="admin" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Sign in</el-button>
        <el-button type="info" @click="$router.push('/register')"
          >Register</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setMenus } from "@/router";
export default {
  name: "HomeView",
  data() {
    return {
      user: {},
      rules: {
        userid: [
          { required: true, message: "Please input userid", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "Length should be 6 to 10",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "Password length should be 6 to 10",
            trigger: "blur",
          },
        ],
        usertypeid: [
          {
            required: true,
            message: "Please select usertype",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.request.post("/user/checkUser", this.user).then((resp) => {
            if (resp.data.code === 200) {
              localStorage.setItem("menus", JSON.stringify(resp.data.data.menus));
              localStorage.setItem("user", JSON.stringify(resp.data.data));
              console.log(resp.data.data.menus)
              setMenus();
              this.$message.success("login is successful");
              this.$router.push("/");
            } else {
              this.$message.error(resp.data.message);
            }
          });
        }
      });
    },
  },
};
</script>
