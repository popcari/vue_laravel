<template>
  <Header></Header>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-2">Sidebar</div>
      <div class="col-sm-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Header from '../components/shared/Header.vue';
</script>
