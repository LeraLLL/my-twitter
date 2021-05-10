<template>
  <div class="comment-card">
    <div class="comment-card__avatar">
      <a-tooltip placement="top">
        <template slot="title">
          <span>{{ userName }}</span>
        </template>
        <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">
          {{ userInitials }}
        </a-avatar>
      </a-tooltip>
    </div>

    <div class="comment-card__content content">
      <p class="content__text">
        {{ commentText }}
      </p>
      <p class="content__date">
        {{ commentDate }}
      </p>
    </div>

    <div class="comment-card__actions actions">
      <a-button
        v-if="user.id === userId"
        type="link"
        class="actions__delete-btn"
        shape="circle"
        icon="delete"
        @click="$emit('delete-comment', { commentId, messageId })"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInitialsName } from '@/assets/js/utils'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageId: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['user']),
    userId () {
      return this.data.user?.id
    },
    userName () {
      return this.data.user?.name || ''
    },
    userInitials () {
      return this.userName && this.getInitials(this.userName)
    },
    commentId () {
      return this.data.id
    },
    commentText () {
      return this.data.message || ''
    },
    commentDate () {
      return this.data.date || ''
    }
  },
  methods: {
    getInitials (name) {
      return getInitialsName(name)
    }
  }
}
</script>

<style scoped lang="scss">
.comment-card {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #cacac7;

  &:last-child {
    border-bottom-color: transparent;
  }

  &__avatar {
    width: 10%;
  }

  &__content {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.content {
  position: relative;

  &__date {
    color: #858583;
    font-size: 0.6rem;
    text-align: right;
  }

  p {
    margin-bottom: 5px;
  }
}

.comment-card:hover .actions__delete-btn {
  opacity: 1;
  pointer-events: auto;
}

.actions {
  &__delete-btn {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
