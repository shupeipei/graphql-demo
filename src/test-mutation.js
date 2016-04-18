import request from 'superagent'
import Debug from 'debug'

const debug = new Debug('mutation')

const deleteId = '2'

const userId = '2',
      userName = 'Smith',
      name = '史密斯',

      taskId = '2',
      title = '测试2',
      content = '测试功能2',

      updateUserName = 'Smith-1',
      updateName = '史密斯-1'

// mutation -- create user
// request
//   .post('http://localhost:4000/users')
//   .send({
//     query: `
//     mutation M($userId: String! $userName: String! $name: String! $title: String! $content: String! $taskId: String!) {
//       create(id: $userId userName: $userName name: $name title: $title content: $content taskId: $taskId) {
//         name
//         user_name
//         tasks {
//           title,
//           content
//         }
//       }
//     }
//     `,
//     params: {
//       userId,
//       userName,
//       name,
//       taskId,
//       title,
//       content
//     }
//   })
//   .end((err, res) => {
//     debug('create user', (err || 'result: ', JSON.stringify(res.body)))
//   })

// mutation -- update user
// request
//   .post('http://localhost:4000/users')
//   .send({
//     query: `
//     mutation M($userId: String! $userName: String! $name: String! $title: String! $content: String! $taskId: String!) {
//       update(id: $userId userName: $userName name: $name title: $title content: $content taskId: $taskId) {
//         name
//         user_name
//         tasks {
//           title
//           content
//         }
//       }
//     }
//     `,
//     params: {
//       userId,
//       userName: updateUserName,
//       name: updateName,
//       taskId,
//       title,
//       content
//     }
//   })
//   .end((err, res) => {
//     debug('update user', (err || 'result: ', JSON.stringify(res.body)))
//   })

// mutation -- delete task
request
  .post('http://localhost:4000/tasks')
  .send({
    query: `
    mutation M($id: String!) {
      delete(id: $id){
        title
        content
      }
    }
    `,
    params: {
      id: deleteId
    }
  })
  .end((err, res) => {
    debug('delete task', (err || 'result: ', JSON.stringify(res.body)))
  })
