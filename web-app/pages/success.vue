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

export default Vue.extend({
  methods: {
    async onSendButtonClick() {
      try {
        window.location.href = 'http://localhost:3000'
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
      }
    }
  },
});
</script>

