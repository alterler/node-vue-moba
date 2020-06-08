<template>
  <div v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <!-- logo -->
      <img src="../assets/image/logo.png" alt height="30" />
      <!-- name -->
      <div class="px-3 flex-1">
        <span class="text-white fs-md">王者荣耀</span>
        <span class="text-white fs-sm px-2">攻略站</span>
      </div>
      <!-- button -->
      <router-link tag="div" to="/" class="fs-xs text-white">
        更多英雄
        <span>&gt;</span>
      </router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-xxs">{{cats}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      requierd: true
    }
  },
  data() {
    return {
      model: {},
      cats: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
      console.log(this.model);
      this.cats = this.model.categories.map(v => v.name).join("/");
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
</style>