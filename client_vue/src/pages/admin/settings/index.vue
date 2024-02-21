<template>
  <button
    class="px-4 py-2 rounded bg-green-600 flex text-center justify-center items-center text-[#f9f9f9]"
  >
    setting template
  </button>
</template>

<script setup>
  import { useMenuStore } from '../../../store/menu';

  let { setSelectedKeys } = useMenuStore();

  setSelectedKeys(['admin-settings']);
</script>
