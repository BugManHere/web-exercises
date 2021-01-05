<template>
  <div class="page-my-header">
    <!-- 左边插槽 -->
    <div class="page-my-header-left">
      <slot name="left" />
    </div>
    <!-- 标题栏 -->
    <div class="page-my-header-title">
      <slot name="title">
        <span v-text="title" />
      </slot>
    </div>
    <!-- 右边插槽 -->
    <div class="page-my-header-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
.page-my-header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #e7e7e7;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 48px;
  .header-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f4f4f4;
    font-size: 40px;
    height: 66px;
    width: 220px;
    margin: 0 20px;
    border-radius: 20px;
  }
}
</style>
