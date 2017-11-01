<script>
import { mapGetters } from 'vuex'

export default {
  name: 'preview',
  data: function () {
    return {}
  },
  methods: {
    renderChildren: function () {
      let [createElement, targetElem, defaults] = arguments
      if (!targetElem) {
        let style = {
          'flex-direction': this.getWindow['flex-direction'],
          'width': (this.getWindow['width'] - (this.frame * 2) + 2) + 'px',
          'height': (this.getWindow['height'] - (this.frame * 2) + 2) + 'px',
          'outline': `${this.frame}px solid #AAA`
        }

        let root = createElement('div', {
          attrs: {
            id: 'previewRoot'
          },
          'class': {
            row: this.getWindow['flex-direction'] === 'row',
            column: this.getWindow['flex-direction'] === 'column'
          },
          style
        },
        this.renderChildren(createElement, this.getWindow.children, {
          address: 'mockRoot',
          'flex-direction': this.getWindow['flex-direction'] === 'row' ? 'column' : 'row'
        })
        )
        return [root]
      } else {
        return targetElem.map((node, i) => {
          let style = {
            'flex-direction': defaults['flex-direction']
          }
          if (node['width']) style.width = node['width']
          if (node['height']) style.height = node['height']
          if (i) {
            if (defaults['flex-direction'] === 'row') {
              style['margin-top'] = this.mullion + 'px'
            } else {
              style['margin-left'] = this.mullion + 'px'
            }
          }

          if (node['children']) {
            return createElement('div', {
              'class': {
                previewPane: true,
                row: defaults['flex-direction'] === 'row',
                column: defaults['flex-direction'] === 'column'
              },
              style
            },
            this.renderChildren(createElement, node['children'], {
              address: `${defaults.address}-${i}`,
              'flex-direction': defaults['flex-direction'] === 'row' ? 'column' : 'row'
            })
            )
          } else {
            return createElement('div', {
              'class': {
                previewPane: true,
                row: defaults['flex-direction'] === 'row',
                column: defaults['flex-direction'] === 'column'
              },
              style
            })
          }
        })
      }
    },
    procStyles: function (obj) {
    }
  },
  render: function (createElement) {
    return createElement('div', {
      attrs: {
        id: 'preview'
      }
    },
    this.renderChildren(createElement)
    )
  },
  computed: {
    ...mapGetters({
      getWindow: 'getWindow',
      target: 'getTarget',
      mullion: 'getMullionWidth',
      frame: 'getFrameWidth'
    })
  }
}
</script>

<style>
  #preview {
    padding: 50px;
  }

  #previewRoot {
    border: 1px solid #777;
    display: flex;
    background: #AAA
  }
  .previewPane {
    display: flex;
    flex: 1 1 auto;
  }
  .previewPane:empty {
    background: #FFF
  }
  .previewPane.column {
    border-left: 1px solid #777;
    border-right: 1px solid #777;
  }
  .previewPane.column:first-child {
    border-left: none
  }
  .previewPane.column:last-child {
    border-right: none
  }
  .previewPane.row {
    border-top: 1px solid #777;
    border-bottom: 1px solid #777;
  }
  .previewPane.row:first-child {
    border-top: none
  }
  .previewPane.row:last-child {
    border-bottom: none
  }
</style>
