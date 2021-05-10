<template>
  <div class="disc-message">
    <div class="disc-message__count">
      <span>{{ data.commentCount }}</span>
    </div>
    <div class="disc-message__content">
      <p>{{ cutText(data.message, 60) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    cutText (text, count) {
      return text.slice(0, count) + '...'
    }
  }
}
</script>

<style scoped lang="scss">
.disc-message {
  display: flex;
  padding: 15px 0;

  &__count {
    margin-right: 15px;

    span {
      border: 1px solid #1890ff;
      color: #1890ff;
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
