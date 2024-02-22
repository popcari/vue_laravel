<template>
  <div class="flex justify-between mb-2">
    <a-button
      size="large"
      class="flex items-center"
      @click="handleAdd"
    >
      <template #icon> <UserAddOutlined /> </template>
      Add
    </a-button>
    <a-input
      v-model:value="value"
      placeholder="Search"
      size="large"
      class="w-4/12"
    />
  </div>
  <a-table
    :columns="header"
    :data-source="filteredUsers"
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
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import {
    UserAddOutlined,
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue';
  import { useMenuStore } from '../../../store/menu';
  import { useUsersStore } from '../../../store/users';

  // store state
  let { setSelectedKeys } = useMenuStore();
  let { users, header } = storeToRefs(useUsersStore());
  let { getAllUsers, deleteUser } = useUsersStore();

  // internal state
  let value = ref('');
  let open = ref(false);
  let confirmLoading = ref(false);
  let deleteUserName = ref(null);

  // computed
  const filteredUsers = computed(() => {
    return users.value.filter((user) => {
      return user.name.toLowerCase().includes(value.value.toLowerCase());
    });
  });

  // created
  getAllUsers();
  setSelectedKeys(['admin-users']);

  // methods
  const handleAdd = () => {
    console.log('Add');
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
</script>
