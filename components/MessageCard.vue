<template>
  <div class="message-card">
    <div class="message-card__avatar">
      <a-tooltip placement="top">
        <template slot="title">
          <span>{{ userName }}</span>
        </template>
        <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">
          {{ userInitials }}
        </a-avatar>
      </a-tooltip>
    </div>

    <div class="message-card__content content">
      <p class="content__text">
        {{ messageText }}
      </p>
      <p class="content__date">
        {{ messageDate }}
      </p>
      <div class="content__comments-block comments-block">
        <a-button
          v-if="!isShowAllComments && comments.length > 3"
          type="link"
          shape="circle"
          @click="isShowAllComments = true"
        >
          View all
        </a-button>
        <comment-block
          v-for="(comment, index) in showComments"
          :key="index"
          :message-id="messageId"
          :data="comment"
          @delete-comment="$emit('delete-comment', $event)"
        />

        <div v-if="isShowInputForComment" class="comments-block__input">
          <message-form @submit="$emit('add-comment', $event)" />
        </div>
      </div>
    </div>

    <div class="message-card__actions actions">
      <a-button
        v-if="user.id === userId"
        type="link"
        class="actions__btn"
        shape="circle"
        icon="delete"
        @click="$emit('delete-message', { messageId })"
      />

      <a-button
        type="link"
        class="actions__btn"
        shape="circle"
        icon="message"
        @click="showInputForComment"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInitialsName } from '@/assets/js/utils'
import CommentBlock from '@/components/CommentBlock'
import MessageForm from '@/components/MessageForm'

export default {
  components: {
    CommentBlock,
    MessageForm
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isShowInputForComment: false,
      isShowAllComments: false
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
    messageId () {
      return this.data.id
    },
    messageText () {
      return this.data.message || ''
    },
    messageDate () {
      return this.data.date || ''
    },
    comments () {
      return this.data.comments || []
    },
    showComments () {
      return !this.isShowAllComments
        ? [...this.comments].slice(this.comments.length - 3, this.comments.length)
        : this.comments
    }
  },
  methods: {
    getInitials (name) {
      return getInitialsName(name)
    },
    showInputForComment () {
      this.isShowInputForComment = true
    }
  }
}
</script>

<style scoped lang="scss">
.message-card {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #cacac7;

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
    margin: 5px;
  }
}

.message-card:hover .actions__btn {
  opacity: 1;
  pointer-events: auto;
}

.actions {
  &__btn {
    opacity: 0;
    pointer-events: none;
  }
}

.comments-block {
  &__input {
    margin-top: 10px;
  }
}
</style>
