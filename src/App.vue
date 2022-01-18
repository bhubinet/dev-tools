<template>
  <router-link to="/" @click="menu = true">
    <img alt="Vue logo" class="logo" src="./assets/logo_2.png">
  </router-link>
  <router-link to="/" @click="menu = true" v-if="!menu">
    <p>Retour</p>
  </router-link>
  <div id="nav" v-if="menu">
    <router-link to="/ssh-jetbrains" @click="menu = false">
      <h2>SSH for Jetbrains tools</h2>
      <p>Create your ssh configuration file for Jetbrain tools like PHPStorm or Datagrip</p>
    </router-link>
  </div>
  <router-view/>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  components: {},
  data() {
    return {
      menu: false,
    }
  },
  created() {
    setTimeout(() => {
      if(this.$route.path == '/'){
        this.menu = true;
      }
    },100);
  },
  methods: {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo{
  width: 150px;
}

#nav {
  padding: 30px;
  grid-template-columns: 30% 30% 30%;
  display: grid;
  grid-gap: 50px;

  a {
    font-weight: bold;
    color: #2c3e50;
    height: auto;
    padding: 16px;
    border: solid 1px #E3E3E3;
    border-radius: 5px;
    text-decoration: unset;
  }

    &.router-link-exact-active {
      color: #42b983;
    }
}
</style>
