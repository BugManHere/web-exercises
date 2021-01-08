<template>
  <div class="page-sudoku">
    <myHeader class="page-sudoku-header">
      <template v-slot:left>
        <div class="header-button page-sudoku-header-left" v-text="'返回'" @click="goBack" />
      </template>
      <template v-slot:title> 制作一个数独 </template>
      <template v-slot:right>
        <div class="header-button page-sudoku-header-right" :style="{ opacity: viewType ? 0.01 : 1 }" v-text="'开始做题'" @click="changeViewType(1)" />
      </template>
    </myHeader>
    <div class="page-sudoku-content">
      <!-- :style="{ width: `${100 - viewType * 50}%` }" 暂时修改-->
      <mavon-editor
        ref="md"
        class="page-sudoku-content-md"
        :style="{ width: `0%` }"
        v-html="handbook"
        :subfield="false"
        :toolbarsFlag="false"
        :boxShadow="false"
        :ishljs="true"
      />
      <!-- 左边箭头 -->
      <div class="page-sudoku-content-arrow-left" @click="changeViewType(2)" :style="{ left: `${100 - viewType * 50}%` }">
        <img src="../assets/img/arrow.png" v-if="!isPhone && viewType === 1 && !timer" />
      </div>
      <!-- 右边箭头 -->
      <div class="page-sudoku-content-arrow-right" @click="changeViewType(1)" :style="{ left: `${mdWidth}px` }">
        <img src="../assets/img/arrow.png" v-if="viewType === 2 && !timer" />
      </div>
      <!-- :style="{ width: `${viewType * 50}%` } 暂时修改-->
      <div class="page-sudoku-content-solve" :style="{ width: `100%` }">
        <SudokuSolve class="page-sudoku-content-solve-box" />
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header';
import Sudoku from '@exercises/Sudoku/index.md';
import SudokuSolve from '@solve/sudoku.vue';

export default {
  components: {
    myHeader,
    SudokuSolve
  },
  data() {
    return {
      handbook: Sudoku,
      viewType: 0,
      isPhone: false,
      mdWidth: 0,
      timer: null
    };
  },
  mounted() {
    this.isPhone = navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i);
    console.log(this.isPhone);
  },
  watch: {
    viewType() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.mdWidth = this.$refs.md.$el.clientWidth;
        this.timer = null;
      }, 1000);
    }
  },
  methods: {
    goBack() {
      this.$router.push('Home');
    },
    changeViewType(val) {
      if (this.isPhone) {
        this.viewType = 2;
      } else {
        this.viewType = val;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/_style.scss';

.page-sudoku {
  position: relative;
  width: 100%;
  min-height: 100%;
  height: auto;
  padding-top: $headerHeight;
  z-index: 1;
  &-header {
    &-left {
      border: 1px solid #aaa;
      background-color: #bbb;
      &:hover {
        cursor: pointer;
        background-color: #aaa;
      }
    }
    &-right {
      border: 1px solid #2e6da4;
      background-color: #337ab7;
      transition: all 1s;
      &:hover {
        cursor: pointer;
        background-color: #286090;
      }
    }
  }
  &-content {
    position: relative;
    width: auto;
    height: auto;
    display: flex;
    &-md {
      float: left;
      width: 100%;
      z-index: 1 !important;
      border-right: 1px solid #e7e7e7 !important;
      transition: width 1s;
      overflow: hidden;
    }
    &-arrow-left {
      position: fixed;
      width: 60px;
      height: 70px;
      top: 50%;
      left: 50%;
      transform: translateX(-100%);
      z-index: 9999;
      cursor: pointer;
      img {
        height: 100%;
        width: 100%;
      }
    }
    &-arrow-right {
      position: fixed;
      width: 60px;
      height: 70px;
      top: 50%;
      left: 50%;
      transform: rotate(180deg);
      z-index: 9999;
      cursor: pointer;
      img {
        height: 100%;
        width: 100%;
      }
    }
    &-solve {
      position: relative;
      float: right;
      width: 0%;
      transition: width 1s;
      &-box {
      }
    }
  }
}
</style>
