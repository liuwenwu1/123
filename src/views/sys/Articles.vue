<template>
  <div>
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索:">
        <el-input size="small" v-model="formInline.title" placeholder="输入文章标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="add()">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表-->
    <el-table :data="listData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="390">
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="390">
      </el-table-column>
      <el-table-column prop="body" label="文章内容" width="390">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="formInline.page" :page-sizes="[10, 20, 30, 50]" :page-size="formInline.rows" layout="total, sizes, prev, pager, next, jumper"
      :total="pageBean.total">
    </el-pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="文章标题" prop="title">
          <el-input size="small" v-model="editForm.title" auto-complete="off" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="body">
          <el-input size="small" v-model="editForm.body" auto-complete="off" placeholder="请输入文章内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listData: [],
        pageBean: {
          total: 0
        },
        formInline: {
          title: '',
          page: 1,
          rows: 10,
          total: 0
        },
        editFormVisible: false,
        title: '',
        editForm: {
          body: '',
          title: '',
          id: 0
        },
        rules: {
          title: [{
            required: true,
            message: '请输入文章标题',
            trigger: 'blur'
          }],
          body: [{
              required: true,
              message: '请输入文章内容',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    methods: {
      search() {
        this.doSearch(this.formInline);
      },
      doSearch(params) {
        let url = this.axios.urls.SYSTEM_ARTICLE_LIST;
        this.axios.post(url, params).then((response) => {
          console.log(response);
          this.listData = response.data.result;
          this.pageBean = response.data.pageBean;
        }).catch((response) => {
          console.log(response);

        });
      },
      handleSizeChange(rows) {
        console.log('页码大小发生改变' + rows);
        this.formInline.page = 1;
        this.formInline.rows = rows;
        this.search();
      },
      handleCurrentChange(page) {
        console.log('当前页码发生改变' + page);
        this.formInline.page = page;
        this.search();
      },
      /* 关闭新增编辑界面*/
      closeDialog() {
        this.editFormVisible = false;
        this.clearFrom();
      },
      /* 提交新增，修改*/
      submitForm() {
        //用来提交新增，修改的表单数据的，提交之前需要通过Vue实列中定义的表单填写规则
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            let url;
            if (this.editForm.id == 0) {
              url = this.axios.urls.SYSTEM_ARTICLE_ADD;
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            } else {
              url = this.axios.urls.SYSTEM_ARTICLE_EDIT;
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
            }
            this.axios.post(url,
              this.editForm
            ).then((response) => {
              console.log(response);
              this.clearFrom();
              this.doSearch(this.formInline);
            }).catch((response) => {
              console.log(response);
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /* 清空表格*/
      clearFrom() {
        this.editForm.id = '';
        this.editForm.title = '';
        this.editForm.body = '';
        this.formInline.page = 1;
        this.formInline.rows = 10;
        this.editFormVisible = false;
      },
      /* 新增文章*/
      add() {
        this.title = '新增文章';
        this.editFormVisible = true;
      },
      /*删除文章 */
      del(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = this.axios.urls.SYSTEM_ARTICLE_DEL;
          this.axios.post(url, {
            id: row.id
          }).then((response) => {
            console.log(response);
            this.clearFrom();
            this.doSearch({});
          }).catch((response) => {
            console.log(response);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      /* 编辑文章*/
      edit(index, row) {
        this.title = '编辑文章';
        //index代表的是操作数据在当前界面的行号
        //row代表操作当前数据，也就是说可以重row中获取所有数据库列段名
        //var row = $("#dd").datagrid("getselected");
        //$("#ff").form("load",row);完成了数据回显
        this.editForm.id = row.id;
        this.editForm.title = row.title;
        this.editForm.body = row.body;
        this.editFormVisible = true;
      }

    },
    created() {
      this.doSearch({});
    }
  }
</script>

<style>
</style>
