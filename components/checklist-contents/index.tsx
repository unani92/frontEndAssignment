import { useContext, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Store } from '../../lib/context/store'
import ChecklistItem from './checklist-item'
import { CheckList } from '../../lib/types'

const checklistContentsStyle = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingHorizontal: 20,
  },
})

const CheckListContents = () => {
  const { checkListGroupByWeeks, selectedWeek } = useContext(Store)
  const checklists = useMemo(() => {
    return selectedWeek && checkListGroupByWeeks[selectedWeek - 1]
      ? checkListGroupByWeeks[selectedWeek - 1].checkLists
      : ([] as CheckList[])
  }, [selectedWeek, checkListGroupByWeeks])
  return (
    <View style={[checklistContentsStyle.container]}>
      {checklists.length > 0 ? (
        checklists.map(checklist => (
          <ChecklistItem
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
