<template>
  <section class="Home">
    <b-container class="Home__content">
      <h1 class="Home__title">Welcome</h1>

      <section class="Home__menu">

        <b-card
          title="Send a letter"
          img-src="~/assets/letters.jpg"
          img-alt="letters"
          img-top
          img-height="350px"
          class="Home__menuItem">
          <b-card-text>
            Send a letter to one or many recipients. Get your message out there!
          </b-card-text>

          <!--TODO implement the send letter page -->
          <b-button href="#" variant="dark">Start Mailing</b-button>
        </b-card>

        <b-card
          title="Mailing History"
          img-src="~/assets/archive.jpg"
          img-alt="archive"
          img-top
          img-height="350px"
          class="Home__menuItem">
          <b-card-text>
            View your mailing history.
          </b-card-text>

          <!--TODO implement the mailing history page -->
          <b-button href="#" variant="dark" class>Go somewhere</b-button>
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
.Home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  &__title {
    margin-bottom: 1rem;
  }

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
