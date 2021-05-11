<template>
  <a-layout class="wrapper">
    <a-layout-header>
      <div class="container">
        <message-form @submit="addMessage" />
      </div>
      <a-switch v-model="themeModel" @change="onChangeTheme" />
    </a-layout-header>
    <a-layout-content>
      <div class="container">
        <div class="message-block">
          <template v-for="(item,index) in messages">
            <message-card
              :key="index"
              :data="item"
              @delete-message="deleteMessage"
              @delete-comment="deleteComment"
              @add-comment="addComment(item.id, $event)"
            />
          </template>
        </div>
        <div class="actions">
          <template v-for="(message, index) in discussedMessages">
            <discussed-post :key="index" :data="message" />
          </template>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import MessageForm from '@/components/MessageForm'
import MessageCard from '@/components/MessageCard'
import { mapGetters, mapMutations } from 'vuex'
import moment from 'moment'
import { findIndex, find } from 'lodash'
import { textGenerator, idGenerator } from '@/assets/js/utils'
import DiscussedPost from '@/components/DiscussedPost'

export default {
  components: {
    DiscussedPost,
    MessageForm,
    MessageCard
  },
  data () {
    return {
      messages: [],
      discussedMessages: []
    }
  },
  computed: {
    ...mapGetters(['user', 'theme']),
    themeModel: {
      get () {
        return this.theme === 'dark'
      },
      set (val) {
        this.$notification.info({
          message: 'refresh the page to change the theme'
        })
        return val
      }
    }
  },
  watch: {
    messages: {
      handler () {
        this.updateLocalData()
        this.getDiscussedMessages()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      'toggleTheme'
    ]),
    getLocalData () {
      const localData = localStorage.getItem('chatData')
      if (localData) {
        this.messages = JSON.parse(localData)
      }
    },
    updateLocalData () {
      localStorage.setItem('chatData', JSON.stringify(this.messages))
    },
    addMessage (messageData) {
      messageData.user = this.user
      messageData.date = moment().locale('ru').format('lll')
      messageData.comments = []
      messageData.commentCount = 0
      messageData.id = idGenerator()
      this.messages.unshift({ ...messageData })
    },
    deleteMessage ({ messageId }) {
      const index = findIndex(this.messages, { id: messageId })
      if (index !== -1) {
        this.messages.splice(index, 1)
      }
    },
    addComment (messageId, commentData) {
      commentData.user = this.user
      commentData.date = moment().locale('ru').format('lll')
      const message = find(this.messages, { id: messageId })
      const comments = message?.comments
      if (comments) {
        commentData.id = idGenerator()
        comments.push({ ...commentData })
        message.commentCount = comments.length
      }
    },
    deleteComment ({ messageId, commentId }) {
      const message = find(this.messages, { id: messageId })
      const comments = message?.comments
      if (comments) {
        const index = findIndex(comments, { id: commentId })
        if (index !== -1) { comments.splice(index, 1) }
        message.commentCount = comments.length
      }
    },
    commentGenerator (interval) {
      setTimeout(() => {
        if (this.messages.length !== 0) {
          const min = 0
          const max = this.messages.length
          const testUser = {
            name: 'Thomas Price',
            id: idGenerator()
          }
          const messageIndex = Math.floor(Math.random() * (max - min + 1)) + min
          const message = this.messages[messageIndex]
          const comments = message?.comments
          if (comments) {
            const comment = {
              message: textGenerator(),
              user: testUser,
              id: idGenerator(),
              count: comments.length,
              date: moment().locale('ru').format('lll')
            }
            comments.push(comment)
            message.commentCount = comments.length
          }
        }
        this.commentGenerator(Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000)
      }, interval)
    },
    getDiscussedMessages () {
      const len = this.messages.map(item => item.commentCount)
      const max = len.sort((a, b) => b - a).filter(item => item !== 0).slice(0, 3)
      this.discussedMessages = this.messages.filter(item => max.includes(item.commentCount))
    },
    onChangeTheme () {
      this.toggleTheme()
    }
  },
  mounted () {
    this.getLocalData()
    this.commentGenerator(10000)
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: $max-width-content;
  margin: 0 auto;
  height: 100%;
  position: relative;
}

.message-block {
  width: 60%;
}

.actions {
  width: 40%;
  padding-left: 20px;
}
</style>

<style lang="scss">
.ant-layout {
  height: 100vh;
}
.ant-layout-content {
  height: 100%;
  overflow-y: auto;

  .container {
    display: flex;
  }
}
</style>
