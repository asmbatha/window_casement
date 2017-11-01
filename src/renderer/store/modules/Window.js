const state = {
  MULLION_WIDTH: 30,
  FRAME_WIDTH: 30,
  target: 'mockRoot',
  window: {
    width: 200,
    height: 200,
    'flex-direction': 'row',
    children: [
      {
        children: [
          {},
          {
            children: [
              {},
              {}
            ]
          }
        ]
      },
      {}
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
  getWindow: state => state.window,
  getTarget: state => state.target,
  getMullionWidth: state => state.MULLION_WIDTH,
  getFrameWidth: state => state.FRAME_WIDTH
}

export default {
  state,
  mutations,
  actions,
  getters
}
