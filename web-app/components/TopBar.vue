<template>
  <b-navbar class="TopBar" variant="dark">
    <b-navbar-brand class="TopBar__brand">
      <nuxt-link to="/">e-mailr</nuxt-link>
    </b-navbar-brand>

    <b-nav>
      <b-nav-item-dropdown
        v-if="isLoggedIn"
        class="TopBar__nav"
        text="Account"
        right
      >
        <b-dropdown-item @click="onSignOutClick">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({
      isLoggedIn: 'account/isLoggedIn',
    }),
  },
  methods: {
    ...mapActions({
      logOut: 'account/logOut',
    }),
    onSignOutClick() {
      this.logOut()
    },
  },
})
</script>

<style lang="scss">
$textColor: white;

.TopBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__brand a {
    color: $textColor !important;
    text-decoration: none !important;
  }

  &__nav {
    a {
      color: $textColor !important;
    }
  }

  .dropdown-item,
  .dropdown-item a {
    color: black !important;

    &:active {
      color: $textColor !important;
    }
  }
}
</style>
