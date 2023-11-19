import { useContext, useEffect, useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Store } from '../../lib/context/store'
import ChecklistItem from './checklist-item'
import {
  CheckList,
  CheckListGroupByWeek,
  ChecklistsMode,
} from '../../lib/types'
import NoChecklist from './no-checklist'
import SvgUri from 'react-native-svg-uri'
import { flexShortcuts } from '../../lib/styles'

const checklistContentsStyle = StyleSheet.create({
  container: {
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
})

const CheckListContents = () => {
  const {
    checkListGroupByWeeks,
    selectedWeek,
    setCheckListGroupByWeeks,
    setSnackbarActivation,
    onChangeChecklistMode,
  } = useContext(Store)
  const checklists = useMemo(() => {
    return selectedWeek && checkListGroupByWeeks[selectedWeek - 1]
      ? checkListGroupByWeeks[selectedWeek - 1].checkLists
      : ([] as CheckList[])
  }, [selectedWeek, checkListGroupByWeeks])
  const onPressCheck = (checkList: CheckList, idx: number) => {
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
  const onPressDelete = (
    checkList: CheckList,
    checkListIdxForBackup: number,
  ) => {
    const actionLabel = () => (
      <View style={[flexShortcuts.flexCenter, { gap: 4 }]}>
        <SvgUri source={require('../../public/icon/undo.svg')} />
        <Text style={{ color: '#44CEC6' }}>undo</Text>
      </View>
    )
    const newCheckListGroupByWeek: CheckListGroupByWeek = {
      weekNumber: selectedWeek as number,
      checkLists: [...checklists].filter(item => item.id !== checkList.id),
    }
    setTimeout(() => {
      const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
      newCheckListGroupByWeeks[(selectedWeek || 0) - 1] =
        newCheckListGroupByWeek
      setCheckListGroupByWeeks(newCheckListGroupByWeeks)
      onChangeChecklistMode(ChecklistsMode.ModeCheck)
    }, 250)
    setSnackbarActivation({
      label: 'Checklist deleted',
      action: {
        label: actionLabel(),
        onPress: () => {
          newCheckListGroupByWeek.checkLists.splice(
            checkListIdxForBackup,
            0,
            checkList,
          )
          const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
          newCheckListGroupByWeeks[(selectedWeek || 0) - 1] =
            newCheckListGroupByWeek
          setCheckListGroupByWeeks(newCheckListGroupByWeeks)
        },
      },
    })
  }
  const onPressEditText = () => {}
  return (
    <View style={[checklistContentsStyle.container]}>
      {checklists.length > 0 ? (
        checklists.map((checklist, idx) => (
          <ChecklistItem
            key={`checklist-${checklist.id}`}
            checklistItem={checklist}
            onPressCheck={item => onPressCheck(item, idx)}
            onPressDelete={item => onPressDelete(item, idx)}
          />
        ))
      ) : (
        <NoChecklist />
      )}
    </View>
  )
}

export default CheckListContents
