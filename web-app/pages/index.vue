<template>
  <section class="emailr-page">
    <b-container class="emailr-content">
      <h1 class="emailr-title">Welcome</h1>

      <section class="Home__menu">
        <b-card
          title="Send a letter"
          img-src="~/assets/letters.jpg"
          img-alt="letters"
          img-top
          img-height="350px"
          class="Home__menuItem"
        >
          <b-card-text>
            Send a letter to one or many recipients. Get your message out there!
          </b-card-text>

          <b-button href="/write" variant="dark">Start Mailing</b-button>
        </b-card>

        <b-card
          title="Mailing History"
          img-src="~/assets/archive.jpg"
          img-alt="archive"
          img-top
          img-height="350px"
          class="Home__menuItem"
        >
          <b-card-text>
            View your mailing history.
          </b-card-text>

          <!--TODO implement the mailing history page -->
          <b-button href="#" variant="dark" class>View History</b-button>
        </b-card>
      </section>
    </b-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
@import '../styles/classes';

.Home {

  &__menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &Item {
      width: 45%;

      .card-body {
        position: relative;
        display: flex;
        flex-direction: column;

        .btn {
          margin-top: auto;
        }
      }
    }


  }
}
</style>
