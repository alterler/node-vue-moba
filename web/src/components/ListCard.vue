<template>
  <div>
    <m-card :title="title" :icon="icon">
      <!-- nav -->
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{active: index === active}"
          v-for="(item,index) in categroies"
          :key="index"
          @click="slideTo(index)"
        >
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>
      <!-- list -->
      <div class="pt-2">
        <swiper ref="list" @slide-change="slideChange" :options="{autoHeight: true}">
          <swiper-slide v-for="(item,index) in categroies" :key="index">
            <slot name="items" :item="item"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
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
    categroies: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    slideChange() {
      this.active = this.$refs.list.$swiper.activeIndex;
    },
    slideTo(index) {
      this.$refs.list.$swiper.slideTo(index);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>