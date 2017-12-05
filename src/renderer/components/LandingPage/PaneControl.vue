<template>
  <div id="controlPane">
    <div v-if="targetDetails.intW !== undefined">
      <label>
        <output name="result">{{ targetDetails.width }}</output>
        {{ targetDetails.minWidth }}
        <input type="range" :min="targetDetails.intW" :max="targetDetails.maxWidth" :value="targetDetails.width" step="1"> 
        {{ targetDetails.maxWidth }}
      </label>
    </div>
    <div v-if="targetDetails.intH !== undefined">
      <label>
        <output name="result">{{ targetDetails.height }}</output>
        {{ targetDetails.minHeight }}
        <input type="range" :min="targetDetails.intH" :max="targetDetails.maxHeight" :value="targetDetails.height" step="1"> 
        {{ targetDetails.maxHeight }}
      </label>
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