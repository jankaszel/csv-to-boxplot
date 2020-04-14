#!/usr/bin/env node
const split = require('split')
const transform = require('./')

if (process.argv[2] !== '-t') {
  console.log('Usage: # csv-to-boxplot [-t]. Use `-t` to transform from stdout to stdin. Will expect a header line.')
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
      const transformed = transform(
        transpose(rows.slice(1))
      )

      for (const row of transformed) {
        process.stdout.write(`${seq(row)}\n`)
      }
    })
}

main()
