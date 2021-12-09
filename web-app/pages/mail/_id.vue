<template>
  <section class="emailr-page">
    <b-container v-if="!isLoading" class="emailr-content">
      <h1 class="emailr__title">Letter ~ Status: <b>{{ document.status }}</b></h1>

      <section class="emailr-content-item">
        <b-row
          v-for="(field, i) in recipientFields"
          :key="i"
          class="emailr-content-item"
        >
          <b-col sm="3">
            <label
              class="write__recipientLabel"
              :for="`write__recipientField-${field}`"
              v-text="field"
            />
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`write__recipientField-${field}`"
              v-model="document.recipient[field]"
              size="sm"
              :required="true"
              disabled
            />
          </b-col>
        </b-row>
      </section>

      <section class="emailr-content-item">
        <h2 class="emailr-subtitle">Letter Content</h2>
        <b-form-textarea
          v-model="document.textContent"
          class="emailr-content-item"
          rows="8"
          disabled
        />
      </section>
    </b-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { DocumentStatus } from '../../../firestore/types';
import stannpRecipient from '../../lib/stannpRecipient';


export default Vue.extend({
  data: () => ({
    isLoading: false,
    recipient: stannpRecipient,
  }),
  computed: {
    ...mapGetters({
      document: 'document/document',
    }),
    recipientFields(): Array<string> {
      return Object.keys(this.recipient);
    },
  },
  async created() {
    this.isLoading = true;
    await this.fetchDocument({ id: this.$route.params.id });
    if (this.document.status === DocumentStatus.DRAFT && this.document.stripeSessionId) {
      await this.verifyPaymentAndSend(this.document._id);
      await this.fetchDocument({ id: this.$route.params.id });
    }
    this.isLoading = false;
  },
  methods: {
    ...mapActions({
      fetchDocument: 'document/fetchDocument',
      verifyPaymentAndSend: 'document/verifyPaymentAndSend',
    }),
  },
});
</script>

