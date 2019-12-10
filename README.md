# Compose Redux Store

Simple utility for separating redux apps into self contained modules.

Example:

```js
  // notifications/index.js
  import { compose } from 'ramda'
  import { assignReducers, appendSaga } from 'redux-compose-store'
  import { notificationsReducer } from './reducer'
  import { notificationsSaga } from './saga'

  export default compose(
    assignReducers({
      notifications: notificationsReducer
    }),
    appendSaga(notificationsSaga)
  )

  // app.js
  import { ifElse, identity } from 'ramda'
  import { composeStore, appendMiddleware } from 'redux-compose-store'
  import { createLogger } from 'redux-logger'
  import notifications from './notifications'

  const store = composeStore(
    notifications,
    ifElse(
      isDev,
      appendMiddleware(createLogger()),
      identity
    ),
    ...
  )
```
