import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { servicesReducer } from './servicesSlice'
import { rootEpic } from '../epics/servicesEpic'

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
  middleware: (getDefault) =>
    getDefault({ thunk: false }).concat(epicMiddleware),
})

epicMiddleware.run(rootEpic)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch