<template>
  <div class="container-fluid h-[72px] border-[#bcc8d1] border-b">
    <div
      class="row h-full flex items-center justify-center lg:justify-between bg-[#e6f4ff] backdrop-sepia-0"
    >
      <div class="col-2 flex lg:hidden justify-start">
        <!-- <span>x</span> -->
        <MenuOutlined @click="showSettingDrawer" />
      </div>
      <div
        class="col-8 col-lg-9 h-full flex justify-center items-center lg:justify-start"
      >
        <img
          class="h-full p-[16px] sm:p-[10px]"
          src="../../assets/images/vite_logo.svg"
          alt=""
        />
        <h3
          class="hidden lg:block m-0 font-bold text-[24px] antialiased hover:subpixel-antialiased hover:text-yellow-500"
        >
          Vue - Lavarel
        </h3>
      </div>
      <div class="col-lg-3 hidden h-full lg:flex items-center lg:justify-end">
        <img
          class="h-full p-[16px] sm:p-[10px] rounded-full"
          src="../../assets/images/pinia_logo.svg"
          alt="user_pinia"
        />
        <h4 class="m-0 font-bold">Admin</h4>
      </div>
      <div
        class="col-2 flex lg:hidden h-3/5 justify-end"
        @click="showUserInfoDrawer"
      >
        <img
          class="h-full rounded-full"
          src="../../assets/images/pinia_logo.svg"
          alt="user_pinia"
        />
      </div>
    </div>
    <a-drawer
      title="Vue-Lavarel"
      closable
      :placement="leftPlacement"
      :closable="false"
      :open="openSetting"
      @close="onClose"
    >
      <SideBarMenu></SideBarMenu>
    </a-drawer>
    <a-drawer
      title="User info"
      closable
      :placement="rightPlacement"
      :closable="false"
      :open="openUserInfo"
      @close="closeUserInfo"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue';
  import { MenuOutlined, CloseCircleTwoTone } from '@ant-design/icons-vue';
  import SideBarMenu from './SideBarMenu.vue';
  // state
  const openSetting = ref(false);
  const openUserInfo = ref(false);
  const leftPlacement = ref('left');
  const rightPlacement = ref('right');

  // computed
  // const closeIcon = computed(() => {
  //   return () => <CloseCircleTwoTone />;
  // });

  // function
  const showSettingDrawer = () => {
    openSetting.value = true;
  };
  const onClose = () => {
    openSetting.value = false;
  };
  const showUserInfoDrawer = () => {
    openUserInfo.value = true;
  };
  const closeUserInfo = () => {
    openUserInfo.value = false;
  };
</script>
