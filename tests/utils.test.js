import { remove } from '../src/utils/array'

test('should remove array item', () => {
  let arr = [1,2,3]
  remove(arr, 1)
  expect(arr.length).toBe(2)
  expect(arr).toStrictEqual([2,3])
})
