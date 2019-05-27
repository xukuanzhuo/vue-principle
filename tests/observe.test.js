import Wacth from '../src/observer/watcher'
import { observe } from '../src/observer'

describe('observer in vue', () => {
  let obj = {
    a: 1,
    b: 2,
    computed: {
      doubleA () {
        return this.a + 1
      }
    }
  }

  observe(obj)

  new Wacth (obj, obj.computed.doubleA)

  test('should be reactive', () => {
    obj.a
  })
})
