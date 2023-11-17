import { useContext, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Store } from '../../lib/context/store'
import ChecklistItem from './checklist-item'
import { CheckList, CheckListGroupByWeek } from '../../lib/types'

const checklistContentsStyle = StyleSheet.create({
  container: {
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
})

const CheckListContents = () => {
  const { checkListGroupByWeeks, selectedWeek, setCheckListGroupByWeeks } =
    useContext(Store)
  const checklists = useMemo(() => {
    return selectedWeek && checkListGroupByWeeks[selectedWeek - 1]
      ? checkListGroupByWeeks[selectedWeek - 1].checkLists
      : ([] as CheckList[])
  }, [selectedWeek, checkListGroupByWeeks])
  const onPressClick = (checkList: CheckList, idx: number) => {
    const newCheckListGroupByWeek: CheckListGroupByWeek = {
      weekNumber: selectedWeek as number,
      checkLists: [...checklists],
    }
    newCheckListGroupByWeek.checkLists[idx] = {
      ...checkList,
      checked: !checkList.checked,
    }
    const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
    newCheckListGroupByWeeks[(selectedWeek || 0) - 1] = newCheckListGroupByWeek
    setCheckListGroupByWeeks(newCheckListGroupByWeeks)
  }
  return (
    <View style={[checklistContentsStyle.container]}>
      {checklists.length > 0 ? (
        checklists.map((checklist, idx) => (
          <ChecklistItem
            onPressCheck={item => onPressClick(item, idx)}
            key={`checklist-${checklist.id}`}
            checklistItem={checklist}
          />
        ))
      ) : (
        <View />
      )}
    </View>
  )
}

export default CheckListContents
