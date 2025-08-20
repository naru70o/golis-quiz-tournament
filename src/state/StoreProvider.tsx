'use client'
import { saveState } from '@/util/localStorage'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from './store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined) 
    if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  // saving every state change in to the local-storage
  useEffect(() => {
    if(typeof window === "undefined") return;
    if(storeRef.current) {
      storeRef.current.subscribe(()=>{
        console.log("State changed:", storeRef?.current?.getState())
        saveState(storeRef?.current?.getState())
      })
    }
  },[storeRef])



  return <Provider store={storeRef.current}>{children}</Provider>
}