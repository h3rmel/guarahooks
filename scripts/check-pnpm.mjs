#!/usr/bin/env node
import { readFileSync } from 'fs'
import { execSync } from 'child_process'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

let required = '9.0.0'
if (pkg.engines?.pnpm) {
  required = pkg.engines.pnpm.replace(/[^\d.]/g, '')
} else if (pkg.packageManager) {
  const match = pkg.packageManager.match(/pnpm@(\d+\.\d+\.\d+)/)
  if (match) required = match[1]
}

let current = ''
try {
  current = execSync('pnpm --version', { encoding: 'utf8' }).trim()
} catch (error) {
  console.error('pnpm is required but was not found.')
  process.exit(1)
}

const [reqMajor, reqMinor, reqPatch] = required.split('.').map(Number)
const [curMajor, curMinor, curPatch] = current.split('.').map(Number)

function versionLessThan(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] < b[i]) return true
    if (a[i] > b[i]) return false
  }
  return false
}

if (versionLessThan([curMajor, curMinor, curPatch], [reqMajor, reqMinor, reqPatch])) {
  console.error(`pnpm ${required} or newer is required. Current version: ${current}`)
  process.exit(1)
}
