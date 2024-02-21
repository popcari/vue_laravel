<template>
  <Header></Header>
  <div class="container-fluid mt-3">
    <div class="flex gap-4">
      <div class="hidden lg:block lg:w-3/12">
        <a-list
          bordered
          class="w-full"
        >
          <template #header>
            <div>Controller</div>
          </template>
          <SideBarMenu></SideBarMenu>
        </a-list>
      </div>
      <div class="w-full lg:w-9/12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Header from '../components/shared/Header.vue';
  import SideBarMenu from '../components/shared/SideBarMenu.vue';
</script>
