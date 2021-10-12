<template>
  <div class="DefaultLayout">
    <api-key-input v-if="!isApiKeyValid" />
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
