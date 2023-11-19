import React, { Dispatch, createContext, useCallback, useState } from 'react'
import {
  CheckListGroupByWeek,
  ChecklistsMode,
  SnackbarActivation,
} from '../types'

interface CheckListContextType {
  selectedWeek: number | undefined
  setSelectedWeek: Dispatch<number>
  checkListGroupByWeeks: CheckListGroupByWeek[]
  setCheckListGroupByWeeks: Dispatch<CheckListGroupByWeek[]>
  checklistMode: ChecklistsMode
  onChangeChecklistMode: (value: ChecklistsMode, handler?: () => {}) => void
  snackBarActivation: SnackbarActivation | undefined
  setSnackbarActivation: Dispatch<SnackbarActivation | undefined>
  lastId: number
  updateLastId: (num: number) => void
}

export const Store = createContext<CheckListContextType>({
  selectedWeek: undefined,
  setSelectedWeek: (num: number) => {},
  checkListGroupByWeeks: [],
  setCheckListGroupByWeeks: (values: CheckListGroupByWeek[]) => {},
  checklistMode: ChecklistsMode.ModeCheck,
  onChangeChecklistMode: (value: ChecklistsMode, handler?: () => {}) => {},
  snackBarActivation: undefined,
  setSnackbarActivation: (value: SnackbarActivation | undefined) => {},
  lastId: 99,
  updateLastId: (value: number) => {},
})

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectedWeek, setSelectedWeek] = useState(15)
  const [checkListGroupByWeeks, setCheckListGroupByWeeks] = useState<
    CheckListGroupByWeek[]
  >([])
  const [checklistMode, setChecklistMode] = useState<ChecklistsMode>(
    ChecklistsMode.ModeCheck,
  )
  const onChangeChecklistMode = (
    value: ChecklistsMode,
    handler?: () => void,
  ) => {
    handler && handler()
    setChecklistMode(value)
  }
  const [snackBarActivation, setSnackbarActivation] =
    useState<SnackbarActivation>()
  const [lastId, setLastId] = useState(99)
  const updateLastId = (lastId: number) => {
    setLastId(lastId++)
  }
  return (
    <Store.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        checkListGroupByWeeks,
        setCheckListGroupByWeeks,
        checklistMode,
        onChangeChecklistMode,
        snackBarActivation,
        setSnackbarActivation,
        lastId,
        updateLastId,
      }}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
