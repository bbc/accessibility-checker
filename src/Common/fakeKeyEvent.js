import navigation from './Navigation'

export default function makeFakeKeyEvent(node, direction) {
  var parentId = node.parent
  var parent = navigation.nodes[parentId]
  var siblings = parent.children
  var nodeIndex = siblings.indexOf(node.id)

  var event = {
    activeChild: parentId,
    children: siblings,
    id: node.parent,
    leave: {
      id: node.id,
      index: nodeIndex
    },
    orientation: 'horizontal',
    stopPropagation: function() {},

    enter: direction === 'right' ?
    {
      id: siblings[nodeIndex+1],
      index: nodeIndex+1
    }
    :
    {
      id: siblings[nodeIndex-1],
      index: nodeIndex-1
    },
    offset: direction === 'right' ? 1 : -1,
    keyCode: direction === 'right' ? 39 : 37
  }

  navigation.handleKeyEvent(event)
}
