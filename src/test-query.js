import request from 'superagent'
import Debug from 'debug'

const debug = new Debug('query')

const userId = '1', taskId = '1',
      offset = 0, limit = 10

// query user gy id
request
  .get('http://localhost:4000/users')
  .query({
    query: `{
      user(id: "${userId}") {
        name
        user_name
        mobile
        tasks(offset: ${offset}, limit: ${limit}) {
          title
          content
        }
      }
    }`
  })
  .end((err, res) => {
    debug('user ', (err || 'result: ', JSON.stringify(res.body)))
  })

// query user list with pagination.
// if don't need paginate, just remove (offset: ${offset}, limit: ${limit}) will be ok.
request
  .get('http://localhost:4000/users')
  .query({
    query: `{
      users(offset: ${offset}, limit: ${limit}) {
        name
        user_name
        mobile
        tasks(offset: ${offset}, limit: ${limit}) {
          title
          content
        }
      }
    }`
  })
  .end((err, res) => {
    debug('users', (err || 'result: ', JSON.stringify(res.body)))
  })

// query task gy id
request
  .get('http://localhost:4000/tasks')
  .query({
    query: `{
      task(id: "${taskId}") {
        title
        content
      }
    }`
  })
  .end((err, res) => {
    debug('task ', (err || 'result: ', JSON.stringify(res.body)))
  })

// query task list
request
  .get('http://localhost:4000/tasks')
  .query({
    query: `{
      tasks(offset: ${offset}, limit: ${limit}) {
        title
        content
      }
    }`
  })
  .end((err, res) => {
    debug('tasks', (err || 'result: ', JSON.stringify(res.body)))
  })
