import { compose, over, lensProp, append, prepend, merge } from 'ramda'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const reducersLens = lensProp('reducers')
const sagasLens = lensProp('sagas')
const middlewareLens = lensProp('middleware')

export const assignReducers = (reducers) =>
  over(reducersLens)(merge(reducers))

export const appendSaga = (saga) =>
  over(sagasLens)(append(saga))

export const appendMiddleware = (middleware) =>
  over(middlewareLens)(append(middleware))

export const prependMiddleware = (middleware) =>
  over(middlewareLens)(prepend(middleware))

const storeSpec = {
  reducers: {},
  sagas: [],
  middleware: [],
}

export const composeStore = (...modules) => {
  const { reducers, sagas, middleware } = compose(...modules)(storeSpec)
  const sagaMiddleware = createSagaMiddleware()
  const middlewareEnhancer = applyMiddleware(
    sagaMiddleware,
    ...middleware
  )
  const enhancer = compose(
    middlewareEnhancer
  )
  const reducer = combineReducers(reducers)
  const store = createStore(reducer, enhancer)

  sagas.map(sagaMiddleware.run)

  return store
}

