export type CheckListData = {
  weekNumber: number
  content: string
}

export type CheckList = {
  id: string
  data: CheckList
  checked: boolean
}

export type CheckListGroupByWeek = {
  weekNumber: string
  checkLists: CheckList[]
}
