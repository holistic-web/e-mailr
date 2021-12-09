<template>
  <section class="emailr-page">
    <b-container class="emailr-content">
      <h1 class="emailr__title">Write Your Letter</h1>

      <section class="emailr-content-item">
        <div class="write__recipientHeader">
          <h2 class="emailr-subtitle">Recipient</h2>
          <b-button
            variant="outline-dark"
            size="sm"
            class="write__recipientVerify"
            @click="onVerifyRecipientClick"
          >
            Verify
          </b-button>
        </div>

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
              v-model="recipient[field]"
              size="sm"
              :required="true"
            />
          </b-col>
        </b-row>
      </section>

      <section class="emailr-content-item">
        <h2 class="emailr-subtitle">Letter Content</h2>
        <b-form-textarea
          v-model="letterContent"
          class="emailr-content-item"
          :placeholder="placeholderText"
          rows="8"
        />
      </section>

      <b-button :disabled="isSendButtonDisabled" @click="onSendButtonClick">
        Send Mail
      </b-button>
    </b-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { mapActions } from 'vuex'

export default Vue.extend({
  data: () => ({
    // Recipient schema as per https://www.stannp.com/uk/direct-mail-api/letters
    recipient: {
      title: '',
      company: '',
      firstname: '',
      lastname: '',
      address1: '',
      address2: '',
      town: '',
      postcode: '',
      country: '',
    },
    letterContent: '',
  }),
  computed: {
    recipientFields(): Array<string> {
      return Object.keys(this.recipient);
    },
    placeholderText() {
      return `Dear ${this.recipient.firstname},`;
    },
    isSendButtonDisabled() {
      let isDisabled = false;
      this.recipientFields.forEach((field) => {
        // @ts-ignore (due to type error on reading "recipient[field]")
        if (!this.recipient[field]) isDisabled = true;
      });
      if (!this.letterContent) isDisabled = true;
      return isDisabled
    },
  },
  methods: {
    onVerifyRecipientClick() {
      // TODO: implement this
      // check the address is valid against Stannp
      // perhaps can do this (debounced) on input change and remove this button
    },
    async onSendButtonClick() {
      // take the user to the payment flow
      // perhaps make a record of the mail in our database at this point
      try {
        // prod & firebase docs method of calling
        firebase.functions().useEmulator('localhost', 5001);
          const sendNewDocument = firebase
          .functions()
          .httpsCallable('default-sendNewDocument');
        const res = await sendNewDocument({
          textContent: this.letterContent,
          recipient: this.recipient,
        });
        const documentData = {
          textContent: this.letterContent,
          recipient: this.recipient,
          stripeSessionId: res.data.id
        }
        await this.setDocument(documentData)
        console.log('res: ', res);
        window.location.href = res.data.url;
      } catch (err) {
        alert(`Error sending mail: ${err}`); // TODO: replace alerts with something better
        console.error(err); // eslint-disable-line no-console
      }
    },
    ...mapActions({
      setDocument: 'document/addDocument'
    })
  },
});
</script>

<style lang="scss">
@import "../styles/classes";

.write {

  &__recipientHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__recipientVerify {
    height: fit-content;
    padding: 0.5rem;
  }

  &__recipientLabel {
    text-transform: capitalize;
  }

}
</style>
