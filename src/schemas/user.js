import _ from 'lodash'
import {attributeFields} from 'graphql-sequelize'

import {
  graphql,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import models from '../load-models'

import {getTaskType} from './task'

const model = models['User']

const taskModel = models['Task']

const modelName = _.lowerFirst(model.name)

const userType = new GraphQLObjectType({
  name: modelName + 'Type',
  description: 'A user',
  fields: _.assign(attributeFields(model), {
    tasks: {
      args: {
        offset: {type: GraphQLInt},
        limit: {type: GraphQLInt}
      },
      type: new GraphQLList(getTaskType()),
      description: 'The task of the user, or an empty list if they have none.',
      resolve: (user, {offset, limit}, source) => {
        // user: model value
        // params: params
        // source: graphql type structure, include fieldName and fieldASTs
        return taskModel.findAll({where: {UserId: user.id}, offset, limit})
      }
    }
  })
})

const userSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: modelName + 'QuerySchema',
    fields: {
      user: {
        type: userType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (_, {id}) => {
          return model.findOne({
            where: {id}
          })
        }
      },
      users: {
        type: new GraphQLList(userType),
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
        type: userType,
        args: {
          id: {type: GraphQLString},
          name: {type: GraphQLString},
          userName: {type: GraphQLString},
          taskId: {type: GraphQLString},
          title: {type: GraphQLString},
          content: {type: GraphQLString}
        },
        resolve: (_, {id, name, userName, taskId, title, content}) => {
          return model.create({
            id,
            user_name: userName,
            name,
            Tasks: [{
              id: taskId,
              title,
              content
            }]
          }, {
            include: [taskModel]
          })
        }
      },
      update: {
        type: userType,
        args: {
          id: {type: GraphQLString},
          name: {type: GraphQLString},
          userName: {type: GraphQLString},
          taskId: {type: GraphQLString},
          title: {type: GraphQLString},
          content: {type: GraphQLString}
        },
        resolve: (_, {id, name, userName}) => {
          return model.update({name, user_name: userName}, {where: {id}}).then(() => {
            return model.findOne({
              where: {id},
              include: [taskModel]
            })
          })
        }
      },
      delete: {
        type: userType,
        args: {
          id: {type: GraphQLString},
        },
        resolve: (_, {id}) => {
          return model.destory({
            where: {id}
          })
        }
      }
    }
  })
})

export function getUserSchema() {
  return userSchema
}

export function getUserType() {
  return userType
}
