import { loadState, saveState } from '@/util/localStorage'
import { configureStore } from '@reduxjs/toolkit'
import tournamentSlice from './quizSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      tournament: tournamentSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']