import Lrud from 'lrud'
import { throttle } from 'lodash'

const navigation = new Lrud()

navigation.on('focus', (node) => {
  const nodeID = navigation.nodes[node.id]
  nodeID.onFocus && nodeID.onFocus(nodeID)
})

document.onkeydown = throttle((event) => {
  if (Lrud.KEY_CODES[event.keyCode]) {
    navigation.handleKeyEvent(event)
    event.preventDefault()
  }
}, 210)

export default navigation
