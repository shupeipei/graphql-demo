import path from 'path'

import fs from 'fs-plus'
import isFunction from 'lodash.isfunction'
import values from 'lodash.values'
import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  'cdeio',
  'root',
  'mysecretpassword',
  {
    "host": "mysql",
    "dialect": "mysql",
    "pool": {
      "port": 3306,
      "max": 15,
      "min": 0,
      "idle": 10000
    }
  }
)

const models = {}

fs
  .listTreeSync(path.join(__dirname, 'models'))
  .reduce((prev, current) => prev.concat(current), [])
  .filter(filePath => fs.isFileSync(filePath) && path.extname(filePath) === '.js')
  .map(filePath => sequelize.import(filePath))
  .forEach(model => models[model.name] = model)

values(models)
  .filter(model => isFunction(model.associate))
  .forEach(model => model.associate(models))

// 插入测试数据
sequelize.sync({force: true}).then(() => {
   models['User'].create({
    id: '1',
    user_name: 'Jason',
    password: 123456,
    name: '杰森',
    mobile: 13911112222,
    Tasks: [{
      id: '1',
      title: '测试1',
      content: '测试功能1'
    }]
  }, {
    include: [models['Task']]
  })
})

export default models
