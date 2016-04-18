import _ from 'lodash'
import {attributeFields} from 'graphql-sequelize'

import {
  graphql,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql'

import models from '../load-models'

// import {getUserType} from './user'

const model = models['Task']

// const userModel = models['User']

const modelName = _.lowerFirst(model.name)

const taskType = new GraphQLObjectType({
  name: modelName + 'Type',
  description: 'A task',
  fields: _.assign(attributeFields(model), {
    // user: {
    //   type: new GraphQLObjectType(getUserType()),
    //   description: 'The task of the user, or an empty list if they have none.',
    //   resolve: (task, {}, source) => {
    //     // user: model value
    //     // params: params
    //     // source: graphql type structure, include fieldName and fieldASTs
    //     return task.getUser()
    //   }
    // }
  })
})

const taskSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: modelName + 'QuerySchema',
    fields: {
      task: {
        type: taskType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (_, {id}) => {
          return model.findOne({
            where: {id}
          })
        }
      },
      tasks: {
        type: new GraphQLList(taskType),
        args: {
          offset: {type: GraphQLInt},
          limit: {type: GraphQLInt}
        },
        resolve: (_, {offset, limit}) => {
          return model.findAll({offset, limit})
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: modelName + 'Mutation',
    fields: {
      create: {
        type: taskType,
        args: {
          id: {type: GraphQLString},
          title: {type: GraphQLString},
          content: {type: GraphQLString}
        },
        resolve: (_, {id, title, content}) => {
          return model.create({
            id,
            title,
            content
          })
        }
      },
      update: {
        type: taskType,
        args: {
          id: {type: GraphQLString},
          title: {type: GraphQLString},
          content: {type: GraphQLString}
        },
        resolve: (_, {id, title, content}) => {
          return model.update(
                  {title, content},
                  {where: {id}}
          ).then(() => {
            return model.findOne({
              where: {id}
            })
          })
        }
      },
      delete: {
        type: taskType,
        args: {
          id: {type: GraphQLString},
        },
        resolve: (_, {id}) => {
          return model.findOne({
            where: {id}
          }).then((task) => {
            return task.destroy({where: {id}})
          })
        }
      }
    }
  })
})

export function getTaskSchema() {
  return taskSchema
}

export function getTaskType() {
  return taskType
}

