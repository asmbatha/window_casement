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
    if (state.target === 'mockRoot') {
      return {
        width: state.window.width,
        height: state.window.height,
        'flex-direction': state.window['flex-direction']
      }
    } else {
      let myTarget = state.target.split('-')
      let myDom = {children: {}}
      let myTargetDom = {children: {}}
      let result = {}
      myDom.children.mockRoot = Object.assign({}, state.window)

      for (var i = 0; i < myTarget.length; i++) {
        myTargetDom = myTargetDom['children'][myTarget[i]] || myDom['children'][myTarget[i]]

        if (myTargetDom['flex-direction']) result['flex-direction'] = myTargetDom['flex-direction']
        else result['flex-direction'] = result['flex-direction'] === 'row' ? 'column' : 'row'

        let secondLast = (i + 2) === myTarget.length
        let thirdLast = (i + 3) === myTarget.length
        let row = result['flex-direction'] === 'row'
        let column = result['flex-direction'] === 'column'

        result.width = myTargetDom.width || result.defaultWidth
        result.height = myTargetDom.height || result.defaultHeight

        result.defaultWidth = result.width
        result.defaultHeight = result.height

        if (myTarget[i] === 'mockRoot') {
          result.width -= (state.FRAME_WIDTH * 2)
          result.height -= (state.FRAME_WIDTH * 2)
          result.maxWidth = result.width
          result.minWidth = result.width
          result.minHeight = result.height
          result.maxHeight = result.height
        }

        if (row) {
          if (myTargetDom.children) {
            let nodeCount = 0
            if (myTargetDom.children.length > 1) result.defaultWidth -= (myTargetDom.children.length - 1) * state.MULLION_WIDTH

            myTargetDom.children.forEach(function (child) {
              if (child.width) result.defaultWidth -= child.width
              else nodeCount++
            }, this)

            if (nodeCount) result.defaultWidth = result.defaultWidth / nodeCount

            // set max and min width
            if (secondLast) {
              result.maxWidth = result.width
              if (myTargetDom.children.length > 1) result.maxWidth -= (myTargetDom.children.length - 1) * state.MULLION_WIDTH

              let flexSiblings = myTargetDom.children.length - 1

              myTargetDom.children.forEach(function (child, index) {
                if (index !== myTarget[i + 1] && child.width) {
                  result.maxWidth -= child.width
                  flexSiblings--
                }
              }, this)

              result.minWidth = flexSiblings ? 0 : result.maxWidth
            }

            if (thirdLast) {
              result.maxHeight = result.height
              if (myTargetDom.children.length > 1) result.maxHeight -= (myTargetDom.children.length - 1) * state.MULLION_WIDTH

              let flexSiblings = myTargetDom.children.length - 1

              myTargetDom.children.forEach(function (child, index) {
                if (index !== myTarget[i + 1] && child.height) {
                  result.maxHeight -= child.height
                  flexSiblings--
                }
              }, this)

              result.minWidth = flexSiblings ? 0 : result.maxHeight
            }
          }
        }

        if (column) {
          // remove mullions
          if (myTargetDom.children) {
            let nodeCount = 0
            if (myTargetDom.children.length) result.defaultHeight -= (myTargetDom.children.length - 1) * state.MULLION_WIDTH

            myTargetDom.children.forEach(function (child) {
              if (child.height) result.defaultHeight -= child.height
              else nodeCount++
            }, this)
            if (nodeCount) result.defaultHeight = result.defaultHeight / nodeCount

            // set max and min width
            if (secondLast) {
              result.maxWidth = result.width
              if (myTargetDom.children.length > 1) result.maxWidth -= (myTargetDom.children.length - 1) * state.MULLION_WIDTH

              let flexSiblings = myTargetDom.children.length - 1

              myTargetDom.children.forEach(function (child, index) {
                if (index !== myTarget[i + 1] && child.width) {
                  result.maxWidth -= child.width
                  flexSiblings--
                }
              }, this)

              result.minWidth = flexSiblings ? 0 : result.maxWidth
            }

            if (thirdLast) {
              result.maxHeight = result.height
              if (myTargetDom.children.length > 1) result.maxHeight -= (myTargetDom.children.length - 1) * state.MULLION_WIDTH

              let flexSiblings = myTargetDom.children.length - 1

              myTargetDom.children.forEach(function (child, index) {
                if (index !== myTarget[i + 1] && child.height) {
                  result.maxHeight -= child.height
                  flexSiblings--
                }
              }, this)

              result.minWidth = flexSiblings ? 0 : result.maxHeight
            }
          }
        }
      }

      return result
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
