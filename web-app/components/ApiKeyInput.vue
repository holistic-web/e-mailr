<template>
  <div class="ApiKeyInput">
    <b-alert class="ApiKeyInput__alert" show variant="danger">
      Please enter the developer API key for
      <a target="_blank" href="https://developer.riotgames.com/">Riot API</a>.
    </b-alert>
    <div class="ApiKeyInput__input-group">
      <b-form-input v-model="apiKey" placeholder="developer key goes here" />
      <b-btn
        variant="primary"
        :disabled="isUpdateDisabled"
        @click="onUpdateClick"
        v-text="'Update'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data: () => ({
    isSubmitting: false,
    apiKey: '',
  }),
  computed: {
    isUpdateDisabled() {
      return !this.apiKey || this.isSubmitting
    },
  },
  methods: {
    ...mapActions({
      updateApiKey: 'admin/updateApiKey',
    }),
    async onUpdateClick() {
      this.isSubmitting = true
      await this.updateApiKey({ apiKey: this.apiKey })
      this.isSubmitting = false
    },
  },
})
</script>

<style lang="scss">
.ApiKeyInput {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  &__alert {
    width: 100%;
    margin: 0;
  }

  &__input-group {
    display: flex;
    flex-direction: row;
  }
}
</style>
