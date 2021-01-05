<template>
  <div class="page-home">
    <myHeader :title="'研发四所web组习题'" />
    <div class="topic-card">
      <div class="topic-card-box" v-for="(topic, index) in exercises" :key="index" @click="selectTopic(topic)">
        <img class="topic-card-box-img" :src="resolvePath(topic.preview)" />
        <div class="topic-card-box-bottom">
          <span v-text="topic.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header';

export default {
  components: {
    myHeader
  },
  data() {
    return {
      exercises: []
    };
  },
  mounted() {
    this.exercises = require('@exercises/index.json');
    console.log(this.exercises);
  },
  methods: {
    resolvePath(fromPath) {
      return require(`../../public/static/exercises${fromPath}`);
    },
    selectTopic(topic) {
      console.log(topic.routerName);
      this.$router.push(topic.routerName);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/_style.scss';

.page-home {
  width: 100%;
  height: auto;
  padding-top: $headerHeight;
  .topic-card {
    padding: 100px;
    &-box {
      width: 800px;
      height: auto;
      border: 4px solid #e1e7ee;
      border-radius: 50px;
      background-color: #fff;
      box-shadow: 0 0 11px 0 #e1e7ee;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      overflow: hidden;
      &-img {
        width: 90%;
        height: 90%;
        padding: 50px;
      }
      &-bottom {
        width: 100%;
        height: 80px;
        background-color: #f3f3f3;
        border: 1px solid #efefef;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
      }
      &:hover {
        border-color: #f0f;
        cursor: pointer;
      }
    }
  }
}
</style>
