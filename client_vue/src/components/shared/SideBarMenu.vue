<template>
  <a-menu
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    mode="inline"
    :inline-collapsed="state.collapsed"
    :items="items"
    @select="onSelectItem"
  ></a-menu>
</template>
<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, h } from 'vue';
  import {
    UserOutlined,
    SettingOutlined,
    SolutionOutlined,
  } from '@ant-design/icons-vue';

  const router = useRouter();

  const state = reactive({
    collapsed: false,
    selectedKeys: ['1'],
  });
  const items = reactive([
    {
      key: '1',
      icon: () => h(UserOutlined),
      label: 'Users',
      title: 'Users',
      routerName: 'admin-users',
    },
    {
      key: '2',
      icon: () => h(SettingOutlined),
      label: 'Settings',
      title: 'Settings',
      routerName: 'admin-settings',
    },
    {
      key: '3',
      icon: () => h(SolutionOutlined),
      label: 'Roles',
      title: 'Roles',
      routerName: 'admin-roles',
    },
  ]);

  /**
   * select item event hanlder
   * @param {object} : item key
   */
  const onSelectItem = ({ key }) => {
    let selectedItem = items.find((item) => item.key === key);
    router.push({ name: selectedItem.routerName });
  };
</script>
