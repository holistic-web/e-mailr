import { GetterTree, ActionTree, MutationTree } from 'vuex'
import firebase from 'firebase'
import axios from 'axios'
import config from '../config'
import { User } from '../../firestore/types'

interface AccountState {
  user?: User
  idToken?: string
}

export const state = (): AccountState => {
  return {
    user: undefined,
    idToken: undefined,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLoggedIn: (state: AccountState) => {
    if (!state.user) return false
    return state.user.uid !== null
  },
  user: (state: AccountState): User | undefined => state.user,
  idToken: (state: AccountState): string | undefined => state.idToken,
}

export const actions: ActionTree<RootState, RootState> = {
  async onAuthStateChanged({ commit, dispatch }, { authUser, isRetry }) {
    if (authUser) {
      const idToken = await authUser.getIdToken()
      commit('SET_ID_TOKEN', idToken)
      try {
        await dispatch('fetchUser', { id: authUser.uid })
      } catch (err) {
        // Handle the race condition where user's profile is in the process of being preovisioned
        if (!isRetry) setTimeout(() => dispatch('onAuthStateChanged', { authUser, isRetry: true }), 1500);
      }
      this.$router.push('/')
    } else {
      commit('SET_USER', undefined)
    }
  },

  async signInWithPopup() {
    const provider = new firebase.auth.GoogleAuthProvider()
    await this.$fire.auth.signInWithPopup(provider)
  },

  async logOut() {
    await this.$fire.auth.signOut()
    this.$router.push('/login')
  },

  async fetchUser({ commit }, { id } = {}): Promise<User> {
    const userRef = this.$fire.firestore.collection('users').doc(id)
    const userSnapshot = await userRef.get()
    if (userSnapshot.exists) {
      const userRecord = userSnapshot.data()
      if (!userRecord) throw new Error('User record does not exist')
      const user = {
        email: userRecord.email,
        uid: userRecord.uid,
      }
      commit('SET_USER', { ...user, uid: id })
      return user
    } else {
      throw new Error('User does not exist')
    }
  },

  async updateUser({ dispatch, getters }, { update }): Promise<any> {
    const idToken = getters.idToken
    let result
    try {
      await axios.put(`${config.apiBase}/account/me`, update, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
    } catch (err: any) {
      if (err.message === 'Request failed with status code 403')
        return dispatch('admin/invalidateApiKey', null, { root: true })
      alert(err)
      throw err
    }
    await dispatch('fetchUser', { id: getters.user.uid })
    return result
  },
}

export const mutations: MutationTree<RootState> = {
  SET_USER: (state: AccountState, user: User | undefined) => {
    state.user = user
  },
  SET_ID_TOKEN: (state: AccountState, idToken: string | undefined) => {
    state.idToken = idToken
  },
}
