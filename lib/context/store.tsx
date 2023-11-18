import React, { Dispatch, createContext, useState } from 'react'
import { CheckListGroupByWeek, ChecklistsMode } from '../types'

interface CheckListContextType {
  selectedWeek: number | undefined
  setSelectedWeek: Dispatch<number>
  checkListGroupByWeeks: CheckListGroupByWeek[]
  setCheckListGroupByWeeks: Dispatch<CheckListGroupByWeek[]>
  checklistMode: ChecklistsMode
  setChecklistMode: Dispatch<ChecklistsMode>
}

export const Store = createContext<CheckListContextType>({
  selectedWeek: undefined,
  setSelectedWeek: (num: number) => {},
  checkListGroupByWeeks: [],
  setCheckListGroupByWeeks: (values: CheckListGroupByWeek[]) => {},
  checklistMode: ChecklistsMode.ModeCheck,
  setChecklistMode: (value: ChecklistsMode) => {},
})

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectedWeek, setSelectedWeek] = useState(15)
  const [checkListGroupByWeeks, setCheckListGroupByWeeks] = useState<
    CheckListGroupByWeek[]
  >([])
  const [checklistMode, setChecklistMode] = useState<ChecklistsMode>(
    ChecklistsMode.ModeCheck,
  )
  return (
    <Store.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        checkListGroupByWeeks,
        setCheckListGroupByWeeks,
        checklistMode,
        setChecklistMode,
      }}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
