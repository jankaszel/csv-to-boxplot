#!/usr/bin/env node
const split = require('split')
const process = require('./')

if (process.argv.length > 2) {
  console.log('Usage: # cat test.csv | csv-to-boxplot > boxplot.txt')
  process.exit(1)
}

const seq = t => ([
  t.index,
  t.median,
  t.box_top,
  t.box_bottom,
  t.whisker_top,
  t.whisker_bottom
])

const transpose = m => {
  const n = []

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (!n[j]) {
        n[j] = []
      }

      n[j][i] = m[i][j]
    }
  }

  return n
}

function main () {
  const rows = []

  process.stdin.pipe(split())
    .on('data', data => rows.push(data.split(',')))
    .on('end', () => {
      const processed = process(
        transpose(rows.slice(1))
      )

      for (const row of processed) {
        process.stdout.write(`${seq(row).join(' ')}\n`)
      }
    })
}

main()
