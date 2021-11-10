<template>
  <section class="emailr-page">
    <b-container class="emailr-content">
      <h1 class="emailr__title">Successful Payment</h1>

      <b-button
        @click="onSendButtonClick"
      >
        Home
      </b-button>
    </b-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase'

export default Vue.extend({
  mounted: function () {
    this.$nextTick(async function () {
      // Code that will run only after the
      // entire view has been rendered
      firebase.functions().useEmulator('localhost', 5001)
        const verifyPaymentAndSend = firebase.functions().httpsCallable('default-verifyPaymentAndSend')
        const res = await verifyPaymentAndSend(
          {
            sessionId: this.letterContent
          }
        )
        console.log('res: ', res);
    })
  },
  methods: {
    onSendButtonClick() {
      try {
        window.location.href = 'http://localhost:3000'
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
      }
    }
  },
});
</script>

