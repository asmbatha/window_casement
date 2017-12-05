<template>
  <div id='wrapper'>
    <div id='control-pane'>
      <div id='window-size'>
        <mock-up></mock-up>
        <pane-control></pane-control>
      </div>
    </div>
    <main>
      <preview></preview>
    </main>
  </div>
</template>

<script>
import Preview from './Preview'
import MockUp from './MockUp'
import PaneControl from './LandingPage/PaneControl'

export default {
  name: 'landing-page',
  components: {
    Preview,
    MockUp,
    PaneControl
  },
  created () {
    this.$store.dispatch('updateDefaults')
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  background: #1e1e1e;
  color: #fff;
}

#wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
}

#control-pane {
  min-width: 100px;
  background: #252526;
  color: #CCC;
}

#control-pane h5 {
  font-weight: normal;
}

main {
  flex: 1 1 auto;
}

#window-size {
  padding: 20px;
}

#window-size input {
  width: 80px;
}
</style>
