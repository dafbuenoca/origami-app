import Vue from 'vue';
import Vuex from 'vuex';
import {app} from '../firebaseConfig';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        auth: false,
        figures: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        removeUser(state) {
            state.user = null
        },
        setAuth(state) {
            state.auth = true;
        },
        removeAuth(state) {
            state.auth = false;
        }
    },
    actions:{
        signInAction({ commit }, user) {
            commit('setUser', user);
            commit('setAuth');
            //guardar cookie con un token
        },
        autoSignIn({ commit }, user) {
            commit('setUser', user);
            commit('setAuth');
        },
        signOutAction({ commit }) {
            app.auth().signOut()
                .then(() => {
                    commit('setUser', null)
                    commit('removeAuth')
                    //eliminar cookie  token
                }
            )
        }
    },
    getters:{
        auth(state) {
            return state.auth
        },

        user(state) {
            return state.user
        },
    },

})