import parseBody from 'co-body'
import {graphql} from 'graphql'
import inflection from 'inflection'
import Router from 'koa-router'
import keys from 'lodash.keys'

import schemas from './load-schemas'

console.log('schemas = ', schemas)

const generateRouter = ({schemaName}) => {
  const router = new Router()

  router.get(`/${inflection.pluralize(schemaName)}`, function* () {
    const query = this.query.query
    const params = this.query.params

    const res = yield graphql(schemas[schemaName], query, '', params)

    if (res.errors) {
      this.status = 400
      this.body = {
        errors: res.errors
      }
      return
    }

    this.body = res
  })

  router.post(`/${inflection.pluralize(schemaName)}`, function* () {
    const payload = yield parseBody(this)
    const res = yield graphql(schemas[schemaName], payload.query, '', payload.params)

    if (res.errors) {
      this.status = 400
      this.body = {
        errors: res.errors
      }
      return
    }

    this.body = res
  })

  return router
}

export default ({app}) => {
  keys(schemas)
    .forEach((schemaName) => app.use(generateRouter({schemaName}).middleware()))
}
