<template>
  <div id="controlPane">
    <div v-if="targetDetails.minWidth !== undefined">
      <label>
        Width: <input type="number" :value="targetDetails.width" disabled/>
      </label>
      <input type="range" :min="targetDetails.minWidth" :max="targetDetails.maxWidth" :value="targetDetails.width" step="1"> 
    </div>
    <div v-if="targetDetails.minHeight !== undefined">
      <label>
        Height: <input type="number" :value="targetDetails.height" disabled/>
      </label>
      <input type="range" :min="targetDetails.minHeight" :max="targetDetails.maxHeight" :value="targetDetails.height" step="1"> 
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        name: 'pane-control'
      }
    },
    computed: {
      ...mapGetters({
        target: 'getTarget',
        targetDetails: 'getTargetDetails'
      }),
      myDetails: function () {
        console.log(this.targetDetails)
        return this.target
      }
    }
  }
</script>

<style scoped>
#controlPane > div {
  padding: 10px 0;
}
#controlPane > div > label {
  text-align: right;
  padding-bottom: 4px;
}
#controlPane > div > label input{
  margin-left: 10px;
}
#controlPane > div > input {
  width: 100%;
}
label {
  display: block;
}
</style>