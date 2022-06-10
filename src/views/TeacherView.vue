<template>
  <div>

    <div>
      <el-input
          style="width: 200px"
          v-model="id"
          placeholder="please input id"
      ></el-input>
      <el-input
          style="width: 200px"
          v-model="name"
          placeholder="please input name"
      ></el-input>
      <el-input
          style="width: 200px"
          v-model="title"
          placeholder="please input title"
      ></el-input>
      <el-button type="primary" @click="loadData">search</el-button>
      <el-button type="info">reset</el-button>
    </div>

    <div>
      <el-button type="primary">Add</el-button>
      <el-button type="info" @click="deleteMul">DeleteMul</el-button>
      <el-button type="info" @click="exportTeacher">Export</el-button>
      <el-button type="info" @click="importTeacher">Import</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column label="operations" width="200">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">Edit</el-button>
          <el-popconfirm
              title="Are you sure to delete this?"
              confirm-button-text="yes"
              cancel-button-text="no"
              @confirm="del(scope.row.id)">
            <template #reference>
              <el-button type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[1, 2, 10, 20]"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next,jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog
        title="teacher information"
        v-model="centerDialogVisible"
        width="50%"
        center
    >
      <el-form label-width="120px">
        <el-form-item label="Id">
          <el-input v-model="form.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="name">
          <el-input
              type="text"
              v-model="form.name"
              placeholder="please enter your name"
          ></el-input>
        </el-form-item>
        <el-form-item label="title">
          <el-input
              type="text"
              v-model="form.title"
              placeholder="please enter your title"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="centerDialogVisible = false" type="info"
          >Cancel
          </el-button
          >
          <el-button type="primary" @click="save">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "TeacherView",
  created() {
    this.loadData();
  },
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      centerDialogVisible: false,
      form: {},
      id: "",
      name: "",
      title: "",
      multipleSelection: [],
    };
  },
  methods: {
    exportTeacher() {
      window.open("http://localhost:8088/teacher/export")
    },
    importTeacher() {

    },
    deleteMul() {
      let ids = this.multipleSelection.map((v) => v.id);
      console.log(ids)
      this.request.post("/teacher/delete/mul", ids).then((resp) => {
        if (resp.data === "OK") {
          this.$message.success("delete is successful");
          this.loadData();
        } else {
          this.$message.success("delete is unsuccessful");
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.centerDialogVisible = true;
    },
    save() {
      this.request.post("/teacher/update", this.form).then((resp) => {
        if (resp.data === "OK") {
          this.$message.success("update is successful");
          this.centerDialogVisible = false;
          this.loadData();
        } else {
          this.$message.success("update is unsuccessful");
        }
      });
    },
    loadData() {
      this.request
          .get("/teacher/getTeachers", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              id: this.id,
              name: this.name,
              title: this.title,
            },
          })
          .then((resp) => {
            this.tableData = resp.data.data.list;
            this.total = resp.data.data.total;
          });
    },
    del(id) {
      this.request
          .get("/teacher/delete", {
            params: {
              id,
            },
          })
          .then((resp) => {
            if (resp.data === "OK") {
              this.$message.success("delete is successful");
              this.loadData();
            } else {
              this.$message.success("delete is unsuccessful");
            }
          });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.loadData();
    },
  },
};
</script>
