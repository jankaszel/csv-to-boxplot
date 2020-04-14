const test = require('tape')
const process = require('./')

test('process', function (t) {
  const actual = [
    [25, 28, 29, 29, 30, 34, 35, 35, 37, 38],
    [50, 50, 55, 58, 63, 66, 66, 67, 67, 68, 69, 70, 70, 70, 70, 72, 73, 75, 75, 76, 76, 78, 79, 81],
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5]
  ]
  const expected = [
    { index: 0, median: 32, box_bottom: 29, box_top: 35, whisker_bottom: 25, whisker_top: 38 },
    { index: 1, median: 70, box_bottom: 66, box_top: 75, whisker_bottom: 50, whisker_top: 81 },
    { index: 2, median: 3, box_bottom: 2, box_top: 4, whisker_bottom: 1, whisker_top: 5 },
    { index: 3, median: 3.5, box_bottom: 2.75, box_top: 4.25, whisker_bottom: 2, whisker_top: 5 }
  ]

  t.plan(1 + actual.length)

  const received = process(actual)
  t.equal(received.length, actual.length)

  for (let i = 0; i < received.length; i++) {
    t.deepEqual(received[i], expected[i])
  }
})
