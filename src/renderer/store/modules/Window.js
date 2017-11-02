const state = {
  MULLION_WIDTH: 30,
  FRAME_WIDTH: 30,
  target: 'mockRoot',
  window: {
    width: 300,
    height: 200,
    'flex-direction': 'row',
    children: [
      {
        children: [
          {
            height: 30
          },
          {
            children: [
              {},
              {
                width: 100
              },
              {}
            ]
          }
        ]
      },
      {
        width: 30
      }
    ]
  }
}

const mutations = {
  SET_TARGET (state, target) {
    state.target = target
  }
}

const actions = {
  setTarget ({ commit }, val) {
    commit('SET_TARGET', val)
  }
}

const getters = {
  getMullionWidth: state => state.MULLION_WIDTH,
  getFrameWidth: state => state.FRAME_WIDTH,
  getWindow: state => state.window,
  getTarget: state => state.target,
  getTargetDetails: (state) => {
    if (this.target === 'mockRoot') {
      return {
        width: state.window.width,
        height: state.window.height,
        'flex-direction': state.window['flex-direction']
      }
    } else {
      let myTarget = this.target.split('-')
      let myDom = {}
      let result = {}
      myDom.mockRoot = Object.assign({}, state.window)

      for (var i = 0; i < myTarget.length; i++) {
        myDom = myDom[i]
        if (i === 'mockRoot') {
          result.width = state.window.width - (state.FRAME_WIDTH * 2)
          result.height = state.window.height - (state.FRAME_WIDTH * 2)
          // result['flex-direction']: state.window['flex-direction']
        }
      }
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
