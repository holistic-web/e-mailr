import { GetterTree, ActionTree, MutationTree } from 'vuex'
import axios from 'axios'
import config from '../config'

interface AdminState {
  isApiKeyValid: boolean
}

export const state = () => {
  return <AdminState>{
    isApiKeyValid: true,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isApiKeyValid: (state: AdminState): boolean => state.isApiKeyValid,
}

export const actions: ActionTree<RootState, RootState> = {
  async updateApiKey({ commit, rootGetters }, { apiKey }) {
    const idToken = rootGetters['account/idToken']
    try {
      await axios.put(
        `${config.apiBase}/admin/riot-api-key`,
        { apiKey },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
      commit('SET_IS_API_KEY_VALID', true)
    } catch (err) {
      console.error(err) // eslint-disable-line no-console
    }
  },
  invalidateApiKey({ commit }) {
    commit('SET_IS_API_KEY_VALID', false)
  },
}

export const mutations: MutationTree<RootState> = {
  SET_IS_API_KEY_VALID: (state: AdminState, isApiKeyValid: boolean) => {
    state.isApiKeyValid = isApiKeyValid
  },
}
