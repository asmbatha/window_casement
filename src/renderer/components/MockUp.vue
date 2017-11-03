<script>
import { mapGetters } from 'vuex'

export default {
  name: 'mock-up',
  data: function () {
    return {
      active: false,
      mockRootEvents: {
        click: this.setTarget
        // mouseover: this.hoverHandler
      },
      mockPaneEvents: {
        click: this.setTarget,
        mouseover: this.mouseOver,
        mouseleave: this.mouseLeave
      }
    }
  },
  methods: {
    renderChildren: function () {
      let [createElement, targetElem, defaults] = arguments
      if (!targetElem) {
        let root = createElement('div', {
          attrs: {
            id: 'mockRoot'
          },
          on: this.mockRootEvents,
          'class': {
            hover: this.active,
            row: this.getWindow['flex-direction'] === 'row',
            column: this.getWindow['flex-direction'] === 'column',
            selected: this.target === 'mockRoot'
          },
          style: {
            'flex-direction': this.getWindow['flex-direction']
          }
        },
        this.renderChildren(createElement, this.getWindow.children, {
          address: 'mockRoot',
          'flex-direction': this.getWindow['flex-direction'] === 'row' ? 'column' : 'row'
        })
        )
        return [root]
      } else {
        return targetElem.map((node, i) => {
          if (node['children']) {
            return createElement('div', {
              'class': {
                mockPane: true,
                row: defaults['flex-direction'] === 'row',
                column: defaults['flex-direction'] === 'column',
                selected: this.target === `${defaults.address}-${i}`
              },
              style: {
                'flex-direction': defaults['flex-direction']
              },
              attrs: {
                id: `${defaults.address}-${i}`
              }
            },
            this.renderChildren(createElement, node['children'], {
              address: `${defaults.address}-${i}`,
              'flex-direction': defaults['flex-direction'] === 'row' ? 'column' : 'row'
            })
            )
          } else {
            return createElement('div', {
              'class': {
                mockPane: true,
                selected: this.target === `${defaults.address}-${i}`
              },
              style: {
                'flex-direction': defaults['flex-direction']
              },
              attrs: {
                id: `${defaults.address}-${i}`
              },
              on: this.mockPaneEvents
            })
          }
        })
      }
    },
    setTarget: function (e, f) {
      e.stopPropagation()
      let target = e.target.id
      if (e.target.hasChildNodes() && target !== 'mockRoot') target = 'mockRoot'
      this.$store.dispatch('setTarget', target)
    },
    mouseOver: function (e) {
      this.active = true
    },
    mouseLeave: function (e) {
      this.active = false
    }
  },
  render: function (createElement) {
    return createElement('div', {
      attrs: {
        id: 'mockUp'
      }
    },
    this.renderChildren(createElement)
    )
  },
  computed: {
    ...mapGetters({
      getWindow: 'getWindow',
      target: 'getTarget'
    })
  }
}
</script>

<style>
  #mockUp {
    border-bottom: 1px solid #414141;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
  #mockRoot {
    border: 1px dashed #AAA;
    display: flex;
    padding: 10px;
    background: #1e1e1e;
  }
  .mockPane {
    display: flex;
    flex: 1 1 auto;
    min-width: 30px;
    min-height: 30px;
  }
  .mockPane:empty{
    border: 1px dashed #AAA;
    background: #1e1e1e;
  }

  #mockRoot.selected, .mockPane.selected {
    border-color: #FFF;
  }

  #mockRoot:hover:not(.hover), .mockPane:empty:hover {
    background: #2a2a2a;
  }

  .column > .mockPane ~ .mockPane {
    margin-top: 10px
  }
  .row > .mockPane ~ .mockPane {
    margin-left: 10px
  }
</style>
