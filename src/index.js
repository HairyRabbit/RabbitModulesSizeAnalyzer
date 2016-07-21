// -*- mode: js -*-

import chalk from 'chalk'
import includes from 'lodash.includes'

const { red, yellow, green, cyan, bold, gray } = chalk

const defaultOptions = {
  threshold: 2000,
  range: 1000
}

const fmtSize = size => {
  if(size < 2048) return size + gray(' B')
  size /= 1024
  if(size < 2048) return size + gray(' KB')
  size /= 1024
  return Math.round(size) + gray(' MB')
}

const sizeRating = (threshold, size) => {
  if(size > threshold) return red(size)
  return green(size)
}

const shortWithSize = (a, b) => {
  return b.size - a.size
}

const logChunksData = chunk => {
  console.log(`${ bold(chunk.size) } ${ chunk.files[0] }`)
  return chunk
}

const logModulesData = threshold => module => {
  console.log(` |- ${ sizeRating(threshold, module.size) } ${ module.name }`)
  return module
}


function analysis(stats) {
  let st = stats.toJson()

  let logModules = logModulesData(this.threshold)

	st.chunks.forEach(
		c => {
      logChunksData(c)
		  st.modules.filter(
        m => includes(m.chunks, c.id)
      ).sort(shortWithSize).forEach(
			  m => logModules(m)
		  )
      console.log('')
		}
	)
  
}


export default class RabbitModulesSizeAnalyzer {
  constructor(opts) {
    const { threshold } = Object.assign({}, defaultOptions, opts)
    this.threshold = threshold
  }
  apply(compiler) {
	  compiler.plugin('done', analysis.bind(this))
  }
}
