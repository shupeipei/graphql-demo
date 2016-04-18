import koa from 'koa'

import PrettyError from 'pretty-error'

import mountGraphqlReq from './mount-graphqlreq'

const port = process.env.PORT || 4000;

const app = koa()

mountGraphqlReq({app})

app.listen(port, (err) => {
  if (err) {
    const pretty = new PrettyError()
    return
  }

  console.log(`server is listening on port ${port}...`)
})

// enable debug output
require('debug').enable('*')

require('./test-query')

// require('./test-mutation')

export default app
