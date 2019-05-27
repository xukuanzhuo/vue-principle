import { remove } from '../utils/array'

let uid = 0

export default class Dep {
  static target

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  removeSub (sub) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].run()
    }
  }
}

Dep.target = null
const targetStack = []

export function pushTarget (target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
