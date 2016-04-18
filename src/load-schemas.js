import path from 'path'

import fs from 'fs-plus'

import {getUserSchema} from './schemas/user'
import {getTaskSchema} from './schemas/task'

console.log('userSchema = ', getUserSchema())
console.log('taskSchema = ', getTaskSchema())

// const schemas = {}

// fs
//   .listTreeSync(path.join(__dirname, 'schemas'))
//   .reduce((prev, current) => prev.concat(current), [])
//   .filter(filePath => fs.isFileSync(filePath) && path.extname(filePath) === '.js')
//   .forEach(filePath => schemas[path.basename(filePath, '.js')] = require(filePath).default.schema)

export default {user: getUserSchema(), task: getTaskSchema()}
