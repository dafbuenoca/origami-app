<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
export default {
  name: "app",
   
  components: {
    Navbar,
  }
};
</script>
<style>
  .container.is-slim {
    max-width: 600px;
    vertical-align: middle;
  }

  .vertical-center {
  position: absolute;
  top: 50%;
  left: calc(50% - 300px);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.container.slim-form {
        max-width: 1000px;
    }
  
</style>
