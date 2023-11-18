import React, { Dispatch, createContext, useState } from 'react'
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
  setChecklistMode: Dispatch<ChecklistsMode>
  snackBarActivation: SnackbarActivation | undefined
  setSnackbarActivation: Dispatch<SnackbarActivation | undefined>
}

export const Store = createContext<CheckListContextType>({
  selectedWeek: undefined,
  setSelectedWeek: (num: number) => {},
  checkListGroupByWeeks: [],
  setCheckListGroupByWeeks: (values: CheckListGroupByWeek[]) => {},
  checklistMode: ChecklistsMode.ModeCheck,
  setChecklistMode: (value: ChecklistsMode) => {},
  snackBarActivation: undefined,
  setSnackbarActivation: (value: SnackbarActivation | undefined) => {},
})

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectedWeek, setSelectedWeek] = useState(15)
  const [checkListGroupByWeeks, setCheckListGroupByWeeks] = useState<
    CheckListGroupByWeek[]
  >([])
  const [checklistMode, setChecklistMode] = useState<ChecklistsMode>(
    ChecklistsMode.ModeCheck,
  )
  const [snackBarActivation, setSnackbarActivation] =
    useState<SnackbarActivation>()
  return (
    <Store.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        checkListGroupByWeeks,
        setCheckListGroupByWeeks,
        checklistMode,
        setChecklistMode,
        snackBarActivation,
        setSnackbarActivation,
      }}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
