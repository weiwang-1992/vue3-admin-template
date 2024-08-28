<template>
  <div>
    <el-form :inline="true" class="search-form" :model="searchData">
      <el-form-item label="用户昵称">
        <el-input v-model="searchData.nickName" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="searchData.role" placeholder="请选择用户角色" style="width: 200px">
          <el-option label="全部" :key="0" :value="0"></el-option>
          <el-option 
            v-for="item in roleWithAuthList"
            :key="item.roleId" 
            :label="item.roleName" 
            :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchUser">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"/>
      <el-table-column prop="nickName" label="用户昵称" width="180"/>
      <el-table-column prop="role" label="用户角色" >
        <template #default="scope">
          <el-button v-for="item in scope.row.role" :key="item.role" type="primary" size="small">{{ item.roleName }}</el-button>
        </template>
        </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 编辑用户的弹出窗-->
  <el-dialog v-model="editShow" title="编辑用户信息">
      <el-form :model="editUser">
          <el-form-item label="用户昵称" label-width="120px">
              <el-input v-model="editUser.nickName" class="w192" autocomplete="off" />
          </el-form-item>

          <el-form-item label="用户角色" label-width="120px">
              <el-select v-model="editUser.role" multiple style="width:200px" placeholder="请选择角色">
                  <el-option
                      v-for="item in roleWithAuthList"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                  />
              </el-select>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button @click="editShow = false">取消</el-button>
              <el-button type="primary" @click="ensureEditUser">修改</el-button>
          </span>
      </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
import { id } from 'element-plus/es/locale';
import role from 'mock/role';

interface IRole {
  role: number; // 角色id
  roleName: string; // 角色名称
}

interface IUser {
  id: number;
  nickName: string;
  userName: string;
  role: IRole[]
}

interface IQueryUser {
  nickName: string;
  role: number;
}

interface IRoleWithAuth {
  roleName: string;
  roleId: number;
  authority: [];
}

interface IUserEdit {
  id: number;
  nickName: string;
  userName: string;
  role: number[]
}

const searchData = reactive<IQueryUser>({
  nickName: '',
  role: 0
})

let roleWithAuthList = ref<IRoleWithAuth[]>([])

const userList = ref<IUser[]>([])
// 查询用户
const handleSearchUser = () => {
  let res: IUser[] = []
  if(searchData.nickName || searchData.role) { // 如果有查询条件
    if(searchData.nickName) { // 如果有昵称
      res = userList.value.filter(item => {
        return item.nickName.includes(searchData.nickName)
      })
    }
    if (searchData.role) {
      res = searchData.nickName ? res : userList.value;
      res = res.filter((item) => {
          return item.role.find((value) => {
              return value.role === searchData.role;
          });
      });
    }
  }else {
    res = userList.value
  }
  userList.value = res
}

// watch 监听
watch([() => searchData.nickName, () => searchData.role], () => {
    if (searchData.nickName === '' || searchData.role === 0) {
        fetchUserList();
    }
});

onMounted(() => {
  fetchUserList()
  fetchRoleList()
})

const fetchUserList = () => {
  getUserList().then(res => {
    userList.value = res.data
  })
}

const fetchRoleList = () => {
  getRoleList().then(res => {
    roleWithAuthList.value = res.data
  })
}

let editShow = ref(false) // 编辑用户的弹出窗

const handleEditUser = (row: IUser) => {
  editShow.value = true
  Object.assign(editUser, {
      ...row,
      role: row.role.map((value) => value.role)
  });
}

let editUser = reactive<IUserEdit>({
  id: 0,
  nickName: '',
  userName: '',
  role: [],
})

const ensureEditUser = () => {
    console.log(editUser);
    editShow.value = false;
    // 取出来修改的对象
    let obj: IUser = userList.value.find((item) => item.id === editUser.id);
    // 修改了nickName
    obj.nickName = editUser.nickName;
    //  obj.role.splice(0, obj.role.length)  // 清除角色
    obj.role = []; // 清除角色
    console.log(obj);
    roleWithAuthList.value.forEach((element) => {
        if (editUser.role.find((value) => value === element.roleId)) {
            obj.role.push({
                role: element.roleId, // 角色id
                roleName: element.roleName // 角色名称
            });
        }
    });
};


</script>

<style scoped lang="less">
.search-form {
    padding: 10px 0 0 10px;
}

.w192 {
    width: 192px;
}
</style>