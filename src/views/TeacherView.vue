<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column label="operations" width="200">
        <template #default>
          <el-button type="primary">Edit</el-button>
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
  </div>
</template>

<script>
export default {
  name: "TeacherPage",
  created() {
    this.loadData();
  },
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 1,
      total: 0,
    };
  },
  methods: {
    loadData() {
      this.request
          .get("/teacher/getTeachers", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            },
          })
          .then((resp) => {
            console.log(resp.data.data)
            this.tableData = resp.data.data.list;
            this.total = resp.data.data.total;
          });
    },
    del(id) {
      alert(id);
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
