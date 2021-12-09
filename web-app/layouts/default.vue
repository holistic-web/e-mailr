<template>
  <div class="DefaultLayout">
    <top-bar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({
      isApiKeyValid: 'admin/isApiKeyValid',
    }),
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
