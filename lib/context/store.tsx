import React, { Dispatch, createContext, useState } from 'react'

interface CheckListContextType {
  selectedWeek: number | undefined
  setSelectedWeek: Dispatch<number>
}

export const Store = createContext<CheckListContextType>({
  selectedWeek: undefined,
  setSelectedWeek: (num: number) => {},
})

const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectedWeek, setSelectedWeek] = useState(15)
  return (
    <Store.Provider value={{ selectedWeek, setSelectedWeek }}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
