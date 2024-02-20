<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inline-collapsed="state.collapsed"
    :items="items"
    @select="onSelectItem"
  ></a-menu>
</template>
<script setup>
  import { useMenuStore } from '../../store/menu.js';
  import { useRouter } from 'vue-router';
  import { onMounted, reactive } from 'vue';
  import { storeToRefs } from 'pinia';

  const router = useRouter();
  let store = useMenuStore();
  const { items, selectedKeys, openKeys } = storeToRefs(store);
  const { setSelectedKeys } = store;
  // state
  const state = reactive({
    collapsed: false,
  });

  /**
   * select item event hanlder
   * @param {object} : item key
   */
  const onSelectItem = ({ key }) => {
    let selectedItem = items.value.find((item) => item.key == key);
    router.push({ name: selectedItem.routerName });
  };
</script>
