<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <!-- logo -->
      <img src="../assets/image/logo.png" alt height="30" />
      <!-- name -->
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-dark-1 fs-xxs text-grey-1">团队成就更多</div>
      </div>
      <!-- button -->
      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse jc-around pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<style lang='scss'>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
