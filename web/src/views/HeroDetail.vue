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
    <!-- top -->
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
    <div>
      <!-- 切换栏 -->
      <div class="bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 mx-3 bb">
          <div class="nav-item active">英雄初识</div>
          <div class="nav-item">进阶攻略</div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div class="bg-white">
            <div class="d-flex jc-around px-3 py-2">
              <router-link tag="a" to="/">
                <i class="iconfont icon-Menu fs-sm" style="border:none;"></i>
                英雄介绍视频
              </router-link>
              <router-link tag="a" to="/">
                <i class="iconfont icon-Menu fs-sm" style="border:none;"></i>
                英雄识别视频
              </router-link>
            </div>
          </div>
          <div class="skills bg-white mt-4">
            <div class="d-flex jc-around">
              <div v-for="(item, i) in model.skills" :key="item.name">
                <img
                  class="icon pt-4"
                  @click="currentSkillIndex = i"
                  :class="{active: currentSkillIndex === i}"
                  :src="item.icon"
                />
                <p>{{item.name}}</p>
              </div>
            </div>

            <!-- <div v-if="currentSkill">
              <div class="d-flex pt-4 pb-3">
                <h3 class="m-0">{{currentSkill.name}}</h3>
                <span class="text-grey-1 ml-4">
                  (冷却值: {{currentSkill.delay}}
                  消耗: {{currentSkill.cost}})
                </span>
              </div>
              <p>{{currentSkill.description}}</p>
              <div class="border-bottom"></div>
              <p class="text-grey-1">小提示: {{currentSkill.tips}}</p>
            </div>-->
            <m-card plain icon="Menu" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="Menu" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="Menu" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="Menu" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>
            <m-card plain icon="menu1" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt height="50" />
                <p class="flex-1 m-0 ml-3">{{item.description}}</p>
              </div>
              <div class="bb mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
      <!-- 卡片栏 -->
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
      cats: "",
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
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
.icon {
  width: 5rem;
}
</style>