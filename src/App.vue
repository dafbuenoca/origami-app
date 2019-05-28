<template>
  <div id="app">
    <Origami/>
  </div>
</template>

<script>
import Vue from 'vue';
import Origami from  './components/Origami'


export default {
  name: "app",
  components: {
    Origami
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
