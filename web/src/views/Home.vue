<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/image/swiper1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/swiper1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/swiper1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/swiper1.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3" slot="pagination"></div>
    </swiper>
    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for=" (n,i) in 10" :key="i">
          <i class="sprite sprite-news"></i>
          <div class="pt-2">暴料站</div>
        </div>
      </div>
      <div class="bg-light-1 py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 卡片域 -->

    <!-- 新闻卡片 -->
    <m-list-card title="新闻资讯" icon="Menu" :categroies="newsCats">
      <template #items="{item}">
        <router-link
          :to="`/article/${n._id}`"
          tag="div"
          class="py-2 d-flex"
          v-for="(n,i) in item.newsList"
          :key="i"
        >
          <span class="text-grey">[{{n.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-ellipsis">{{n.title}}</span>
          <span class="fs-sm">{{n.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- 英雄卡片 -->
    <m-list-card title="英雄列表" icon="Menu" :categroies="heroesList">
      <template #items="{item}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            :to="`/heroes/${n._id}`"
            style="width:20%"
            tag="div"
            class="p-2 text-center"
            v-for="(n,i) in item.heroList"
            :key="i"
          >
            <img :src="n.avatar" class="w-100" />
            <div class="fs-sm">{{n.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- <m-list-card title="精彩视频" icon="Menu"></m-list-card>
    <m-list-card title="图文攻略" icon="Menu"></m-list-card>-->
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      newsCats: [],
      heroesList: []
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    async fetchNewsList() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
      console.log(this.newsCats);
    },
    async fetchHeroesList() {
      const res = await this.$http.get("/heroes/list");
      this.heroesList = res.data;
      console.log(this.heroesList);
    }
  },
  created() {
    this.fetchNewsList();
    this.fetchHeroesList();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 0.0769rem solid $border-color;
  border-bottom: 0.0769rem solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 0.0769rem solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
