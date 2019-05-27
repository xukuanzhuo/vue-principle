export function def (value, key, val) {
  Object.defineProperty(value, key, {
    value: val,
    enumerable: true,
    writable: true,
    configurable: true
  })
}
