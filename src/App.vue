<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Convert</router-link>
      <router-link to="/history">Conversion History</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  outline-color: $primary--dark;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
}

body {
  color: $white;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  // background: rgb(74, 105, 188);
  // background: linear-gradient(
  //   45deg,
  //   rgba(74, 105, 188, 1) 0%,
  //   rgba(81, 148, 174, 1) 100%
  // );
  background: $black-mid;
  padding-top: 2rem;
}

#nav {
  background: $black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin: 0 auto 4rem auto;
  box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
  max-width: 260px;
  padding: 2px 0rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}

#nav a {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
  color: $white;
  text-decoration: none;
  padding: 8px 12px;
}

#nav a.router-link-exact-active {
  padding: 8px 12px;
  border-radius: 0.25rem;
  background: #34363a;
}

h1 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
}
</style>
