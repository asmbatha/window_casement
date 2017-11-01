<template>
  <div id='wrapper'>
    <div id='control-pane'>
      <div id='window-size'>
        <!-- <h5>Window size</h5> -->
        {{target}}
        <br/>
        <input type='number' step='10' min='200' value='200' id='window-width' name='window-width' placeholder="width">
        <input type='number' step='10' min='200' value='200' id='window-height' name='window-height' placeholder="height">
      </div>
    </div>
    <main>
      <preview></preview>
      <mock-up></mock-up>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Preview from './Preview'
import MockUp from './MockUp'

export default {
  name: 'landing-page',
  components: {
    Preview,
    MockUp
  },
  computed: {
    ...mapGetters({
      target: 'getTarget'
    })
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
