<template>
  <section class="emailr-page">
    <b-btn
      size="lg"
      :disabled="isSubmitting"
      @click="onLoginClick"
      v-text="'Log In or Sign Up'"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data: () => ({
    isSubmitting: false,
  }),
  methods: {
    ...mapActions({
      signInWithPopup: 'account/signInWithPopup',
    }),
    async onLoginClick() {
      this.isSubmitting = true
      await this.signInWithPopup()
      this.isSubmitting = false
    },
  },
})
</script>

<style lang="scss">
@import '../styles/classes';

</style>
