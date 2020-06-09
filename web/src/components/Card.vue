<template>
  <div>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex py-2">
        <i class="iconfont icon-Menu"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont" v-if="!plain" :class="`icon-${icon}`"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    plain: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.card {
  .card-header {
    border-bottom: 0.0769rem solid $border-color;
  }
  border-bottom: 0.0769rem solid $border-color;
}
</style>