const { median, quantileSeq } = require('mathjs')

module.exports = function transform (rows) {
  return rows.map((row, index) => {
    const values = row
      .map(value => Number.parseFloat(value))
      .sort((a, b) => a - b)

    return {
      index,
      median: median(values),
      box_top: quantileSeq(values, 0.75, true),
      box_bottom: quantileSeq(values, 0.25, true),
      whisker_top: Math.max(...values),
      whisker_bottom: Math.min(...values)
    }
  })
}
