import { createContext, PropsWithChildren, useReducer, useState } from 'react'

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountPastSeconds: number
  cycles: Cycle[]
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setPastSeconds: (seconds: number) => void
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType,
)

export function CyclesContextProvider({ children }: PropsWithChildren) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountPastSeconds, setAmountPastSeconds] = useState<number>(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setPastSeconds(seconds: number) {
    setAmountPastSeconds(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountPastSeconds(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountPastSeconds,
        cycles,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        setPastSeconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
