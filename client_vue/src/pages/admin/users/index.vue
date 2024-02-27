<template>
  <div class="flex justify-between mb-2">
    <a-button
      size="large"
      class="flex items-center"
      @click="handleAdd"
    >
      <template #icon>
        <UserAddOutlined />
      </template>
      Add
    </a-button>
    <el-dialog
      title="Create new account"
      v-model="dialogFormisible"
      draggable
      width="60%"
      height="80%"
      @closed="resetForm(ruleFormRef)"
    >
      <div class="flex gap-4 items-start lg:gap-10 flex-col lg:flex-row">
        <div class="w-full lg:w-[300px] flex flex-col items-center">
          <Transition>
            <div
              v-if="!imageIsSelected"
              class="w-[100px] h-[100px] flex flex-col items-center justify-center mb-4 bg-slate-200 lg:w-[150px] lg:h-[150px] lg:flex-row hover:bg-[#9df99a] hover:transition-all hover:border-[1px] hover:border-[#8ffa8b] duration-500"
            >
              <PlusOutlined class="scale-150 text-[#d5d5d5]" />
            </div>
            <div v-else>
              <img
                class="image mb-4"
                :src="image"
              />
            </div>
          </Transition>

          <input
            ref="imageInput"
            type="file"
            @change="uploadImage"
          />
        </div>
        <el-form
          ref="ruleFormRef"
          label-width="100px"
          class="demo-ruleForm w-full"
          status-icon
          label-position="left"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item
            label="Username"
            prop="username"
          >
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item
            label="Name"
            prop="name"
          >
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item
            label="Email"
            prop="email"
          >
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
          >
            <el-input
              type="password"
              v-model="ruleForm.password"
            />
          </el-form-item>
          <el-form-item
            label="Department"
            prop="department"
          >
            <el-select
              v-model="ruleForm.department"
              placeholder="Department"
            >
              <el-option
                disabled
                label="Admin"
                value="1"
              />
              <el-option
                label="User"
                value="2"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Status"
            prop="status"
          >
            <el-radio-group v-model="ruleForm.status">
              <el-radio
                label="Active"
                value="1"
              />
              <el-radio
                label="Deactive"
                disabled
                value="2"
              />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              Add
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <a-input
      v-model:value="searchInput"
      placeholder="Search"
      size="large"
      class="w-4/12"
    />
  </div>
  <a-table
    :columns="header"
    :data-source="filteredUsers"
    :scroll="{ x: 768 }"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Name </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag
            :key="record.status"
            :color="record.status === 'Active' ? 'green' : 'red'"
          >
            {{ record.status }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <a-space>
          <a-button
            @click="onEditUser(record.name)"
            class="flex items-center justify-center"
            type="default"
          >
            <template #icon>
              <EditOutlined two-tone-color="#1677ff" />
            </template>
          </a-button>
          <a-button
            @click="onDeleteIconClick(record.name)"
            class="flex items-center justify-center"
            type="primary"
            danger
          >
            <template #icon>
              <DeleteOutlined two-tone-color="#ffa345" />
            </template>
          </a-button>
          <a-modal
            title="Confirm"
            v-model:open="open"
          >
            <template #footer>
              <a-button
                @click="handleCancel"
                danger
                >Cancel</a-button
              >
              <a-button
                :loading="confirmLoading"
                @click="handleOk"
                >OK</a-button
              >
            </template>
            <p>{{ `Are you sure to delete user ${record.name}` }}</p>
          </a-modal>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup>
  import { ref, computed, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import {
    UserAddOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
  } from '@ant-design/icons-vue';
  import { useMenuStore } from '../../../store/menu';
  import { useUsersStore } from '../../../store/users';

  // store state
  let { setSelectedKeys } = useMenuStore();
  let { users, header } = storeToRefs(useUsersStore());
  let { getAllUsers, deleteUser, createUser } = useUsersStore();

  // internal state
  let searchInput = ref('');
  let open = ref(false);
  let confirmLoading = ref(false);
  let deleteUserName = ref(null);
  let dialogFormisible = ref(false);
  let imageInput = ref(null);
  const ruleFormRef = ref();
  const ruleForm = reactive({
    username: '',
    name: '',
    email: '',
    password: '',
    department: '',
    status: 'Active',
  });
  let imageIsSelected = ref(false);
  let image = ref('');

  const rules = reactive({
    username: [
      {
        required: true,
        message: 'Please input username',
        trigger: 'blur',
      },
      { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
    ],
    name: [
      {
        required: true,
        message: 'Please input name',
        trigger: 'blur',
      },
      { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
    ],
    email: [
      {
        type: 'email',
        required: true,
        message: 'Incorrect email',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: 'Please input password',
        trigger: 'blur',
      },
      { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
    ],
    department: [
      {
        required: true,
        message: 'Please select deparment',
        trigger: 'change',
      },
    ],
    status: [
      {
        required: true,
        message: 'Please select status',
        trigger: 'blur',
      },
    ],
  });

  // computed
  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      return user.name.includes(searchInput.value);
    });
  });

  // created
  getAllUsers();
  setSelectedKeys(['admin-users']);

  // methods
  const handleAdd = () => {
    dialogFormisible.value = true;
  };

  const onEditUser = (user) => {
    console.log('EditUser', user);
  };

  const onDeleteIconClick = (user) => {
    open.value = true;
    deleteUserName.value = user;
  };

  const handleCancel = () => {
    open.value = false;
    deleteUserName.value = null;
  };

  const handleOk = async () => {
    confirmLoading.value = true;
    try {
      let response = await deleteUser(deleteUserName);
    } catch (e) {
      console.log(e);
    } finally {
      await getAllUsers();
      confirmLoading.value = false;
      open.value = false;
      deleteUserName.value = null;
    }
  };

  const submitForm = async (formEl) => {
    let newUserInfo;
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!', valid);
        newUserInfo = {
          username: ruleForm.username,
          name: ruleForm.name,
          email: ruleForm.email,
          password: ruleForm.password,
          department: ruleForm.department,
          status: ruleForm.status,
        };
        console.log('newUserInfo', newUserInfo);
      } else {
        console.log('error submit!', fields);
      }
    });

    try {
      let response = await createUser(newUserInfo);
    } catch (e) {
      console.log(`Failure creating user: ${e.message}`);
    }
  };

  const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  const uploadImage = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    console.log(image.value);
    if (file) {
      // Lưu đường dẫn của ảnh đã chọn
      image.value = URL.createObjectURL(file);
      imageIsSelected.value = true;
    }
  };
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
