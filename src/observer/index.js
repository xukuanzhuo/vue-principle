import { def } from '../utils/object'
import Dep from './dep'

export default class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()

    def(value, '__ob__', this)
    this.walk(value)
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function defineReactive (obj, key, val) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  const getter = property && property.get
  const setter = property && property.set

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val

      if (Dep.target) {
        dep.depend()
      }

      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val

      if (value === newVal) {
        return
      }

      dep.notify()
    }
  })
}

export function observe (value) {
  let ob
  ob = new Observer(value)
  return ob
}