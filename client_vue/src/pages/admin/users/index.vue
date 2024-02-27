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
      @closed="resetForm()"
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
        <a-form
          ref="formRef"
          :model="ruleForm"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          labelAlign="left"
          style="width: 100%"
        >
          <a-form-item
            ref="username"
            label="Username"
            name="username"
          >
            <a-input v-model:value="ruleForm.username" />
          </a-form-item>
          <a-form-item
            ref="name"
            label="Name"
            name="name"
          >
            <a-input v-model:value="ruleForm.name" />
          </a-form-item>
          <a-form-item
            ref="password"
            label="Password"
            name="password"
          >
            <a-input-password
              validate-status="success"
              v-model:value="ruleForm.password"
            >
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item
            ref="email"
            label="Email"
            name="email"
          >
            <a-input v-model:value="ruleForm.email" />
          </a-form-item>
          <a-form-item
            label="Department"
            name="department_id"
          >
            <a-radio-group v-model:value="ruleForm.department_id">
              <a-radio value="1">Admin</a-radio>
              <a-radio value="2">User</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="Status"
            name="status_id"
          >
            <a-radio-group v-model:value="ruleForm.status_id">
              <a-radio value="1">Active</a-radio>
              <a-radio value="2">Deactive</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button
              style="background-color: #1777ff; color: white"
              @click="submitForm"
              >Create</a-button
            >
            <a-button
              style="margin-left: 10px"
              @click="resetForm"
              >Reset</a-button
            >
          </a-form-item>
        </a-form>
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
  import { ref, computed, reactive, toRaw } from 'vue';
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
  const ruleForm = reactive({
    username: '',
    name: '',
    email: '',
    password: '',
    department_id: [],
    status_id: [],
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
        message: 'Please select department',
        trigger: 'blur',
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

  const labelCol = {
    span: 5,
  };
  const wrapperCol = {
    span: 50,
  };
  const formRef = ref();

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

  const submitForm = async () => {
    formRef.value
      .validate()
      .then(async () => {
        console.log('values', ruleForm, toRaw(ruleForm));
        // call api create user after validation
        try {
          let response = await createUser(ruleForm);
          console.log(response);
        } catch (e) {
          console.log(`Failure creating user: ${e.message}`);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const resetForm = () => {
    formRef.value.resetFields();
  };

  const uploadImage = (e) => {
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
