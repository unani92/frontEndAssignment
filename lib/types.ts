export type CheckListData = {
  weekNumber: number
  content: string
}

export type CheckList = {
  id: number
  data: CheckListData
  checked: boolean
}

export type CheckListGroupByWeek = {
  weekNumber: number
  checkLists: CheckList[]
}
