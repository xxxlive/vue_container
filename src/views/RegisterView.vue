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
    <div style="margin:20px 0"><b>User register</b></div>
    
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
