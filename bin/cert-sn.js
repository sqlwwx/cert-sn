#!/usr/bin/env node

const { readFile } = require('fs').promises
const loadCertSn = require('..')

Promise.all(
  process.argv.slice(2)
    .map(async certFilePath => {
      const certContent = (await readFile(certFilePath)).toString()
      return `${certFilePath}[cert-sn]: ${loadCertSn(certContent)}`
    })
).then(rets => {
  console.log(rets.join('\n'))
})
