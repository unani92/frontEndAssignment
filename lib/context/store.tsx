import React, { Dispatch, createContext, useState } from 'react'
import { CheckListGroupByWeek } from '../types'

interface CheckListContextType {
  selectedWeek: number | undefined
  setSelectedWeek: Dispatch<number>
  checkListGroupByWeeks: CheckListGroupByWeek[]
  setCheckListGroupByWeeks: Dispatch<CheckListGroupByWeek[]>
}

export const Store = createContext<CheckListContextType>({
  selectedWeek: undefined,
  setSelectedWeek: (num: number) => {},
  checkListGroupByWeeks: [],
  setCheckListGroupByWeeks: (values: CheckListGroupByWeek[]) => {},
})

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectedWeek, setSelectedWeek] = useState(15)
  const [checkListGroupByWeeks, setCheckListGroupByWeeks] = useState<
    CheckListGroupByWeek[]
  >([])
  return (
    <Store.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        checkListGroupByWeeks,
        setCheckListGroupByWeeks,
      }}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
