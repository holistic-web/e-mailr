<template>
  <div class="DefaultLayout">
    <top-bar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import firebase from 'firebase';

export default Vue.extend({
  computed: {
    ...mapGetters({
      isApiKeyValid: 'admin/isApiKeyValid',
    }),
  },
  created() {
    // using this hook to configure firebase emulator, as using nuxt.config.js caused CORS issues.
    // @ts-ignore
    const emulatorPort = process.env.NUXT_ENV_FIREBASE_EMULATOR_PORT;
    if (emulatorPort) firebase.functions().useEmulator('localhost', parseInt(emulatorPort));
  },
})
</script>

<style lang="scss">
html, body, #__nuxt, #__layout, .DefaultLayout {
  height: 100%;
}

.DefaultLayout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
