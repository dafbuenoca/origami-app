<template>
    <div>
        
        <b-navbar toggleable="lg" type="dark" variant="info">
            <router-link to="/" class="navbar-brand">
                <img src="../assets/origami-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                Origami
            </router-link>
            <b-navbar-nav>
                <b-nav-item to="/figure" v-if="auth">Añadir Figura</b-nav-item>
            </b-navbar-nav>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <!-- Using 'button-content' slot -->
                        <div v-if="auth">
                            <b-nav-item-dropdown right>
                                <template slot="button-content">
                                    Bienvenido {{user.displayName}}
                                    <v-avatar>
                                        <img :src="user.photoURL">
                                    </v-avatar>
                                </template>
                                <b-dropdown-item @click='logoutFromFirebase'>Cerrar sesion</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </div>
                        <div v-else>
                            <b-navbar-nav>
                                <b-nav-item to="/login">Login</b-nav-item>
                            </b-navbar-nav>
                        </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState([
        'auth',
        'user'
        ])
    },
    methods:{
        logoutFromFirebase () {
            this.$store.dispatch('signOutAction')
            this.$router.push('/')
        }
    }
}
</script>
<style>

</style>
