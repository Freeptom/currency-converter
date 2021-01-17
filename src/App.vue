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
#app {
  min-height: 100vh;
  background: $black-mid;
  padding: 2rem 0;
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
  margin-bottom: 1rem;
}
</style>
