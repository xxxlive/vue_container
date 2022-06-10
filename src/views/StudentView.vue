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
          v-model="nation"
          placeholder="please input nation"
      ></el-input>
      <el-button type="primary" @click="loadData">search</el-button>
      <el-button type="info" @click="resetSearch">reset</el-button>
    </div>

    <div>
      <el-button type="primary" @click="addStuPage">Add</el-button>
      <el-button type="info" @click="deleteMul">DeleteMul</el-button>
      <el-button type="info" @click="exportTeacher">Export</el-button>
      <el-button type="info" @click="importTeacher">Import</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column prop="nation" label="Nation"></el-table-column>
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
        title="student information"
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
        <el-form-item label="nation">
          <el-input
              type="text"
              v-model="form.nation"
              placeholder="please enter your nation"
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


    <el-dialog
        title="student information"
        v-model="addPageVisible"
        width="50%"
        center
    >
      <el-form ref="StuForm" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="Id" prop="id">
          <el-input
              type="text"
              v-model="form.id"
              placeholder="please enter your id"
          ></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input
              type="text"
              v-model="form.password"
              placeholder="please enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item label="name">
          <el-input
              type="text"
              v-model="form.name"
              placeholder="please enter your name"
          ></el-input>
        </el-form-item>
        <el-form-item label="nation">
          <el-input
              type="text"
              v-model="form.nation"
              placeholder="please enter your nation"
          ></el-input>
        </el-form-item>
        <el-form-item label="usertype" prop="usertypeid">
          <el-select v-model="form.usertypeid" class="m-2" placeholder="Select" size="small">
            <el-option
                v-for="item in usertypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="addPageVisible = false" type="info"
          >Cancel
          </el-button
          >
          <el-button type="primary" @click="addStu">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "StudentView",
  created() {
    this.loadData();
  },
  data() {
    return {
      rules: {
        id: [
          {required: true, message: "Please input userid", trigger: "blur"},
          {
            min: 3,
            max: 10,
            message: "Length should be 6 to 10",
            trigger: "blur",
          },
        ],
        password: [
          {required: true, message: "Please input password", trigger: "blur"},
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
        ]
      },
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
      nation: "",
      addPageVisible: false,
      usertypeid: '',
      usertypeOptions: [
        {
          value: 1,
          label: 'Graduate',
        },
        {
          value: 2,
          label: 'postgraducate',
        },
      ]
    };
  },
  methods: {
    resetSearch() {
      this.nation = ""
      this.name = ""
      this.id = ""
      this.loadData()
    },
    exportTeacher() {
      window.open("http://localhost:8088/student/export")
    },
    importTeacher() {

    },
    deleteMul() {
      let ids = this.multipleSelection.map((v) => v.id);
      console.log(ids)
      this.request.post("/student/delete/mul", ids).then((resp) => {
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
      this.request.post("/student/update", this.form).then((resp) => {
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
      console.log(this.nation)
      this.request
          .get("/student/getStudents", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              id: this.id,
              name: this.name,
              nation: this.nation,
            },
          })
          .then((resp) => {
            console.log(resp.data.data.list)
            this.tableData = resp.data.data.list;
            this.total = resp.data.data.total;
          });
    },
    del(id) {
      this.request
          .get("/student/delete", {
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
    addStuPage() {
      this.addPageVisible = !this.addPageVisible
    },
    addStu() {
      this.$refs["StuForm"].validate((valid) => {
        if (valid) {
          this.request.post("/student/add", this.form).then((resp) => {
            if (resp.data === "OK") {
              this.$message.success("add is successful");
              this.addPageVisible = false;
              this.form = {}
              this.loadData();
            } else {
              this.$message.success("add is unsuccessful");
            }
          });
        }
      })
    }
  },
};
</script>
