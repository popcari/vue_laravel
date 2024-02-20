<template>
  <Header></Header>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-sm-2">
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
      <div class="col-sm-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Header from '../components/shared/Header.vue';
  import SideBarMenu from '../components/shared/SideBarMenu.vue';
</script>
