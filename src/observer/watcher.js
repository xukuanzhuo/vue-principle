import Dep, { pushTarget, popTarget } from './dep'

let uid = 0

export default class Watcher {
  constructor (obj, expOrFn, cb, options) {
    this.id = uid++
    this.obj = obj
    this.cb = cb
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.getter = expOrFn
    this.value = this.get()
  }

  get () {
    pushTarget(this)

    let value
    let obj = this.obj
    try {
      value = this.getter.call(obj, obj)
    } catch (e) {
      throw e
    } finally {
      popTarget()
    }

    return value
  }

  addDep (dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  run () {
    const value = this.get()
    if (value !== this.value) {
      const oldValue = this.value
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  }
}
