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
        let style = this.frameStyle()

        let childDefault = {}
        childDefault.address = `mockRoot`
        childDefault.style = this.childDefaultStyle(this.getWindow.children, style)

        let root = createElement(
          'div', {
            attrs: {
              id: 'previewRoot'
            },
            'class': {
              row: this.getWindow['flex-direction'] === 'row',
              column: this.getWindow['flex-direction'] === 'column'
            },
            style
          },
          this.renderChildren(createElement, this.getWindow.children, childDefault)
        )
        return [root]
      } else {
        return targetElem.map((node, i) => {
          let style = this.paneStyle(node, defaults)
          if (i) {
            if (defaults.style['flex-direction'] === 'row') {
              style['margin-top'] = `${this.mullion - 2}px`
            } else {
              style['margin-left'] = `${this.mullion - 2}px`
            }
          }

          if (node['children']) {
            let childDefault = {}
            childDefault.address = `${defaults.address}-${i}`
            childDefault.style = this.childDefaultStyle(node['children'], style)
            return createElement('div', {
              'class': {
                previewPane: true,
                row: defaults.style['flex-direction'] === 'row',
                column: defaults.style['flex-direction'] === 'column'
              },
              style
            },
            this.renderChildren(createElement, node['children'], childDefault)
            )
          } else {
            console.log(style)
            return createElement('div', {
              'class': {
                previewPane: true,
                row: defaults.style['flex-direction'] === 'row',
                column: defaults.style['flex-direction'] === 'column'
              },
              style
            })
          }
        })
      }
    },
    frameStyle: function () {
      let childWidth = this.getWindow['width'] - (this.frame * 2)
      let childHeight = this.getWindow['height'] - (this.frame * 2)
      if (this.getWindow['flex-direction'] === 'row') {
        let nodeCount = 0
        // remove mullions
        childWidth -= (this.getWindow.children.length - 1) * 30

        this.getWindow.children.forEach(function (node) {
          if (node.width) childWidth -= parseInt(node.width, 10)
          else nodeCount++
        }, this)
        if (nodeCount) childWidth = childWidth / nodeCount
      }

      if (this.getWindow['flex-direction'] === 'column') {
        let nodeCount = 0
        // remove mullions
        childHeight -= (this.getWindow.children.length - 1) * 30

        this.getWindow.children.forEach(function (node) {
          if (node.height) childHeight -= parseInt(node.height, 10)
          else nodeCount++
        }, this)
        if (nodeCount) childHeight = childHeight / nodeCount
      }

      return {
        'flex-direction': this.getWindow['flex-direction'],
        'width': `${this.getWindow['width'] - (this.frame * 2)}px`,
        'height': `${this.getWindow['height'] - (this.frame * 2)}px`,
        'outline': `${this.frame}px solid #AAA`,
        '--child-width': childWidth + 'px',
        '--child-height': childHeight + 'px'
      }
    },
    paneStyle: function (node, defaults) {
      let childWidth = parseInt(node['width'], 10) ? parseInt(node['width'], 10) : parseInt(defaults.style['--child-width'], 10)
      let childHeight = parseInt(node['height'], 10) ? parseInt(node['height'], 10) : parseInt(defaults.style['--child-height'], 10)
      if (defaults.style['flex-direction'] === 'row') {
        // remove mullions
        if (node.children) {
          let nodeCount = 0

          childWidth -= (node.children.length - 1) * 30

          node.children.forEach(function (child) {
            if (child.width) childWidth -= parseInt(child.width, 10)
            else nodeCount++
          }, this)
          if (nodeCount) childWidth = childWidth / nodeCount
        }
      }

      if (defaults.style['flex-direction'] === 'column') {
        // remove mullions
        if (node.children) {
          let nodeCount = 0

          childHeight -= (node.children.length - 1) * 30

          node.children.forEach(function (child) {
            if (child.height) childHeight -= parseInt(child.height, 10)
            else nodeCount++
          }, this)
          if (nodeCount) childHeight = childHeight / nodeCount
        }
      }

      let style = {
        'flex-direction': defaults.style['flex-direction'],
        width: node['width'] ? node['width'] + 'px' : parseInt(defaults.style['--child-width'], 10) + 'px',
        height: node['height'] ? node['height'] + 'px' : parseInt(defaults.style['--child-height'], 10) + 'px',
        '--child-width': childWidth + 'px',
        '--child-height': childHeight + 'px'
      }

      console.log(style)
      return style
    },
    childDefaultStyle: function (children, obj) {
      let newObj = Object.assign({}, obj)
      newObj['flex-direction'] = obj['flex-direction'] === 'row' ? 'column' : 'row'
      return newObj
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
    background: #AAA;
    box-sizing: content-box
  }
  .previewPane {
    display: flex;
    flex: 1 1 auto;
    box-sizing: content-box
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
