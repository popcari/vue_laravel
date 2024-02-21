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
    :data-source="users"
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
    </template>
  </a-table>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { UserAddOutlined } from '@ant-design/icons-vue';
  import { useMenuStore } from '../../../store/menu';
  import { useUsersStore } from '../../../store/users';

  // store state
  let { setSelectedKeys } = useMenuStore();
  let { users, header } = storeToRefs(useUsersStore());
  let { getAllUsers } = useUsersStore();

  // internal state
  let value = ref('');

  // created
  getAllUsers();
  setSelectedKeys(['admin-users']);

  // methods
  const handleAdd = () => {
    console.log('Add');
  };

  // watch
</script>
