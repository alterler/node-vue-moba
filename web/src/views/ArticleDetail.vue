<template>
  <div v-if="model">
    <!-- title -->
    <div class="d-flex py-2 bd-b">
      <div class="fs-md text-info">&lt;</div>
      <strong class="text-info px-2 fs-xs flex-1">{{model.title}}</strong>
      <div class="text-grey">2020.6.52</div>
    </div>
    <div v-html="model.body" class="px-2 fs-lg"></div>
    <div class="px-3 bd-t py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-1"
          tag="div"
          :to="`/article/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  watch: {
    id() {
      this.fetch();
    }
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
      console.log(res);
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.bd-b {
  border-bottom: 0.0469rem solid #999;
}
.bd-t {
  border-top: 0.0469rem solid #999;
}
</style>