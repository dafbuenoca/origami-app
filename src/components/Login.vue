<template>
    <div id="login">
        <div class="container is-slim vertical-center">
            <form class="form-signin">
                <div class="text-center mb-4">
                    <img class="mb-4" src="" alt="" width="72" height="72">
                    <h1 class="h3 mb-3 font-weight-normal">Floating labels</h1>
                    <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
                </div>

                <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <label for="inputPassword">Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
            <hr>
            <div class="row">
                <div class="col-md-4">
                    <v-btn block large color=#3b5998 dark v-on:click="connectWithFacebook">
                        <v-icon>fab fa-facebook-f</v-icon>
                    </v-btn>
                </div>
                <div class="col-md-4">
                    <v-btn block large color=#DB4437 dark v-on:click="connectWithGoogle">
                        <v-icon>fab fa-google</v-icon>
                    </v-btn>
                </div>
                <div class="col-md-4">
                    <v-btn block large color=#00acee dark>
                        <v-icon>fab fa-twitter</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

const { auth, app, authGoogle, authFacebook } = require('../firebaseConfig.js')


export default {
    name: "login",
    data() {
        return{}
        },
    methods: {
        connectWithGoogle: function(){
            app.auth().signInWithPopup(authGoogle)
            .then((data) => {
                this.$store.dispatch('signInAction', data.user)
                this.$router.push('/')
            })
            .catch(function (error) {
                console.error('Login google error: ', error)
            })
        },
        connectWithFacebook: function(){
            app.auth().signInWithPopup(authFacebook)
            .then((data) => {
                this.$store.dispatch('signInAction', data.user)
                console.log(data.user);
                this.$router.push('/')
            })
            .catch(function (error) {
                console.error('Login facebook error: ', error)
                var credential = error.credential;
            })
        }
    },
}
</script>
<style>

</style>
