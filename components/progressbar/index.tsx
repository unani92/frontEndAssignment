import { StyleSheet, View, Text } from 'react-native'
import { flexShortcuts } from '../../lib/styles'
import { useContext, useMemo } from 'react'
import { Store } from '../../lib/context/store'
import ProgressbarComponent from '../elements/progressbar'

const progressbarStyle = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  percentageText: {
    color: '#0BB',
    fontSize: 14,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
})

const Progressbar = () => {
  const { selectedWeek, checkListGroupByWeeks } = useContext(Store)
  const checkListsSelectedWeek = useMemo(() => {
    if (checkListGroupByWeeks && selectedWeek) {
      return checkListGroupByWeeks[selectedWeek - 1]
    }
  }, [selectedWeek, checkListGroupByWeeks])
  const progressbarValue = useMemo(() => {
    const checkedCount =
      (checkListsSelectedWeek?.checkLists || []).filter(
        checklist => checklist.checked,
      ).length || 0
    const checkListCount =
      (checkListsSelectedWeek?.checkLists || []).length || 0
    return {
      checkedCount,
      checkListCount,
      percentage: checkListCount
        ? parseInt(String((checkedCount / checkListCount) * 100))
        : 0,
    }
  }, [checkListsSelectedWeek])
  return (
    <View style={[progressbarStyle.container]}>
      <View style={[flexShortcuts.justifyBetween]}>
        <Text style={[progressbarStyle.text]}>
          {progressbarValue.checkedCount} of {progressbarValue.checkListCount}{' '}
          completed
        </Text>
        <Text style={[progressbarStyle.percentageText]}>
          {progressbarValue.percentage}%
        </Text>
      </View>
      <ProgressbarComponent
        checkedCount={progressbarValue.checkedCount}
        checkListCount={progressbarValue.checkListCount}
      />
    </View>
  )
}

export default Progressbar
