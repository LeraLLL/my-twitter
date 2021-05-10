<template>
  <div class="message-form">
    <a-form :form="form" layout="inline" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
      <a-form-item class="input-block">
        <a-input
          v-decorator="[
            'message',
            { rules: [{ required: true, message: 'Please enter your message!' }] },
          ]"
          placeholder="Enter message"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" shape="circle" icon="right" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', values)
          this.form.resetFields()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.message-form {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .input-block {
      flex-grow: 1;

      &.ant-form-item-with-help {
        margin-bottom: 0;
      }
    }
  }

  .ant-form-explain {
    position: absolute;
    height: 10px;
    min-height: 10px;
    line-height: 1;
    font-size: 10px;
  }
}
</style>
